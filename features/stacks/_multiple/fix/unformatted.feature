Feature: fix multiple stacks

  Background:
    Given a file "run-that-app" with content
      """
      biome 2.4.0
      ruff 0.15.16
      """
    And a file "main.py" with content
      """
      print(  "hello"  )
      """
    And a file "main.css" with content
      """
      p {
        color : red ;
      }
      """
    And a file "main.ts" with content
      """
      console.log(  "hello"  );
      """

  Scenario: default visibility
    When executing "tricorder fix"
    Then it prints nothing to STDOUT
    And file "main.py" now has content
      """
      print("hello")
      """
    And file "main.css" now has content
      """
      p {
      \tcolor: red;
      }
      """
    And file "main.ts" now has content
      """
      console.log("hello");
      """

  Scenario: --show=all
    When executing "tricorder fix --show=all"
    Then it prints to STDERR
      """
      1 CSS, 1 Python, 1 TypeScript, 1 other
      running 4 tools
      """
    And it prints the block
      """
      TypeScript (Biome)
      """
    And it prints the block
      """
      CSS (Biome)
      """
    And it prints the block
      """
      Python (ruff fix)
      All checks passed!
      """
    And it prints the block
      """
      Python (ruff format)
      1 file reformatted
      """
    And file "main.css" now has content
      """
      p {
      \tcolor: red;
      }
      """
    And file "main.ts" now has content
      """
      console.log("hello");
      """
    And file "main.py" now has content
      """
      print("hello")
      """

  Scenario: --show=names
    When executing "tricorder fix --show=names"
    Then it does not print
      """
      1 CSS, 1 Python, 1 TypeScript, 1 other
      running 4 tools
      """
    And it prints only these lines in any order
      """
      delete-empty-folders
      Python (ruff fix)
      Python (ruff format)
      TypeScript (Biome)
      CSS (Biome)
      """
    And file "main.css" now has content
      """
      p {
      \tcolor: red;
      }
      """
    And file "main.ts" now has content
      """
      console.log("hello");
      """
    And file "main.py" now has content
      """
      print("hello")
      """

  Scenario: --show=failed
    When executing "tricorder fix --show=failed"
    Then it prints nothing to STDOUT
    And file "main.css" now has content
      """
      p {
      \tcolor: red;
      }
      """
    And file "main.ts" now has content
      """
      console.log("hello");
      """
    And file "main.py" now has content
      """
      print("hello")
      """
