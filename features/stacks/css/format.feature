Feature: format CSS

  Background:
    Given a file "run-that-app" with content
      """
      biome 2.4.0
      """

  Scenario: valid CSS
    Given a file "main.css" with content
      """
      .foo {
      \tcolor: red;
      }
      """
    When executing "tricorder fix --show=all"
    Then it prints the lines
      """
      CSS (biome)
      """
    And the exit code is 0
    And file "main.css" is unchanged

  Scenario: unformatted CSS
    Given a file "main.css" with content
      """
      .foo {
        color : red ;
      }
      """
    And a file "other.css" with content
      """
      .bar {
        color : blue ;
      }
      """
    When executing "tricorder fix --show=all"
    Then it prints the lines
      """
      CSS (biome)
      """
    And the exit code is 0
    And file "main.css" now has content
      """
      .foo {
      \tcolor: red;
      }
      """
    And file "other.css" now has content
      """
      .bar {
      \tcolor: blue;
      }
      """

  Scenario: invalid CSS
    Given a file "main.css" with content
      """
      .foo {
        col
      }
      """
    When executing "tricorder fix --show=all"
    Then it prints the lines
      """
      CSS (biome)
      Found 2 errors.
      """
    And the exit code is 1
    And file "main.css" is unchanged
