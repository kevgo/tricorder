Feature: postedit Rust

  Background:
    Given a Git repository
    And a committed file "run-that-app" with content
      """
      delete-empty-folders 0.0.2
      """
    And a file "main.rs" with content
      """
      // some Rust code
      """

  Scenario: no custom linters defined
    When executing "tricorder postedit --show=all"
    Then it prints the lines
      """
      lint Git (git diff HEAD --check)
      """
    And it prints to STDERR
      """
      1 Rust
      running 1 tools
      """
    And the exit code is 0
    And file "main.rs" is unchanged

  Scenario: rust-specific linters
    Given a file "tricorder.json" with content
      """
      {
        "stacks": {
          "rust": {
            "replace-lints": [
              {
                "command": "echo 'custom linter running'",
                "name": "my custom linter"
              }
            ]
          }
        }
      }
      """
    When executing "tricorder postedit --show=all"
    Then it prints the block
      """
      my custom linter
      custom linter running
      """
    And it prints to STDERR
      """
      1 JSON, 1 Rust
      running 2 tools
      """
    And the exit code is 0
    And file "main.rs" is unchanged
