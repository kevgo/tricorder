@online
Feature: install all TypeScript tools

  Scenario: not installed
    Given a file "main.ts" with content
      """
      console.log(  "hello"  );
      """
    When executing "tricorder fix --show=all"
    Then it prints the lines to STDERR
      """
      Talking to GitHub API (https://api.github.com/repos/biomejs/biome/releases/latest) ... ok
      """
    And it prints the lines
      """
      fix TypeScript (Biome)
      """
    And the exit code is 0
    And file "main.ts" now has content
      """
      console.log("hello");
      """
    And file "run-that-app" now has an additional line matching
      """
      biome \d+\.\d+\.\d+
      """
