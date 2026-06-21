Feature: fix multiple stacks with invalid code

  Background:
    Given a file "run-that-app" with content
      """
      biome 2.4.0
      ruff 0.15.16
      """
    And a file "main.py" with content
      """
      print("
      """
    And a file "main.css" with content
      """
      .foo {
      """
    And a file "main.ts" with content
      """
      console.log("
      """

  Scenario: default visibility
    When executing "tricorder fix"
    Then it prints nothing to STDERR
    And it does not print any of these lines
      """
      CSS (Biome)
      TypeScript (Biome)
      Python (ruff)
      """
    And it prints the block
      """
      Found 2 errors.
      main.ts:1:13 parse ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      """
    And it prints the block
      """
      Found 1 error.
      main.css:2:1 parse ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      """
    And it prints the block
      """
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

      Found 2 errors.
      """
    And all files are unchanged

  Scenario: --show=all
    When executing "tricorder fix --show=all"
    Then it prints to STDERR
      """
      1 CSS, 1 Python, 1 TypeScript, 1 other
      running 5 tools
      """
    And it prints the lines
      """
      CSS (Biome)
      Found 1 error.
      main.css:2:1 parse ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      """
    And it prints the lines
      """
      TypeScript (Biome)
      Found 2 errors.
      main.ts:1:13 parse ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      """
    # no python error message here
    And all files are unchanged

  Scenario: --show=names
    When executing "tricorder fix --show=names"
    Then it prints nothing to STDERR
    And it prints the lines
      """
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

      Found 2 errors.
      """
    And it prints the lines
      """
      CSS (Biome)
      Found 1 error.
      main.css:2:1 parse ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      """
    And it prints the lines
      """
      TypeScript (Biome)
      Found 2 errors.
      main.ts:1:13 parse ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      """
    And all files are unchanged

  Scenario: --show=failed
    When executing "tricorder fix --show=failed"
    Then it prints nothing to STDERR
    And it does not print any of these lines
      """
      CSS (Biome)
      TypeScript (Biome)
      Python (ruff fix)
      Python (ruff format)
      """
    And it prints the block
      """
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

      Found 2 errors.
      """
    And it prints the block
      """
      Found 1 error.
      main.css:2:1 parse ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      """
    And it prints the block
      """
      Found 2 errors.
      main.ts:1:13 parse ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      """
    And all files are unchanged
