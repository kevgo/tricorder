Feature: check CSS

  Background:
    Given a file "run-that-app" with content
      """
      npm 26.3.0
      """

  @this
  Scenario: valid Cucumber
    Given a file "features/one.feature" with content
      """
      Feature: one

        Scenario: one
          Given a step
      """
    When executing "tricorder check --show=all"
    Then it prints the lines
      """
      Cucumber (gherkin-lint)
      """
    And the exit code is 0
    And file "features/one.feature" is unchanged

  Scenario: unformatted CSS
    Given a file "features/one.feature" with content
      """
      Feature: one

        Scenario: one
                  Given a step
      """
    When executing "tricorder check --show=all"
    Then it prints the lines
      """
      Cucumber (gherkin-lint)
      Found 1 error.
      """
    And the exit code is 1
    And file "main.css" is unchanged

  Scenario: invalid CSS
    Given a file "main.css" with content
      """
      .foo {
        col
      }
      """
    When executing "tricorder check --show=all"
    Then it prints the lines
      """
      CSS (biome)
      Found 5 errors.
      """
    And the exit code is 1
    And file "main.css" is unchanged
