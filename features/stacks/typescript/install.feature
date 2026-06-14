Feature: install all TypeScript tools

  Background:
    Given a file "main.ts" with content
      """
      console.log(  "hello"  );
      """

  @online
  Scenario: not installed
    When executing "tricorder format --show=all"
    Then it prints the lines
      """
      Talking to GitHub API (https://api.github.com/repos/biomejs/biome/releases/latest) ... ok
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

  Scenario: already installed
    Given a file "run-that-app" with content
      """
      biome 2.4.0
      """
    When executing "tricorder format --show=all"
    Then it prints the lines
      """
      TypeScript (biome)
      """
    And it does not print
      """
      Talking to GitHub API
      """
    And the exit code is 0
    And file "main.ts" now has content
      """
      console.log("hello");
      """
