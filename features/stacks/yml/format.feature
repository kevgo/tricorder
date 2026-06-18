Feature: format YML

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
    When executing "tricorder fix --show=all"
    Then it prints the block
      """
      YML (Prettier)
      """
    And the exit code is 0
    And file "main.yml" is unchanged

  Scenario: unformatted YML
    Given a file "main.yml" with content
      """
      key:     value
      """
    And a file "other.yml" with content
      """
      key:     other
      """
    When executing "tricorder fix --show=all"
    Then it prints the lines
      """
      YML (Prettier)
      """
    And the exit code is 0
    And file "main.yml" now has content
      """
      key: value
      """
    And file "other.yml" now has content
      """
      key: other
      """

  Scenario: invalid YML
    Given a file "main.yml" with content
      """
      key: "
      """
    When executing "tricorder fix --show=all"
    Then it prints the lines
      """
      YML (Prettier)
      [error] main.yml: SyntaxError: Missing closing "quote (1:6)
      """
    And the exit code is 2
    And file "main.yml" is unchanged
