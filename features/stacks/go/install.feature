Feature: Golangci-Lint installation

  Background:
    Given a file "go.mod" with content
      """
      module example.com/demo
      go 1.21
      """
  # @online

  Scenario: not installed
    When executing "tricorder format"
    Then it prints the lines
      """
      Talking to GitHub API (https://api.github.com/repos/mvdan/gofumpt/releases/latest) ... ok
      added gofumpt@0.10.0 to run-that-app
      Go (gofumpt)
      x
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
    And file "run-that-app" now matches
      """
      # more info at https://github.com/kevgo/run-that-app
      
      gofumpt \d+\.\d+\.\d+
      """
