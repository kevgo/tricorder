Feature: check Go

  Background:
    Given a file "go.mod" with content
      """
      module example.com/demo
      go 1.21
      """
    Given a file "run-that-app" with content
      """
      golangci-lint 2.12.2
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
    When executing "tricorder check --show=all"
    Then it prints the lines
      """
      Go (golangci-lint)
      """
    And the exit code is 0
    And file "main.go" is unchanged

  Scenario: invalid Go
    Given a file "main.go" with content
      """
      package main
      import "fmt"
      func main() {
      	fmt.Println("
      }
      """
    When executing "tricorder check --show=all"
    Then it prints the lines
      """
      Go (golangci-lint)
      3 issues:
      """
    And the exit code is 1
    And file "main.go" is unchanged
