Feature: "tricorder postedit" in a clean repository

  Scenario: committed files are not linted
    Given a Git repository
    And a committed file "run-that-app" with content
      """
      rumdl 0.2.14
      delete-empty-folders 0.0.2
      """
    And a committed file "main.md" with content
      """
      text
      """
    When executing "tricorder postedit --show=all"
    Then it prints to STDERR
      """
      running 1 tools
      """
    And it prints the lines
      """
      lint Git (git diff HEAD --check)
      """
    And it does not print
      """
      lint Markdown
      """
    And the exit code is 0
