@this
Feature: install all Python tools

  Scenario: not installed
    Given a file "run-that-app" with content
      """
      prettier-standalone 0.24.0
      """
    Given a file "main.py" with content
      """
      print    ("Hello, world!")
      """
    And a file "pyrightconfig.json" with content
      """
      {
        "typeCheckingMode": "strict"
      }
      """
    When executing "tricorder fix --show=all"
    Then it prints the lines to STDERR
      """
      Talking to GitHub API (https://api.github.com/repos/astral-sh/ruff/releases/latest) ... ok
      """
    And it prints the block
      """
      Python (ruff fix)
      All checks passed!
      """
    And it prints the block
      """
      Python (ruff format)
      1 file reformatted
      """
    And the exit code is 0
    And file "main.py" now has content
      """
      print("Hello, world!")
      """
    And file "run-that-app" now matches
      """
      # more info at https://github.com/kevgo/run-that-app

      prettier-standalone 0.24.0
      ruff \d+\.\d+\.\d+
      """
