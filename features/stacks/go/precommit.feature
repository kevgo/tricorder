Feature: precommit Go

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
      delete-empty-folders 0.0.2
      """

  Scenario: valid Go
    Given a file "main.go" with content
      """
      package main

      import "fmt"

      func main() {
      	fmt.Println("Hello, world!")
      }
      """
    When executing "tricorder precommit"
    Then it prints nothing to STDOUT
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
    When executing "tricorder precommit"
    Then it prints nothing to STDOUT
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
    When executing "tricorder precommit"
    Then it prints the block
      """
      main.go:4:14: string literal not terminated
      """
    And the exit code is 0
    And file "main.go" is unchanged
