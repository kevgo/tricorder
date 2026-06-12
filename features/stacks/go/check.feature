Feature: check Go code

  Background:
    Given a file "go.mod" with content
      """
      module example.com/demo
      
      go 1.21
      """
    And a file "main.go" with content
      """
      package main
      
      import "fmt"
      
      func main() {
      	unused := "value"
      	fmt.Println("Hello, world!")
      }
      """

  Scenario: already configured
    Given a file "run-that-app" with content
      """
      golangci-lint 2.12.2
      """
    When executing "tricorder check"
    Then it prints the lines
      """
      1 Go, 2 other
      running 1 tools
      Go (golangci-lint)
      """
    And it does not print
      """
      Talking to GitHub API
      """
    And the exit code is 1

  @online
  Scenario: auto-install
    When executing "tricorder check"
    Then it prints the lines
      """
      1 Go, 1 other
      Talking to GitHub API (https://api.github.com/repos/golangci/golangci-lint/releases/latest) ... ok
      added golangci-lint@2.12.2 to run-that-app
      running 1 tools
      Go (golangci-lint)
      """
    And the exit code is 1
    And file "run-that-app" now matches
      """
      # more info at https://github.com/kevgo/run-that-app
      
      golangci-lint \d+\.\d+\.\d+
      """
