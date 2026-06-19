Feature: custom linters

  Scenario: custom linter passes
    Given a file "tricorder.toml" with content
      """
      linters.custom = ["linters/one.sh", "find . | sort | xargs echo"]
      """
    And an executable file "linters/one.sh" with content
      """
      #!/usr/bin/env bash
      echo "custom linter 1"
      """
    When executing "tricorder check --show=all"
    Then it prints the block
      """
      linters/one.sh
      custom linter 1
      """
    And it prints the block
      """
      find . | sort | xargs echo
      . ./linters ./linters/one.sh ./run-that-app ./tricorder.toml
      """
    And the exit code is 0

  Scenario: custom linter fails
    Given a file "tricorder.toml" with content
      """
      linters.custom = ["linters/check.sh"]
      """
    And an executable file "linters/check.sh" with content
      """
      #!/usr/bin/env bash
      echo "custom linter 1 failed"
      exit 4
      """
    When executing "tricorder check --show=all"
    Then it prints the block
      """
      linters/check.sh
      custom linter 1 failed
      """
    And the exit code is 4
