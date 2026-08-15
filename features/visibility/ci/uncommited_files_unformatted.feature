Feature: CI doesn't care about uncommitted files that are unformatted

  Background:
    Given a Git repository
    And a file "run-that-app" with content
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
    When executing "tricorder ci"
    Then it prints only these lines in any order
      """
      delete empty folders
      fix Python (ruff)
      format Python (ruff)
      lint Python (ruff)
      fix CSS (Biome)
      lint CSS (Biome)
      fix TypeScript (Biome)
      lint TypeScript (Biome)
      lint Git (git diff HEAD --check)
      """
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
    And the exit code is 0

  Scenario: --show=all
    When executing "tricorder ci --show=all"
    Then it prints to STDERR
      """
      1 CSS, 1 Python, 1 TypeScript, 1 other
      running 9 tools
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
    And the exit code is 0

  Scenario: --show=verbose
    When executing "tricorder ci --show=verbose"
    Then it prints to STDERR
      """
      1 CSS, 1 Python, 1 TypeScript, 1 other
      running 9 tools
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
    And the exit code is 0

  Scenario: --show=names
    When executing "tricorder ci --show=names"
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
      lint Git (git diff HEAD --check)
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
    And the exit code is 0

  Scenario: --show=failed
    When executing "tricorder ci --show=failed"
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
    And the exit code is 0
