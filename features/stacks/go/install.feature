Feature: install all Go tools

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
      	fmt.Println(    "Hello, world!")
      }
      """

  @online
  Scenario: not installed
    When executing "tricorder format --show=all"
    Then it prints the lines
      """
      Talking to GitHub API (https://api.github.com/repos/mvdan/gofumpt/releases/latest) ... ok
      Go (gofumpt)
      main.go
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
    And file "run-that-app" now matches
      """
      # more info at https://github.com/kevgo/run-that-app
      
      gofumpt \d+\.\d+\.\d+
      """

  Scenario: already installed
    Given a file "run-that-app" with content
      """
      gofumpt 0.10.0
      """
    When executing "tricorder format --show=all"
    Then it prints the block
      """
      Go (gofumpt)
      main.go
      """
    And it does not print
      """
      Talking to GitHub API
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
