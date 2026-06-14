Feature: check multiple stacks

  Background:
    Given a file "run-that-app" with content
      """
      biome 2.4.0
      ruff 0.15.16
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
    Then it prints nothing
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
      """
    And it prints the lines
      """
      TypeScript (biome)
      """
    And it prints the block
      """
      Python (ruff)
      1 file already formatted
      """
    And all files are unchanged

  Scenario: --show=names
    When executing "tricorder check --show=names"
    Then it prints only these lines in any order
      """
      TypeScript (biome)
      CSS (biome)
      Python (ruff)
      """
    And it prints nothing to STDERR
    And all files are unchanged

  Scenario: --show=failed
    When executing "tricorder check --show=failed"
    Then it prints nothing
    And all files are unchanged
