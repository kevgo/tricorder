Feature: check multiple stacks

  Background:
    Given a file "run-that-app" with content
      """
      biome 2.4.0
      ruff 0.15.16
      delete-empty-folders 0.0.2
      """
    And a file "main.py" with content
      """
      print("hello")
      """
    And a file "main.css" with content
      """
      .foo {
      \tcolor: red;
      }
      """
    And a file "main.ts" with content
      """
      console.log("hello");
      """

  Scenario: default visibility
    When executing "tricorder check"
    Then it prints nothing to STDOUT
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
      check CSS (Biome)
      """
    And it prints the lines
      """
      check TypeScript (Biome)
      """
    And it prints the block
      """
      check Python (ruff)
      All checks passed!
      """
    And all files are unchanged

  Scenario: --show=names
    When executing "tricorder check --show=names"
    Then it prints only these lines in any order
      """
      check TypeScript (Biome)
      check CSS (Biome)
      check Python (ruff)
      """
    And it prints nothing to STDERR
    And all files are unchanged

  Scenario: --show=failed
    When executing "tricorder check --show=failed"
    Then it prints nothing to STDOUT
    And all files are unchanged
