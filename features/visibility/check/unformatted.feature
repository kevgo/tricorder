Feature: check multiple stacks with unformatted files

  Background:
    Given a file "run-that-app" with content
      """
      biome 2.4.0
      ruff 0.15.16
      delete-empty-folders 0.0.2
      """
    And a file "main.py" with content
      """
      print(  "hello"  )
      """
    And a file "main.css" with content
      """
      .foo {
        color : red ;
      }
      """
    And a file "main.ts" with content
      """
      console.log(  "hello"  );
      """

  Scenario: default visibility
    When executing "tricorder check"
    Then it prints nothing to STDERR
    And it does not print any of these lines
      """
      CSS (Biome)
      TypeScript (Biome)
      Python (ruff)
      """
    And it prints nothing to STDOUT
    And the exit code is 0
    And all files are unchanged

  Scenario: --show=all
    When executing "tricorder check --show=all"
    Then it prints to STDERR
      """
      1 CSS, 1 Python, 1 TypeScript, 1 other
      running 3 tools
      """
    And it prints the block
      """
      Python (ruff check)
      All checks passed!
      """
    And it prints the block
      """
      CSS (Biome)
      """
    And it prints the block
      """
      TypeScript (Biome)
      """
    And the exit code is 0
    And all files are unchanged

  Scenario: --show=names
    When executing "tricorder check --show=names"
    Then it prints nothing to STDERR
    And it prints only these lines in any order
      """
      Python (ruff check)
      TypeScript (Biome)
      CSS (Biome)
      """
    And the exit code is 0
    And all files are unchanged

  Scenario: --show=failed
    When executing "tricorder check --show=failed"
    Then it prints nothing to STDERR
    And it prints nothing to STDOUT
    And the exit code is 0
    And all files are unchanged
