Feature: checking a codebase containing TypeScript code

  Scenario: checking a codebase with TypeScript
    Given a file "run-that-app" with content
      """
      biome 2.4.0
      """
    And a file "main.ts" with content
      """
      const greeting:string="Hello, world!"
      console.log(greeting);
      """
    When executing "tricorder check"
    Then it prints:
      """
      2 files, typescript
      running 1 tools
      biome --check
      Found 1 error.
      """
    And the exit code is 1
