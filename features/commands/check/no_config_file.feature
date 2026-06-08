Feature: run without config file

  Scenario: run without config file
    Given a file "test.py" with content:
      """
      print("")
      """
    When executing "tricorder check"
    Then the output contains
      """
      discovering files ... 1
      discovering stacks ... python
      error: RunRequestMissingVersion { app: "ruff" }
      ADDING APP TO CONFIG FILE
      added ruff@0.15.16 to run-that-app
      running 1 tools
      ruff --check
      Would reformat: test.py
      1 file would be reformatted
      Talking to GitHub API (https://api.github.com/repos/astral-sh/ruff/releases/latest) ... ok
      """
    And the exit code is 1
