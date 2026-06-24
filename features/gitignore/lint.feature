Feature: ignore files in .gitignore

  Scenario: all Python files are ignored
    Given a file ".gitignore" with content
      """
      *.py
      """
    And a file ".git/info/exclude" with content
      """
      this file must exist for the .gitignore detection to work
      """
    And a file "main.py" with content
      """
      # this file will get ignored
      """
    And a file "run-that-app" with content
      """
      delete-empty-folders 0.0.2
      """
    When executing "tricorder lint"
    Then it prints nothing to STDOUT
    And the exit code is 0
