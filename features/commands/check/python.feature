Feature: checking Python code

  Background:
    And a file "main.py" with content
      """
      print("Hello, world!")
      """

  Scenario: already configured
    Given a file "run-that-app" with content
      """
      ruff 0.15.16
      """
    When executing "tricorder check"
    Then it prints:
      """
      1 Python, 1 other
      running 1 tools
      Python (ruff)
      Would reformat: main.py
      1 file would be reformatted
      """
    And it does not print:
      """
      Talking to GitHub API
      """
    And the exit code is 1

  @online
  Scenario: unconfigured
    When executing "tricorder check"
    Then it prints:
      """
      1 Python
      Talking to GitHub API (https://api.github.com/repos/astral-sh/ruff/releases/latest) ... ok
      running 1 tools
      Python (ruff)
      Would reformat: main.py
      1 file would be reformatted
      """
    And the exit code is 1
    And file "run-that-app" now matches
      """
      # more info at https://github.com/kevgo/run-that-app

      ruff \d+\.\d+\.\d+
      """
