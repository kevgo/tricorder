Feature: lint a Tikibase

  Background:
    Given a file "run-that-app" with content
      """
      rumdl 0.2.14
      delete-empty-folders 0.0.2
      tikibase 0.6.2
      """
    Given a file "tikibase.json" with content
      """
      {}
      """

  @this
  Scenario: valid Markdown
    Given a file "one.md" with content
      """
      # One

      also check out [Two](two.md)
      """
    And a file "two.md" with content
      """
      # Two

      also check out [One](one.md)
      """
    When executing "tricorder lint --show=all"
    Then it prints the lines
      """
      lint Markdown (rumdl)
      lint Markdown (tikibase)
      """
    And the exit code is 0
    And file "main.md" is unchanged

  Scenario: unformatted Markdown
    Given a file "main.md" with content
      """
      #     Hello
      """
    When executing "tricorder lint --show=all"
    Then it prints the block
      """
      lint Markdown (rumdl)
      main.md:1:2: [MD019] Multiple spaces (5) after # in heading [*]
      """
    And the exit code is 1
    And file "main.md" is unchanged

  Scenario: invalid Markdown
    Given a file "main.md" with content
      """
      text
      """
    When executing "tricorder lint --show=all"
    Then it prints the lines
      """
      lint Markdown (rumdl)
      main.md:1:1: [MD041] First line in file should be a level 1 heading
      """
    And the exit code is 1
    And file "main.md" is unchanged
