Feature: checking a codebase containing Python code

  Scenario: checking a codebase with Python
    Given a file "main.py" with content:
      """
      print("Hello, world!")
      """
    And a tool "ruff"
    When executing "tricorder check"
    Then it prints:
      """
      echo hello
      hello
      discovering files ... 1
      discovering stacks ... 1
      - python
      running 1 tools ...
      ok
      """
    And the exit code is 0
