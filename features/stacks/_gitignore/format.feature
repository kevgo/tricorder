Feature: don't format files in .gitignore

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
      #      this file will get ignored
      """
    When executing "tricorder format"
    Then it prints
      """
      no stacks found
      """
    And the exit code is 0
