Feature: install all Python tools

  Background:
    Given a file "main.py" with content
      """
      print    ("Hello, world!")
      """

  Scenario: not installed
    When executing "tricorder format --show=all"
    Then it prints the lines
      """
      Talking to GitHub API (https://api.github.com/repos/astral-sh/ruff/releases/latest) ... ok
      Python (ruff)
      """
    And the exit code is 0
    And file "main.py" now has content
      """
      print("Hello, world!")
      """
    And file "run-that-app" now matches
      """
      # more info at https://github.com/kevgo/run-that-app

      ruff \d+\.\d+\.\d+
      """

  Scenario: already installed
    Given a file "run-that-app" with content
      """
      ruff 0.15.16
      """
    When executing "tricorder format --show=all"
    Then it prints the lines
      """
      Python (ruff)
      """
    And it does not print
      """
      Talking to GitHub API
      """
    And the exit code is 0
    And file "main.py" now has content
      """
      print("Hello, world!")
      """
