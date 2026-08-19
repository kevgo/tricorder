Feature: fix Rust

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

  Scenario: no custom fixes defined
    When executing "tricorder fix --show=all"
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

  Scenario: a custom fix is defined
    Given a file "tricorder.json" with content
      """
      {
        "stack": {
          "rust": {
            "fix": [
              {
                "command": "echo 'custom fix running'",
                "name": "my custom fix"
              }
            ]
          }
        }
      }
      """
    When executing "tricorder fix --show=all"
    Then it prints the block
      """
      delete empty folders
      """
    And it prints the block
      """
      fix JSON (Prettier)
      """
    And it prints the block
      """
      my custom fix
      custom fix running
      """
    And it prints to STDERR
      """
      1 JSON, 1 Rust, 1 other
      running 3 tools
      """
    And the exit code is 0
    And file "main.rs" is unchanged
