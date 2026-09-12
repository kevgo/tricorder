@online
Feature: install Gherkin Lint

  @this
  Scenario: not installed
    Given a file "run-that-app" with content
      """
      delete-empty-folders 0.0.2
      """
    Given a file "features/one.feature" with content
      """
      Feature: one

        Scenario: one
          Given a step
      """
    And a file ".gherkin-lintrc" with content
      """
      {}
      """
    When executing "tricorder lint --show=all"
    Then it prints the lines
      """
      lint Cucumber (gherkin-lint)
      """
    And the exit code is 0
    And file "run-that-app" now has an additional line matching
      """
      gherkin-lint \d+\.\d+\.\d+
      node \d+\.\d+\.\d+
      """
