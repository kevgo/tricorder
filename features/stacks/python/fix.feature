Feature: fix Python

  Background:
    Given a file "run-that-app" with content
      """
      ruff 0.15.16
      delete-empty-folders 0.0.2
      """

  Scenario: valid Python
    And a file "main.py" with content
      """
      print("Hello, world!")
      """
    And a file "other.py" with content
      """
      print("Hello, other!")
      """
    When executing "tricorder fix --show=all"
    Then it prints
      """
      delete-empty-folders
      Python (ruff fix)
      All checks passed!
      Python (ruff format)
      2 files left unchanged
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
    When executing "tricorder fix --show=all"
    Then it prints
      """
      delete-empty-folders
      Python (ruff fix)
      All checks passed!
      Python (ruff format)
      2 files reformatted
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
    And a file "other.py" with content
      """
      print("
      """
    When executing "tricorder fix --show=all"
    Then it prints
      """
      delete-empty-folders
      Python (ruff fix)
      invalid-syntax: missing closing quote in string literal
       --> main.py:1:7
        |
      1 | print("
        |       ^
        |

      invalid-syntax: unexpected EOF while parsing
       --> main.py:2:1
        |
      1 | print("
        |        ^
        |

      invalid-syntax: missing closing quote in string literal
       --> other.py:1:7
        |
      1 | print("
        |       ^
        |

      invalid-syntax: unexpected EOF while parsing
       --> other.py:2:1
        |
      1 | print("
        |        ^
        |

      Found 4 errors.
      """
    And the exit code is 1
    And file "main.py" is unchanged
    And file "other.py" is unchanged
