Feature: fix TOML

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
    When executing "tricorder fix --show=all"
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
    And a file "other.toml" with content
      """
      key =     "other"
      """
    When executing "tricorder fix --show=all"
    Then it prints the lines
      """
      TOML (Taplo)
      """
    And the exit code is 0
    And file "main.toml" now has content
      """
      key = "value"
      """
    And file "other.toml" now has content
      """
      key = "other"
      """

  Scenario: invalid TOML
    Given a file "main.toml" with content
      """
      key = "
      """
    When executing "tricorder fix --show=all"
    Then it prints the lines
      """
      TOML (Taplo)
      error: invalid TOML
      """
    And the exit code is 1
    And file "main.toml" is unchanged
