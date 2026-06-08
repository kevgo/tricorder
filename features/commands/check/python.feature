Feature: checking a codebase containing Python code

  Scenario: checking a codebase with Python
    Given a file "main.py" with content:
      """
      print("Hello, world!")
      """
    When executing "tricorder check"
    Then it prints:
      """
      ruff --check
      Would reformat: main.py
      discovering files ... 1
      discovering stacks ... python
      running 1 tools
      """
    And the exit code is 1
