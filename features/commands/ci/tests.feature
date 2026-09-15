Feature: CI runs all fixes, formatters, lints, and tests

  Background:
    Given a file "run-that-app" with content
      """
      delete-empty-folders 0.0.2
      ruff 0.15.16
      """

  Scenario:
    Given a file "tricorder.json" with content
      """
      {
        "applications": {
          "dprint": { "enabled": false },
          "prettier": { "enabled": false }
        },
        "tests": [
          { "command": "echo test one" },
          { "name": "unit tests", "command": "echo unit" }
        ]
      }
      """
    And a file "main.py" with content
      """
      print("hello")
      """
    When executing "tricorder ci --show=output"
    Then it prints to STDERR
      """
      1 JSON, 1 Python, 1 other
      running 6 tools
      """
    And it prints the block
      """
      echo test one
      test one
      """
    And it prints the block
      """
      unit tests
      unit
      """
    And it prints the block
      """
      lint Python (ruff)
      All checks passed!
      """
    And the exit code is 0

  Scenario: test fails
    Given a file "tricorder.json" with content
      """
      {
        "applications": {
          "dprint": { "enabled": false },
          "prettier": { "enabled": false }
        },
        "tests": [
          { "name": "failing test", "command": "tests/fail.sh" }
        ]
      }
      """
    And an executable file "tests/fail.sh" with content
      """
      #!/usr/bin/env bash
      echo "custom test failed"
      exit 4
      """
    When executing "tricorder ci --show=output"
    Then it prints the block
      """
      failing test
      custom test failed
      """
    And the exit code is 4
