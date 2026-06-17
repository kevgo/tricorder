Feature: custom linters

  Scenario: custom linter passes
    Given a file "tricorder.toml" with content
      """
      linters.custom = ["linters/one.sh", "find . | xargs echo"]
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
      find . | xargs echo
      . ./run-that-app ./linters ./linters/one.sh ./tricorder.toml
      """
    Then the exit code is 0

  Scenario: custom linter fails
    Given a file "tricorder.toml" with content
      """
      linters.custom = ["linters/check.sh"]
      """
    And an executable file "linters/check.sh" with content
      """
      #!/usr/bin/env bash
      echo "custom linter 1 failed"
      exit 1
      """
    When executing "tricorder check --show=all"
    Then it prints the block
      """
      linters/check.sh
      custom linter 1 failed
      """
    Then the exit code is 1
