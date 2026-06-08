Feature: ignore files in .gitignore

  Scenario: all Python files are ignored
    Given a file ".gitignore" with content:
      """
      *.py
      """
    And a file "main.py" with content:
      """
      print("Hello, world!")
      """
    When executing "tricorder check"
    Then it prints:
      """
      discovering files ... 1
      discovering stacks ... python
      error: RunRequestMissingVersion { app: "ruff" }
      ADDING APP TO CONFIG FILE
      added ruff@0.15.16 to run-that-app
      running 1 tools
      ruff --check
      Would reformat: main.py
      1 file would be reformatted
      Talking to GitHub API (https://api.github.com/repos/astral-sh/ruff/releases/latest) ... ok
      """
    And the exit code is 1
