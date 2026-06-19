Feature: custom linters

  @this
  Scenario: custom linter passes
    Given a file "tricorder.toml" with content
      """
      [[custom_linter]]
      command = "linters/one.sh"

      [[custom_linter]]
      name = "list all files"
      command = "find . | sort | xargs echo"
      """
    And an executable file "linters/one.sh" with content
      """
      #!/usr/bin/env bash
      echo "custom linter is running"
      """
    When executing "tricorder check --show=all"
    Then it prints the block
      """
      linters/one.sh
      custom linter is running
      """
    And it prints the block
      """
      list all files
      . ./linters ./linters/one.sh ./run-that-app ./tricorder.toml
      """
    And the exit code is 0

  Scenario: custom linter fails
    Given a file "tricorder.toml" with content
      """
      [[custom_linter]]
      command = "linters/fail.sh"
      """
    And an executable file "linters/fail.sh" with content
      """
      #!/usr/bin/env bash
      echo "custom linter failed"
      exit 4
      """
    When executing "tricorder check --show=all"
    Then it prints the block
      """
      linters/fail.sh
      custom linter failed
      """
    And the exit code is 4
