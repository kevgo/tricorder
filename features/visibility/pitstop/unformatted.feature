Feature: pitstop multiple unformatted stacks

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
      p {
        color : red ;
      }
      """
    And a file "main.ts" with content
      """
      console.log(  "hello"  );
      """

  Scenario: default visibility
    When executing "tricorder pitstop"
    Then it prints nothing to STDOUT
    And it prints nothing to STDERR
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
    When executing "tricorder pitstop --show=all"
    Then it prints to STDERR
      """
      1 CSS, 1 Python, 1 TypeScript, 1 other
      running 8 tools
      """
    And it prints the block
      """
      delete empty folders
      """
    And it prints the block
      """
      fix TypeScript (Biome)
      """
    And it prints the block
      """
      fix CSS (Biome)
      """
    And it prints the block
      """
      fix Python (ruff)
      All checks passed!
      """
    And it prints the block
      """
      format Python (ruff)
      1 file reformatted
      """
    And it prints the block
      """
      lint Python (ruff)
      """
    And it prints the block
      """
      lint TypeScript (Biome)
      """
    And it prints the block
      """
      lint CSS (Biome)
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

  Scenario: --show=verbose
    When executing "tricorder pitstop --show=verbose"
    Then it prints to STDERR
      """
      1 CSS, 1 Python, 1 TypeScript, 1 other
      running 8 tools
      """
    And it prints the block matching
      """
      delete empty folders
      \S+/delete-empty-folders
      """
    And it prints the block matching
      """
      fix TypeScript \(Biome\)
      \S+/biome format --write main\.ts
      """
    And it prints the block matching
      """
      fix CSS \(Biome\)
      \S+/biome format --write main\.css
      """
    And it prints the block matching
      """
      fix Python \(ruff\)
      \S+/ruff check --fix main\.py
      All checks passed!
      """
    And it prints the block matching
      """
      format Python \(ruff\)
      \S+/ruff format main\.py
      1 file reformatted
      """
    And it prints the block matching
      """
      lint Python \(ruff\)
      \S+/ruff check main\.py
      """
    And it prints the block matching
      """
      lint TypeScript \(Biome\)
      \S+/biome lint main\.ts
      """
    And it prints the block matching
      """
      lint CSS \(Biome\)
      \S+/biome lint main\.css
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
    When executing "tricorder pitstop --show=names"
    Then it does not print
      """
      1 CSS, 1 Python, 1 TypeScript, 1 other
      running 4 tools
      """
    And it prints only these lines in any order
      """
      delete empty folders
      fix Python (ruff)
      format Python (ruff)
      fix TypeScript (Biome)
      fix CSS (Biome)
      lint Python (ruff)
      lint TypeScript (Biome)
      lint CSS (Biome)
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
    When executing "tricorder pitstop --show=failed"
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
