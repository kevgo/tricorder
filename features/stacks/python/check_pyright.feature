Feature: check Python

  Background:
    Given a file "run-that-app" with content
      """
      ruff 0.15.16
      uv 0.11.21
      """
    And a file "pyrightconfig.json" with content
      """
      {
        "typeCheckingMode": "strict"
      }
      """
    And I ran "tools/rta uv tool install pyright"

  @this
  Scenario: valid Python
    Given a file "main.py" with content
      """
      print("Hello, world!")
      """
    And a file "other.py" with content
      """
      print("Hello, other!")
      """
    When executing "tricorder check --show=all"
    Then it prints the block
      """
      Python (lint)
      All checks passed!
      """
    And it prints the block
      """
      Python (Pyright)
      0 errors, 0 warnings, 0 informations
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
    When executing "tricorder check --show=all"
    Then the exit code is 1
    And file "main.py" is unchanged
    And file "other.py" is unchanged
