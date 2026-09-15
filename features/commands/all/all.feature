Feature: all command

  Background:
    Given a file "run-that-app" with content
      """
      delete-empty-folders 0.0.2
      dprint 0.57.4
      """

  Scenario: all categories run
    Given a file "tricorder.json" with content
      """
      {
        "applications": {
          "prettier": { "enabled": false }
        },
        "global-fixes": [
          { "name": "my global fix", "command": "echo global fix running" }
        ],
        "global-lints": [
          { "name": "my global lint", "command": "echo global lint running" }
        ],
        "tests": [
          { "name": "my test", "command": "echo test running" }
        ]
      }
      """
    When executing "tricorder all --show=all"
    Then it prints the block
      """
      delete empty folders
      """
    And it prints the block
      """
      my global fix
      global fix running
      """
    And it prints the block
      """
      my global lint
      global lint running
      """
    And it prints the block
      """
      my test
      test running
      """
    And the exit code is 0

  Scenario: stack lints run after that stack's fixes
    Given a file "main.rs" with content
      """
      // some Rust code
      """
    And a file "tricorder.json" with content
      """
      {
        "applications": {
          "prettier": { "enabled": false }
        },
        "stacks": {
          "rust": {
            "fix": {
              "replace": [
                {
                  "name": "write marker",
                  "command": "echo done > marker.txt"
                }
              ]
            },
            "lint": {
              "replace": [
                {
                  "name": "check marker",
                  "command": "test -f marker.txt && echo lint after fix"
                }
              ]
            }
          }
        }
      }
      """
    When executing "tricorder all --show=all"
    Then it prints the block
      """
      fix Rust (write marker)
      """
    And it prints the block
      """
      lint Rust (check marker)
      lint after fix
      """
    And file "marker.txt" now has content
      """
      done
      """
    And the exit code is 0

  Scenario: a failing test does not skip lints and fixes
    Given a file "tricorder.json" with content
      """
      {
        "applications": {
          "prettier": { "enabled": false }
        },
        "global-fixes": [
          { "name": "my global fix", "command": "echo global fix running" }
        ],
        "global-lints": [
          { "name": "my global lint", "command": "echo global lint running" }
        ],
        "tests": [
          { "name": "failing test", "command": "echo test failed; exit 4" }
        ]
      }
      """
    When executing "tricorder all --show=all"
    Then it prints the block
      """
      my global fix
      global fix running
      """
    And it prints the block
      """
      my global lint
      global lint running
      """
    And it prints the block
      """
      failing test
      test failed
      """
    And the exit code is 4

  Scenario: a failing global lint does not skip tests
    Given a file "tricorder.json" with content
      """
      {
        "applications": {
          "prettier": { "enabled": false }
        },
        "global-lints": [
          { "name": "failing lint", "command": "echo lint failed; exit 3" }
        ],
        "tests": [
          { "name": "my test", "command": "echo test running" }
        ]
      }
      """
    When executing "tricorder all --show=all"
    Then it prints the block
      """
      failing lint
      lint failed
      """
    And it prints the block
      """
      my test
      test running
      """
    And the exit code is 3

  Scenario: no tests configured
    When executing "tricorder all --show=all"
    Then it prints
      """
      delete empty folders
      """
    And it prints to STDERR
      """
      1 other
      running 1 tools
      """
    And the exit code is 0
