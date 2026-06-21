Feature: custom fixes

  @this
  Scenario: custom fix passes
    Given a file "tricorder.toml" with content
      """
      [[custom_fixes]]
      command = "fixes/one.sh"

      [[custom_fixes]]
      name = "sort alphabetically"
      command = "find . | sort | xargs echo"
      """
    And an executable file "fixes/one.sh" with content
      """
      #!/usr/bin/env bash
      echo "custom fix is running"
      """
    When executing "tricorder check --show=all"
    Then it prints the block
      """
      fixes/one.sh
      custom fix is running
      """
    And it prints the block
      """
      sort alphabetically
      . ./fixes ./fixes/one.sh ./run-that-app ./tricorder.toml
      """
    And the exit code is 0

  Scenario: custom linter fails
    Given a file "tricorder.toml" with content
      """
      [[custom_linters]]
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
