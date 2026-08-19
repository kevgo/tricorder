Feature: pitstop Rust

  Background:
    Given a file "run-that-app" with content
      """
      delete-empty-folders 0.0.2
      node 26.4.0
      prettier 3.7.0
      """
    And a file "main.rs" with content
      """
      // some Rust code
      """

  Scenario: no custom tools defined
    When executing "tricorder pitstop --show=all"
    Then it prints
      """
      delete empty folders
      """
    And it prints to STDERR
      """
      1 Rust, 1 other
      running 1 tools
      """
    And the exit code is 0
    And file "main.rs" is unchanged

  Scenario: custom linters and fixes defined
    Given a file "tricorder.json" with content
      """
      {
        "custom-fixes": [
          {
            "command": "echo 'custom fix running'",
            "name": "my custom fix"
          }
        ],
        "custom-lints": [
          {
            "command": "echo 'custom linter running'",
            "name": "my custom linter"
          }
        ]
      }
      """
    When executing "tricorder pitstop --show=all"
    Then it prints the block
      """
      my custom fix
      custom fix running
      """
    And it prints the block
      """
      my custom linter
      custom linter running
      """
    And it prints to STDERR
      """
      1 JSON, 1 Rust, 1 other
      running 4 tools
      """
    And the exit code is 0
    And file "main.rs" is unchanged
