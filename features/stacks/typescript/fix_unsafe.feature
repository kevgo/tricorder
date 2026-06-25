Feature: unsafe-fix TypeScript

  Background:
    Given a file "run-that-app" with content
      """
      biome 2.4.0
      delete-empty-folders 0.0.2
      """

  Scenario: fixable TypeScript
    Given a file "main.ts" with content
      """
      const name = "Alice";
      const greeting = "Hello, " + name + "!";
      """
    When executing "tricorder fix-unsafe --show=all"
    Then it prints the lines
      """
      fix TypeScript (Biome)
      unsafe fix TypeScript (Biome)
      """
    And the exit code is 0
    And file "main.ts" now has content
      """
      const name = "Alice";
      const _greeting = `Hello, ${name}!`;
      """
