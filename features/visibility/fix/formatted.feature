Feature: fix multiple good stacks

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
    When executing "tricorder fix"
    Then it prints nothing to STDOUT
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
      """
    And it prints the lines
      """
      TypeScript (Biome)
      """
    And it prints the block
      """
      Python (ruff fix)
      All checks passed!
      """
    And it prints the block
      """
      Python (ruff format)
      1 file left unchanged
      """
    And all files are unchanged

  Scenario: --show=names
    When executing "tricorder fix --show=names"
    Then it prints only these lines in any order
      """
      delete-empty-folders
      Python (ruff fix)
      Python (ruff format)
      CSS (Biome)
      TypeScript (Biome)
      """
    And all files are unchanged

  Scenario: --show=failed
    When executing "tricorder fix --show=failed"
    Then it prints nothing to STDOUT
    And all files are unchanged
