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
        col
      }
      """
    Given a file "two.css" with content
      """
      .bar {
        col
      }
      """
    When executing "tricorder lint --show=all"
    Then it prints the block
      """
      lint CSS (Biome)
      """
    And it prints the block
      """
      one.css:3:1 parse ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      """
    And it does not print
      """
      two.css:3:1 parse ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      """
    And the exit code is 0
    And file "one.css" is unchanged
    And file "two.css" is unchanged

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
