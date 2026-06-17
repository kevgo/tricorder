Feature: check multiple stacks with invalid code

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
    When executing "tricorder check"
    Then it prints nothing to STDERR
    And it does not print any of these lines
      """
      CSS (biome)
      TypeScript (biome)
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
      """
    And all files are unchanged

  Scenario: --show=all
    When executing "tricorder check --show=all"
    Then it prints to STDERR
      """
      1 CSS, 1 Python, 1 TypeScript, 1 other
      running 3 tools
      """
    And it prints the lines
      """
      CSS (biome)
      Found 1 error.
      main.css:2:1 parse ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      """
    And it prints the lines
      """
      TypeScript (biome)
      Found 2 errors.
      main.ts:1:13 parse ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      """
    And all files are unchanged

  Scenario: --show=names
    When executing "tricorder check --show=names"
    Then it prints nothing to STDERR
    And it prints the lines
      """
      CSS (biome)
      Found 1 error.
      main.css:2:1 parse ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      """
    And it prints the lines
      """
      TypeScript (biome)
      Found 2 errors.
      main.ts:1:13 parse ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      """
    And all files are unchanged

  Scenario: --show=failed
    When executing "tricorder check --show=failed"
    Then it prints nothing to STDERR
    And it does not print any of these lines
      """
      CSS (biome)
      TypeScript (biome)
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
    And it prints the block
      """
      invalid-syntax: missing closing quote in string literal
       --> main.py:1:7
      """
    And all files are unchanged
