Feature: fix Go

  Background:
    Given a file "go.mod" with content
      """
      module example.com/demo
      go 1.21
      """
    And a file "run-that-app" with content
      """
      gofumpt 0.10.0
      golangci-lint 2.12.2
      """

  @this
  Scenario: valid Go
    Given foo
    Given a file "main.go" with content
      """
      package main

      import "fmt"

      func main() {
      	fmt.Println("Hello, world!")
      }
      """
    When executing "tricorder fix --show=all"
    Then it prints the lines
      """
      Go (gofumpt)
      """
    And the exit code is 0
    And file "main.go" is unchanged

  Scenario: unformatted Go
    Given a file "main.go" with content
      """
      package main
      import "fmt"
      func main() {
      	fmt.Println(    "Hello, world!")
      }
      """
    And a file "other.go" with content
      """
      package other
      import "fmt"
      func main() {
      	fmt.Println(    "Hello, other!")
      }
      """
    When executing "tricorder fix --show=all"
    Then it prints the lines
      """
      Go (gofumpt)
      main.go
      """
    And it prints the lines
      """
      other.go
      """
    And it prints the lines
      """
      other.go
      """
    And the exit code is 0
    And file "main.go" now has content
      """
      package main

      import "fmt"

      func main() {
      	fmt.Println("Hello, world!")
      }
      """
    And file "other.go" now has content
      """
      package other

      import "fmt"

      func main() {
      	fmt.Println("Hello, other!")
      }
      """

  Scenario: invalid Go
    Given a file "main.go" with content
      """
      package main
      import "fmt"
      func main() {
      	fmt.Println("
      }
      """
    When executing "tricorder fix --show=all"
    Then it prints the block
      """
      Go (gofumpt)
      main.go:4:14: string literal not terminated
      """
    And the exit code is 2
    And file "main.go" is unchanged
