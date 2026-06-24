Feature: lint multiple stacks with unformatted files

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
    When executing "tricorder lint"
    Then it prints nothing to STDERR
    And it does not print any of these lines
      """
      lint CSS (Biome)
      lint TypeScript (Biome)
      lint Python (ruff)
      """
    And it prints nothing to STDOUT
    And the exit code is 0
    And all files are unchanged

  Scenario: --show=all
    When executing "tricorder lint --show=all"
    Then it prints to STDERR
      """
      1 CSS, 1 Python, 1 TypeScript, 1 other
      running 3 tools
      """
    And it prints the block
      """
      lint Python (ruff)
      All checks passed!
      """
    And it prints the block
      """
      lint CSS (Biome)
      """
    And it prints the block
      """
      lint TypeScript (Biome)
      """
    And the exit code is 0
    And all files are unchanged

  Scenario: --show=names
    When executing "tricorder lint --show=names"
    Then it prints nothing to STDERR
    And it prints only these lines in any order
      """
      lint Python (ruff)
      lint TypeScript (Biome)
      lint CSS (Biome)
      """
    And the exit code is 0
    And all files are unchanged

  Scenario: --show=failed
    When executing "tricorder lint --show=failed"
    Then it prints nothing to STDERR
    And it prints nothing to STDOUT
    And the exit code is 0
    And all files are unchanged
