Feature: precommit Cucumber

  Background:
    Given a file "run-that-app" with content
      """
      ghokin 3.9.0
      """

  Scenario: valid Cucumber
    Given a file "main.feature" with content
      """
      Feature: foo

        Scenario: bar
          Given a step
      """
    When executing "tricorder precommit --show=all"
    Then it prints the lines
      """
      Cucumber (Ghokin)
      "." formatted
      """
    And the exit code is 0
    And file "main.feature" is unchanged

  Scenario: unformatted Cucumber
    Given a file "main.feature" with content
      """
      Feature:   foo

        Scenario:   bar
          Given   a step
      """
    And a file "other.feature" with content
      """
      Feature:   foo2

        Scenario:   bar2
          Given   another step
      """
    When executing "tricorder precommit --show=all"
    Then it prints the lines
      """
      Cucumber (Ghokin)
      "." formatted
      """
    And the exit code is 0
    And file "main.feature" now has content
      """
      Feature: foo

        Scenario: bar
          Given a step
      """
    And file "other.feature" now has content
      """
      Feature: foo2

        Scenario: bar2
          Given another step
      """

  Scenario: invalid Cucumber
    Given a file "main.feature" with content
      """
      Feat
      """
    When executing "tricorder precommit --show=all"
    Then it prints the lines
      """
      Cucumber (Ghokin)
      an error occurred with file "main.feature" : Parser errors:
      (1:1): expected: #EOF, #Language, #TagLine, #FeatureLine, #Comment, #Empty, got 'Feat'
      """
    And the exit code is 0
    And file "main.feature" is unchanged
