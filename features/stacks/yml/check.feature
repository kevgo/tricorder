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
    Then it prints nothing to STDOUT
    And the exit code is 0
    And file "main.yml" is unchanged

  Scenario: unformatted YML
    Given a file "main.yml" with content
      """
      key:     value
      """
    When executing "tricorder check --show=all"
    Then it prints nothing to STDOUT
    And the exit code is 0
    And file "main.yml" is unchanged

  Scenario: invalid YML
    Given a file "main.yml" with content
      """
      key: "
      """
    When executing "tricorder check --show=all"
    Then it prints nothing to STDOUT
    And the exit code is 0
    And file "main.yml" is unchanged
