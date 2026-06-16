Feature: check Python

  Background:
    Given a file "run-that-app" with content
      """
      ruff 0.15.16
      """

  Scenario: valid JSON
    Given a file "main.py" with content
      """
      print("Hello, world!")
      """
    And a file "other.py" with content
      """
      print("Hello, other!")
      """
    When executing "tricorder check --show=all"
    Then it prints
      """
      Python (check format)
      2 files already formatted
      Python (lint)
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
    When executing "tricorder check --show=all"
    Then it prints
      """
      Python (check format)
      Would reformat: main.py
      Would reformat: other.py
      2 files would be reformatted
      """
    And the exit code is 1
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
    When executing "tricorder check --show=all"
    Then it prints the block
      """
      Python (check format)
      error: Failed to parse main.py:1:7: missing closing quote in string literal
      error: Failed to parse other.py:1:7: missing closing quote in string literal
      """
    And the exit code is 2
    And file "main.py" is unchanged
    And file "other.py" is unchanged
