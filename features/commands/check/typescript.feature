Feature: checking a codebase containing TypeScript code

  Background:
    Given a file "main.ts" with content
      """
      const greeting:string="Hello, world!"
      console.log(greeting);
      """

  Scenario: already configured
    Given a file "run-that-app" with content
      """
      biome 2.4.0
      """
    When executing "tricorder check"
    Then it prints:
      """
      1 TypeScript, 1 other
      running 1 tools
      TypeScript (biome)
      Found 1 error.
      """
    And it does not print:
      """
      Talking to GitHub API
      """
    And the exit code is 1

  Scenario: unconfigured
    When executing "tricorder check"
    Then it prints:
      """
      1 TypeScript
      Talking to GitHub API (https://api.github.com/repos/biomejs/biome/releases/latest) ... ok
      added biome@2.4.16 to run-that-app
      running 1 tools
      TypeScript (biome)
      Found 1 error.
      """
    And the exit code is 1
    And file "run-that-app" now matches
      """
      # more info at https://github.com/kevgo/run-that-app
      
      biome \d+\.\d+\.\d+
      """
