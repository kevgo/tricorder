Feature: checking a codebase containing Python code

  Scenario: checking a codebase with Python
    Given a file "main.py" with content:
      """
      print("Hello, world!")
      """
    When executing "tricorder check"
    Then it prints nothing
    And the exit code is 0
