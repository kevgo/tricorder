Feature: ignore files in .gitignore

  @this
  Scenario: all Python files are ignored
    Given a file ".gitignore" with content:
      """
      *.py
      """
    And a file ".git/info/exclude" with content:
      """
      other
      """
    And a file "main.py" with content:
      """
      print("Hello, world!")
      """
    When executing "tricorder check"
    Then it prints:
      """
      discovering files ... 0
      discovering stacks ...0
      """
    And the exit code is 1
