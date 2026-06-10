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
      2 files, python
      running 1 tools
      ruff --check
      Would reformat: main.py
      1 file would be reformatted
      """
    And it does not print:
      """
      Talking to GitHub API
      """
    And the exit code is 1

  Scenario: unconfigured
    When executing "tricorder check"
    Then it prints:
      """
      1 files, python
      Talking to GitHub API (https://api.github.com/repos/astral-sh/ruff/releases/latest) ... ok
      added ruff@0.15.16 to run-that-app
      running 1 tools
      ruff --check
      Would reformat: main.py
      1 file would be reformatted
      """
    And the exit code is 1
    And file "run-that-app" now matches
      """
      # more info at https://github.com/kevgo/run-that-app

      ruff \d+\.\d+\.\d+
      """
