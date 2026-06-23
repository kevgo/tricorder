Feature: custom lints

  Background:
    Given a file "run-that-app" with content
      """
      taplo 0.10.0
      delete-empty-folders 0.0.2
      """

  Scenario: custom lint passes
    Given a file "tricorder.toml" with content
      """
      [[custom_lints]]
      command = "lints/one.sh"

      [[custom_lints]]
      name = "list all files"
      command = "find . | sort | xargs echo"
      """
    And an executable file "lints/one.sh" with content
      """
      #!/usr/bin/env bash
      echo "custom lint is running"
      """
    When executing "tricorder lint --show=all"
    Then it prints the block
      """
      lints/one.sh
      custom lint is running
      """
    And it prints the block
      """
      list all files
      . ./lints ./lints/one.sh ./run-that-app ./tricorder.toml
      """
    And the exit code is 0

  Scenario: custom lint fails
    Given a file "tricorder.toml" with content
      """
      [[custom_lints]]
      command = "lints/fail.sh"
      """
    And an executable file "lints/fail.sh" with content
      """
      #!/usr/bin/env bash
      echo "custom lint failed"
      exit 4
      """
    When executing "tricorder lint --show=all"
    Then it prints the block
      """
      lints/fail.sh
      custom lint failed
      """
    And the exit code is 4
