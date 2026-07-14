Feature: exclude a CSS file

  Background:
    Given a file "run-that-app" with content
      """
      delete-empty-folders 0.0.2
      biome 2.4.0
      """
    And a file "tricorder.toml" with content
      """
      toml.lint.exclude = ["wrong.css"]
      """

  @this
  Scenario: linting
    Given a file "one.css" with content
      """
      .foo {
        color : red ;
      }
      """
    Given a file "two.css" with content
      """
      .foo {
        color : red ;
      }
      """
    When executing "tricorder lint --show=all"
    Then it prints the block
      """
      lint CSS (Biome)
      """
    And the exit code is 0
    And file "main.css" is unchanged

  Scenario: invalid CSS
    Given a file "main.css" with content
      """
      .foo {
        col
      }
      """
    When executing "tricorder lint --show=all"
    Then it prints the lines
      """
      lint CSS (Biome)
      Found 2 errors.
      """
    And the exit code is 1
    And file "main.css" is unchanged
