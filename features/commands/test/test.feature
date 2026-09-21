Feature: custom tests

  Scenario: tests pass
    Given a file "trident.json" with content
      """
      {
        "tests": [
          { "command": "tests/one.sh" },
          {
            "name": "list all files",
            "command": "find . | sort | xargs echo"
          }
        ]
      }
      """
    And an executable file "tests/one.sh" with content
      """
      #!/usr/bin/env bash
      echo "custom test is running"
      """
    When executing "trident test --show=output"
    Then it prints the block
      """
      tests/one.sh
      custom test is running
      """
    And it prints the block
      """
      list all files
      . ./tests ./tests/one.sh ./trident.json
      """
    And the exit code is 0

  Scenario: test fails
    Given a file "trident.json" with content
      """
      {
        "tests": [
          { "command": "tests/fail.sh" }
        ]
      }
      """
    And an executable file "tests/fail.sh" with content
      """
      #!/usr/bin/env bash
      echo "custom test failed"
      exit 4
      """
    When executing "trident test --show=output"
    Then it prints the block
      """
      tests/fail.sh
      custom test failed
      """
    And the exit code is 4

  Scenario: unnamed test uses the command as the name
    Given a file "trident.json" with content
      """
      {
        "tests": [
          { "command": "echo unnamed" }
        ]
      }
      """
    When executing "trident test --show=output"
    Then it prints the block
      """
      echo unnamed
      unnamed
      """
    And the exit code is 0

  Scenario: missing tests succeeds
    When executing "trident test --show=output"
    Then it prints to STDERR
      """
      running 0 tools
      """
    And it prints nothing to STDOUT
    And the exit code is 0
