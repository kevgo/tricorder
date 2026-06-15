Feature: check YML

  Background:
    Given a file "run-that-app" with content
      """
      prettier-standalone 0.24.0
      """

  Scenario: valid YML
    Given a file "main.yml" with content
      """
      key: value
      """
    When executing "tricorder check --show=all"
    Then it prints the block
      """
      YML (prettier)
      """
    And the exit code is 0
    And file "main.yml" is unchanged

  Scenario: unformatted YML
    Given a file "main.yml" with content
      """
      key:     value
      """
    Given a file "other.yml" with content
      """
      key:     other
      """
    When executing "tricorder check --show=all"
    Then it prints the lines
      """
      YML (prettier)
      other.yml
      main.yml
      """
    And the exit code is 1
    And file "main.yml" is unchanged
    And file "other.yml" is unchanged

  Scenario: invalid YML
    Given a file "main.yml" with content
      """
      key: "
      """
    When executing "tricorder check --show=all"
    Then it prints the lines
      """
      YML (prettier)
      [error] main.yml: SyntaxError: Missing closing "quote (1:6)
      """
    And the exit code is 2
    And file "main.yml" is unchanged
