Feature: all tests are passing

  Background:
    Given a file "README.md" with content
      """
      # Hello
      """
    And a file "main.py" with content
      """
      print("hello")
      """
    And a file "run-that-app" with content
      """
      rumdl 0.2.14
      ruff 0.15.16
      """

  Scenario: default behavior
    When executing "tricorder check"
    Then it prints nothing
    And the exit code is 0

  Scenario: --show=all
    When executing "tricorder check --show=all"
    Then it prints the lines
      """
      1 Markdown, 1 Python, 1 other
      running 2 tools
      """
    And it prints the lines
      """
      Markdown (rumdl)
      """
    And it prints the lines
      """
      Python (ruff)
      1 file already formatted
      """
    And the exit code is 0

  Scenario: --show=names
    When executing "tricorder check --show=names"
    Then it prints these lines in any order
      """
      Markdown (rumdl)
      Python (ruff)
      """
    And the exit code is 0

  @this
  Scenario: --show=failed
    When executing "tricorder check --show=failed"
    Then it prints nothing
    And the exit code is 0
