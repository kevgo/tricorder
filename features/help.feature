Feature: Testing Cucumber

  Scenario: Hello World
    When executing "tricorder"
    Then it prints:
      """
      Hello, world!
      """
    And the exit code is 0
