Feature: creates missing run-that-app file and adds missing tools to it

  Scenario: run without run-that-app file
    Given a file "test.py" with content
      """
      print("")
      """
    When executing "tricorder check"
    Then it prints:
      """
      discovering files ... 1
      discovering stacks ... python
      Talking to GitHub API (https://api.github.com/repos/astral-sh/ruff/releases/latest) ... ok
      added ruff@0.15.16 to run-that-app
      running 1 tools
      ruff --check
      Would reformat: test.py
      1 file would be reformatted
      """
    And the exit code is 1
    And file "run-that-app" now matches
      """
      # more info at https://github.com/kevgo/run-that-app

      ruff \d+\.\d+\.\d+
      """

  Scenario: run with empty run-that-app file
    Given a file "run-that-app" with content
      """

      """
    And a file "test.py" with content
      """
      print("")
      """
    When executing "tricorder check"
    Then it prints:
      """
      discovering files ... 2
      discovering stacks ... python
      Talking to GitHub API (https://api.github.com/repos/astral-sh/ruff/releases/latest) ... ok
      added ruff@0.15.16 to run-that-app
      running 1 tools
      ruff --check
      Would reformat: test.py
      1 file would be reformatted
      """
    And the exit code is 1
    And file "run-that-app" now matches
      """
      # more info at https://github.com/kevgo/run-that-app

      ruff \d+\.\d+\.\d+
      """
