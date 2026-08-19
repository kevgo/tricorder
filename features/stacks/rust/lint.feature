Feature: lint Rust

  Background:
    Given a file "run-that-app" with content
      """
      delete-empty-folders 0.0.2
      """
    And a file "main.rs" with content
      """
      // some Rust code
      """

  Scenario: no custom linters defined
    When executing "tricorder lint --show=all"
    Then it prints nothing to STDOUT
    And it prints to STDERR
      """
      1 Rust, 1 other
      running 0 tools
      """
    And the exit code is 0
    And file "main.rs" is unchanged

  Scenario: a custom linter is defined
    Given a file "tricorder.json" with content
      """
      {
        "custom-lints": [
          {
            "command": "echo 'custom linter running'",
            "name": "my custom linter"
          }
        ]
      }
      """
    When executing "tricorder lint --show=all"
    Then it prints the block
      """
      my custom linter
      custom linter running
      """
    And it prints to STDERR
      """
      1 JSON, 1 Rust, 1 other
      running 1 tools
      """
    And the exit code is 0
    And file "main.rs" is unchanged
