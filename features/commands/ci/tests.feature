Feature: CI runs the same tests as the test command

  Background:
    Given a file "run-that-app" with content
      """
      delete-empty-folders 0.0.2
      ruff 0.15.16
      """

  Scenario: tests pass in parallel with lints
    Given a file "tricorder.json" with content
      """
      {
        "applications": {
          "dprint": { "enabled": false },
          "prettier": { "enabled": false }
        },
        "tests": [
          { "command": "tests/one.sh" },
          { "name": "unit tests", "command": "echo unit" }
        ]
      }
      """
    And an executable file "tests/one.sh" with content
      """
      #!/usr/bin/env bash
      echo "custom test is running"
      """
    And a file "main.py" with content
      """
      print("hello")
      """
    When executing "tricorder ci --show=output"
    Then it prints to STDERR
      """
      1 JSON, 1 Python, 2 other
      running 6 tools
      """
    And it prints the block
      """
      tests/one.sh
      custom test is running
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

  Scenario: tests appear alongside fixes and lints
    Given a file "tricorder.json" with content
      """
      {
        "applications": {
          "dprint": { "enabled": false },
          "prettier": { "enabled": false }
        },
        "tests": [
          { "name": "unit tests", "command": "echo unit" },
          { "name": "E2E tests", "command": "echo e2e" }
        ]
      }
      """
    And a file "main.py" with content
      """
      print("hello")
      """
    When executing "tricorder ci --show=names"
    Then it prints only these lines in any order
      """
      delete empty folders
      fix Python (ruff)
      format Python (ruff)
      lint Python (ruff)
      unit tests
      E2E tests
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
    When executing "tricorder ci --show=output"
    Then it prints the block
      """
      tests/fail.sh
      custom test failed
      """
    And the exit code is 4
