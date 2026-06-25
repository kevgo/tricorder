Feature: unsafe-fix TypeScript

  Background:
    Given a file "run-that-app" with content
      """
      biome 2.4.0
      delete-empty-folders 0.0.2
      """

  @this
  Scenario: valid TypeScript
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

  Scenario: unformatted TypeScript
    Given a file "main.ts" with content
      """
      console.log(  "hello"  );
      """
    And a file "other.ts" with content
      """
      console.log(  "other"  );
      """
    When executing "tricorder fix --show=all"
    Then it prints the lines
      """
      fix TypeScript (Biome)
      """
    And the exit code is 0
    And file "main.ts" now has content
      """
      console.log("hello");
      """
    And file "other.ts" now has content
      """
      console.log("other");
      """

  Scenario: invalid TypeScript
    Given a file "main.ts" with content
      """
      console.log("
      """
    When executing "tricorder fix --show=all"
    Then it prints the lines
      """
      fix TypeScript (Biome)
      Found 2 errors.
      """
    And the exit code is 1
    And file "main.ts" is unchanged
