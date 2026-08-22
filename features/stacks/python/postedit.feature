Feature: postedit Python

  Background:
    Given a Git repository
    And a committed file "run-that-app" with content
      """
      ruff 0.15.16
      delete-empty-folders 0.0.2
      """

  Scenario: valid Python
    Given a file "main.py" with content
      """
      print("Hello, world!")
      """
    And a file "other.py" with content
      """
      print("Hello, other!")
      """
    When executing "tricorder postedit --show=all"
    Then it prints the block
      """
      lint Python (ruff)
      All checks passed!
      """
    And the exit code is 0
    And file "main.py" is unchanged
    And file "other.py" is unchanged

  Scenario: unformatted Python
    Given a file "main.py" with content
      """
      print   ("Hello, world!")
      """
    And a file "other.py" with content
      """
      print   ("Hello, other!")
      """
    When executing "tricorder postedit --show=all"
    Then the exit code is 0
    And file "main.py" is unchanged
    And file "other.py" is unchanged

  Scenario: invalid Python
    Given a file "main.py" with content
      """
      print("
      """
    And a file "other.py" with content
      """
      print("
      """
    When executing "tricorder postedit --show=all"
    Then the exit code is 1
    And file "main.py" is unchanged
    And file "other.py" is unchanged
