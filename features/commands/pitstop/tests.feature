Feature: pitstop --test runs selected tests

  Background:
    Given a file "run-that-app" with content
      """
      delete-empty-folders 0.0.2
      ruff 0.15.16
      """

  Scenario: without --test, configured tests do not run
    Given a file "tricorder.json" with content
      """
      {
        "applications": {
          "dprint": { "enabled": false },
          "prettier": { "enabled": false }
        },
        "tests": [
          { "name": "unit", "command": "echo unit" },
          { "name": "cuke", "command": "echo cuke" }
        ]
      }
      """
    When executing "tricorder pitstop --show=output"
    Then it prints the lines to STDERR
      """
      1 JSON, 1 other
      running 1 tools
      """
    And it does not print
      """
      unit
      """
    And it does not print
      """
      cuke
      """
    And the exit code is 0

  Scenario: --test selects named tests
    Given a file "tricorder.json" with content
      """
      {
        "applications": {
          "dprint": { "enabled": false },
          "prettier": { "enabled": false }
        },
        "tests": [
          { "name": "unit", "command": "echo unit" },
          { "name": "cuke", "command": "echo cuke" },
          { "name": "slow", "command": "echo slow" }
        ]
      }
      """
    When executing "tricorder pitstop --test=unit+cuke --show=output"
    Then it prints the lines to STDERR
      """
      1 JSON, 1 other
      running 3 tools
      """
    And it prints the block
      """
      unit
      unit
      """
    And it prints the block
      """
      cuke
      cuke
      """
    And it does not print
      """
      slow
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
          { "name": "failing", "command": "tests/fail.sh" }
        ]
      }
      """
    And an executable file "tests/fail.sh" with content
      """
      #!/usr/bin/env bash
      echo "custom test failed"
      exit 4
      """
    When executing "tricorder pitstop --test=failing --show=output"
    Then it prints the block
      """
      failing
      custom test failed
      """
    And the exit code is 4

  Scenario: unknown test name
    Given a file "tricorder.json" with content
      """
      {
        "tests": [
          { "name": "unit", "command": "echo unit" },
          { "name": "cuke", "command": "echo cuke" }
        ]
      }
      """
    When executing "tricorder pitstop --test=unit+missing"
    Then it prints
      """
      unknown test: missing
      available tests: unit, cuke
      """
    And the exit code is 1
