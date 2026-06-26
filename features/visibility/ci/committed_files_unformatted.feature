Feature: CI if committed files are unformatted

  Background:
    Given a Git repository
    And a file "run-that-app" with content
      """
      biome 2.4.0
      ruff 0.15.16
      delete-empty-folders 0.0.2
      """
    And a committed file "main.py" with content
      """
      print(  "hello"  )
      """
    And a committed file "main.css" with content
      """
      p {
        color : red ;
      }
      """
    And a committed file "main.ts" with content
      """
      console.log(  "hello"  );
      """

  Scenario: default visibility
    When executing "tricorder ci"
    Then it prints the block
      """
      code is not formatted
      """
    And it prints the block
      """
      diff --git a/main.css b/main.css
      """
    And it prints the block
      """
      diff --git a/main.ts b/main.ts
      """
    And it prints the block
      """
      diff --git a/main.py b/main.py
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
    And the exit code is 1

  Scenario: --show=all
    When executing "tricorder ci --show=all"
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
    And it prints the block
      """
      diff --git a/main.css b/main.css
      """
    And it prints the block
      """
      diff --git a/main.ts b/main.ts
      """
    And it prints the block
      """
      diff --git a/main.py b/main.py
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
    And the exit code is 1

  Scenario: --show=names
    When executing "tricorder ci --show=names"
    Then it does not print
      """
      1 CSS, 1 Python, 1 TypeScript, 1 other
      running 4 tools
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
      """
    And it prints the block
      """
      format Python (ruff)
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
    And it prints the block
      """
      diff --git a/main.css b/main.css
      """
    And it prints the block
      """
      diff --git a/main.ts b/main.ts
      """
    And it prints the block
      """
      diff --git a/main.py b/main.py
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
    And the exit code is 1

  Scenario: --show=failed
    When executing "tricorder ci --show=failed"
    Then it prints the block
      """
      code is not formatted
      """
    And it prints the block
      """
      diff --git a/main.css b/main.css
      """
    And it prints the block
      """
      diff --git a/main.ts b/main.ts
      """
    And it prints the block
      """
      diff --git a/main.py b/main.py
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
    And the exit code is 1
