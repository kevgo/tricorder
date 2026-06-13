Feature: check Python

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
    Then it prints the lines
      """
      Python (ruff)
      Would reformat: main.py

      """
    And it does not print
      """
      Talking to GitHub API
      """
    And the exit code is 1

  @online
  Scenario: auto-install
    When executing "tricorder check"
    Then it prints the lines
      """
      Talking to GitHub API (https://api.github.com/repos/astral-sh/ruff/releases/latest) ... ok
      """
    And the exit code is 1
    And file "run-that-app" now matches
      """
      # more info at https://github.com/kevgo/run-that-app

      ruff \d+\.\d+\.\d+
      """
