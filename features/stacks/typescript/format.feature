Feature: format TypeScript

  Background:
    Given a file "run-that-app" with content
      """
      biome 2.4.0
      """

  Scenario: valid TypeScript
    Given a file "main.ts" with content
      """
      console.log("hello");
      """
    When executing "tricorder fix --show=all"
    Then it prints the block
      """
      TypeScript (biome)
      """
    And the exit code is 0
    And file "main.ts" is unchanged

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
      TypeScript (biome)
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
      TypeScript (biome)
      Found 2 errors.
      """
    And the exit code is 1
    And file "main.ts" is unchanged
