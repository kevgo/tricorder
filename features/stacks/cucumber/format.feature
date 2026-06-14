Feature: format Cucumber

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
    When executing "tricorder format --show=all"
    Then it prints the lines
      """
      Cucumber (ghokin)
      "./main.feature" formatted
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
    When executing "tricorder format --show=all"
    Then it prints the lines
      """
      Cucumber (ghokin)
      "./main.feature" formatted
      """
    And the exit code is 0
    And file "main.feature" now has content
      """
      Feature: foo
      
        Scenario: bar
          Given a step
      """

  Scenario: invalid Cucumber
    Given a file "main.feature" with content
      """
      Feat
      """
    When executing "tricorder format --show=all"
    Then it prints the lines
      """
      Cucumber (ghokin)
      Parser errors:
      (1:1): expected: #EOF, #Language, #TagLine, #FeatureLine, #Comment, #Empty, got 'Feat'
      """
    And the exit code is 1
    And file "main.feature" is unchanged
