Feature: custom linters via tricorder.toml

  Scenario: custom linter passes
    Given a file "tricorder.toml" with content
      """
      linters.custom = ["linters/check.sh"]
      """
    And an executable file "linters/check.sh" with content
      """
      #!/usr/bin/env bash
      exit 0
      """
    When executing "tricorder check"
    Then the exit code is 0

  Scenario: custom linter fails
    Given a file "tricorder.toml" with content
      """
      linters.custom = ["linters/check.sh"]
      """
    And an executable file "linters/check.sh" with content
      """
      #!/usr/bin/env bash
      exit 1
      """
    When executing "tricorder check"
    Then the exit code is 1

  Scenario: multiple custom linters
    Given a file "tricorder.toml" with content
      """
      linters.custom = [
        "linters/check-a.sh",
        "linters/check-b.sh",
      ]
      """
    And an executable file "linters/check-a.sh" with content
      """
      #!/usr/bin/env bash
      exit 0
      """
    And an executable file "linters/check-b.sh" with content
      """
      #!/usr/bin/env bash
      exit 0
      """
    When executing "tricorder check"
    Then the exit code is 0

  Scenario: no tricorder.toml
    When executing "tricorder check"
    Then the exit code is 0
