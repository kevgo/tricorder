Feature: run without config file

  @this
  Scenario: run without config file
    Given a file "test.py" with content:
      """
      print("Hello, world!")
      """
    When executing "tricorder check"
    Then the output contains
      """
      discovering files ... 1
      discovering stacks ... python
      running 1 tools
      ruff --check
      Would reformat: main.py
      """
    And the exit code is 1
