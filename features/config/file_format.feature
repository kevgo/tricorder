Feature: config file format

  Background:
    Given a file "run-that-app" with content
      """
      delete-empty-folders 0.0.2
      """

  Scenario: comments and trailing commas are accepted
    Given a file "tricorder.json" with content
      """
      {
        // a comment
        "global-lints": [
          {
            "name": "hello",
            "command": "echo hello",
          },
        ],
      }
      """
    When executing "tricorder lint --show=all"
    Then it prints the block
      """
      hello
      hello
      """
    And the exit code is 0

  Scenario: tricorder.jsonc is used when tricorder.json is absent
    Given a file "tricorder.jsonc" with content
      """
      {
        "global-lints": [
          { "name": "from jsonc", "command": "echo from jsonc" }
        ]
      }
      """
    When executing "tricorder lint --show=all"
    Then it prints the block
      """
      from jsonc
      from jsonc
      """
    And the exit code is 0

  Scenario: tricorder.json takes precedence over tricorder.jsonc
    Given a file "tricorder.json" with content
      """
      {
        "global-lints": [
          { "name": "from json", "command": "echo from json" }
        ]
      }
      """
    And a file "tricorder.jsonc" with content
      """
      {
        "global-lints": [
          { "name": "from jsonc", "command": "echo from jsonc" }
        ]
      }
      """
    When executing "tricorder lint --show=all"
    Then it prints the block
      """
      from json
      from json
      """
    And it does not print
      """
      from jsonc
      """
    And the exit code is 0
