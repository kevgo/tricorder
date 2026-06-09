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
      discovering files ... 2
      discovering stacks ... typescript
      running 1 tools
      biome --check
      """
    And the exit code is 1
