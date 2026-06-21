Feature: check TOML

  Background:
    Given a file "run-that-app" with content
      """
      taplo 0.10.0
      delete-empty-folders 0.0.2
      """

  Scenario: valid TOML
    Given a file "main.toml" with content
      """
      key = "value"
      """
    When executing "tricorder check --show=all"
    Then it prints the block
      """
      TOML (Taplo)
      """
    And the exit code is 0
    And file "main.toml" is unchanged

  Scenario: unformatted TOML
    Given a file "main.toml" with content
      """
      key =     "value"
      """
    When executing "tricorder check --show=all"
    Then it prints the lines
      """
      TOML (Taplo)
      """
    And the exit code is 0
    And file "main.toml" is unchanged

  Scenario: invalid TOML
    Given a file "main.toml" with content
      """
      key = "
      """
    And a file "other.toml" with content
      """
      other = "
      """
    When executing "tricorder check --show=all"
    Then it prints the lines
      """
      TOML (Taplo)
      error: invalid TOML
      """
    And the exit code is 1
    And file "main.toml" is unchanged
