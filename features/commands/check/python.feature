Feature: checking a codebase containing Python code

  Scenario: checking a codebase with Python
    Given a file "run-that-app" with content
      """
      ruff 0.15.16
      """
    And a file "main.py" with content
      """
      print("Hello, world!")
      """
    When executing "tricorder check"
    Then it prints:
      """
      discovering files ... 2
      discovering stacks ... python
      running 1 tools
      ruff --check
      Would reformat: main.py
      1 file would be reformatted
      """
    And the exit code is 1
