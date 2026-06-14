Feature: format Go code

  Background:
    Given a file "go.mod" with content
      """
      module example.com/demo
      
      go 1.21
      """
    And a file "main.go" with content
      """
      package   main
      
      import   "fmt"
      
      func main() {
      	fmt.Println("Hello, world!")
      }
      """
    And a file "other.go" with content
      """
      package   other
      
      import   "fmt"
      
      func main() {
      	fmt.Println("Hello, other!")
      }
      """

  Scenario: already configured
    Given a file "run-that-app" with content
      """
      gofumpt 0.10.0
      golangci-lint 2.12.2
      """
    When executing "tricorder format"
    Then it prints the lines
      """
      Go (gofumpt)
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
    And file "other.go" now has content
      """
      package other
      
      import "fmt"
      
      func main() {
      	fmt.Println("Hello, other!")
      }
      """

  @online
  Scenario: auto-install
    When executing "tricorder format"
    Then it prints to STDERR
      """
      2 Go, 1 other
      Talking to GitHub API (https://api.github.com/repos/mvdan/gofumpt/releases/latest) ... ok
      running 1 tools
      """
    Then it prints the lines
      """
      Go (gofumpt)
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
