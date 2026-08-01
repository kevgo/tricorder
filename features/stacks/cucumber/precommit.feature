Feature: precommit Cucumber

  Background:
    Given a Git repository
    And a file "run-that-app" with content
      """
      ghokin 3.10.0
      delete-empty-folders 0.0.2
      """
    And I ran "git add -A"
    And I ran "git commit -m original"

  Scenario: valid Cucumber
    Given a file "main.feature" with content
      """
      Feature: foo

        Scenario: bar
          Given a step
      """
    When executing "tricorder precommit"
    Then it prints nothing to STDOUT
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
    And I ran "git add -A"
    When executing "tricorder precommit"
    Then it prints nothing to STDOUT
    Then the exit code is 0
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
    And I ran "git add -A"
    When executing "tricorder precommit"
    Then it prints
      """
      Parser errors:
      (1:1): expected: #EOF, #Language, #TagLine, #FeatureLine, #Comment, #Empty, got 'Feat'
      """
    And the exit code is 0
    And file "main.feature" is unchanged
