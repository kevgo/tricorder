Feature: "tricorder lint" checks the Git changes for whitespace errors

  Background:
    Given a Git repository

  Scenario: clean repository
    Given a committed file "main.txt" with content
      """
      line one
      """
    When executing "tricorder lint"
    Then it prints nothing to STDOUT
    And it prints nothing to STDERR
    And the exit code is 0

  Scenario: whitespace error in a changed file
    Given a committed file "main.txt" with content
      """
      line one
      """
    And I change file "main.txt" to
      """
      line one
       \tindented
      """
    When executing "tricorder lint"
    Then it prints the block
      """
      main.txt:2: space before tab in indent.
      """
    And the exit code is 2

  Scenario: conflict markers in a changed file
    Given a committed file "main.txt" with content
      """
      line one
      """
    And I change file "main.txt" to
      """
      line one
      <<<<<<< HEAD:main.txt
      Hello world
      =======
      Goodbye
      >>>>>>> 77976da35a11db4580b80ae27e8d65caf5208086:main.txt
      """
    When executing "tricorder lint"
    Then it prints the block
      """
      main.txt:2: space before tab in indent.
      """
    And the exit code is 2
