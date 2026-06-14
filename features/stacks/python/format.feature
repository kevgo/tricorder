Feature: format Python

  Background:
    Given a file "run-that-app" with content
      """
      ruff 0.15.16
      """

  Scenario: valid Python
    Given a file "main.py" with content
      """
      print("Hello, world!")
      """
    Given a file "other.py" with content
      """
      print("Hello, other!")
      """
    When executing "tricorder format --show=all"
    Then it prints the block
      """
      Python (ruff)
      """
    And the exit code is 0
    And file "main.py" is unchanged
    And file "other.py" is unchanged

  Scenario: unformatted Python
    Given a file "main.py" with content
      """
      print   ("Hello, world!")
      """
    Given a file "other.py" with content
      """
      print   ("Hello, other!")
      """
    When executing "tricorder format --show=all"
    Then it prints the lines
      """
      Python (ruff)
      """
    And the exit code is 0
    And file "main.py" now has content
      """
      print("Hello, world!")
      """
    And file "other.py" now has content
      """
      print("Hello, other!")
      """

  Scenario: invalid Python
    Given a file "main.py" with content
      """
      print("
      """
    Given a file "other.py" with content
      """
      print("
      """
    When executing "tricorder format --show=all"
    Then it prints the block
      """
      Python (ruff)
      """
    And the exit code is 2
    And file "main.py" is unchanged
    And file "other.py" is unchanged
