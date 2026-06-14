Feature: check TOML

  Background:
    Given a file "run-that-app" with content
      """
      taplo 0.10.0
      """

  Scenario: valid TOML
    Given a file "main.toml" with content
      """
      key = "value"
      """
    Given a file "other.toml" with content
      """
      key = "other"
      """
    When executing "tricorder check --show=all"
    Then it prints the block
      """
      TOML (taplo)
      """
    And the exit code is 0
    And file "main.toml" is unchanged
    And file "other.toml" is unchanged

  Scenario: unformatted TOML
    Given a file "main.toml" with content
      """
      key =     "value"
      """
    Given a file "other.toml" with content
      """
      key =     "other"
      """
    When executing "tricorder check --show=all"
    Then it prints the lines
      """
      TOML (taplo)
      """
    And the exit code is 0
    And file "main.toml" is unchanged
    And file "other.toml" is unchanged

  Scenario: invalid TOML
    Given a file "main.toml" with content
      """
      key = "
      """
    Given a file "other.toml" with content
      """
      other = "
      """
    When executing "tricorder check --show=all"
    Then it prints the lines
      """
      TOML (taplo)
      error: invalid TOML
      error: invalid TOML
      """
    And the exit code is 1
    And file "main.toml" is unchanged
    And file "other.toml" is unchanged
