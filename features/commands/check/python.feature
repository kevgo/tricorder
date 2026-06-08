Feature: checking a codebase containing Python code

  Scenario: checking a codebase with Python
    Given a file "main.py" with content:
      """
      print("Hello, world!")
      """
    When executing "tricorder check"
    Then it prints:
      """
      discovering files ... 1
      discovering stacks ... python
      running 1 tools
      ruff --check
      Would reformat: main.py
      """
    And the exit code is 1
