Feature: format multiple good stacks

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
    When executing "tricorder fix"
    Then it prints nothing
    And all files are unchanged

  Scenario: --show=all
    When executing "tricorder fix --show=all"
    Then it prints to STDERR
      """
      1 CSS, 1 Python, 1 TypeScript, 1 other
      running 4 tools
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
      Python (fix)
      All checks passed!
      """
    And it prints the block
      """
      Python (format)
      1 file left unchanged
      """
    And all files are unchanged

  Scenario: --show=names
    When executing "tricorder fix --show=names"
    Then it prints only these lines in any order
      """
      delete-empty-folders
      Python (fix)
      Python (format)
      CSS (biome)
      TypeScript (biome)
      """
    And all files are unchanged

  Scenario: --show=failed
    When executing "tricorder fix --show=failed"
    Then it prints nothing
    And all files are unchanged
