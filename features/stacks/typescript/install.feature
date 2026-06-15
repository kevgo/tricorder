Feature: install all TypeScript tools

  Background:
    Given a file "main.ts" with content
      """
      console.log(  "hello"  );
      """

  @online
  Scenario: not installed
    When executing "tricorder format --show=all"
    Then it prints the lines to STDERR
      """
      Talking to GitHub API (https://api.github.com/repos/biomejs/biome/releases/latest) ... ok
      """
    Then it prints the lines
      """
      TypeScript (biome)
      """
    And the exit code is 0
    And file "main.ts" now has content
      """
      console.log("hello");
      """
    And file "run-that-app" now matches
      """
      # more info at https://github.com/kevgo/run-that-app

      biome \d+\.\d+\.\d+
      """
