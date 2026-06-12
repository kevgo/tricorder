Feature: format TypeScript

  Background:
    Given a file "main.ts" with content
      """
      const      greeting:string="Hello, world!"
      console.log(greeting)
      """

  Scenario: already configured
    Given a file "run-that-app" with content
      """
      biome 2.4.16
      """
    When executing "tricorder format"
    Then it prints the lines
      """
      1 TypeScript, 1 other
      running 1 tools
      TypeScript (biome)
      """
    And it does not print
      """
      Talking to GitHub API
      """
    And the exit code is 0
    And file "main.ts" now has content
      """
      const greeting: string = "Hello, world!";
      console.log(greeting);
      """

  @online
  Scenario: auto-install
    When executing "tricorder format"
    Then it prints the lines
      """
      1 TypeScript
      Talking to GitHub API (https://api.github.com/repos/biomejs/biome/releases/latest) ... ok
      running 1 tools
      TypeScript (biome)
      """
    And the exit code is 0
    And file "main.ts" now has content
      """
      const greeting: string = "Hello, world!";
      console.log(greeting);
      """
