Feature: fix Markdown with Tikibase

  Background:
    Given a file "run-that-app" with content
      """
      delete-empty-folders 0.0.2
      node 26.4.0
      prettier 3.7.0
      rumdl 0.2.14
      tikibase 0.6.2
      """
    And a file "tikibase.json" with content
      """
      {
        "ignore": [
          "run-that-app"
        ],
        "bidiLinks": true
      }
      """

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
    When executing "tricorder fix --show=all"
    Then it prints the lines
      """
      fix Markdown (tikibase)
      fix Markdown (rumdl)
      """
    And the exit code is 0
    And file "one.md" is unchanged
    And file "two.md" is unchanged

  @this
  Scenario: unformatted Markdown
    Given a file "one.md" with content
      """
      # One

      also check out [Two](two.md)
      """
    And a file "two.md" with content
      """
      # Two
      """
    When executing "tricorder fix --show=all"
    Then it prints the lines
      """
      fix Markdown (tikibase)
      two.md:3  added one.md to occurrences section
      fix Markdown (rumdl)
      """
    And the exit code is 0
    And file "one.md" is unchanged
    And file "two.md" now has content
      """
      # Two

      ## occurrences

      - [One](one.md)
      """

  Scenario: invalid Markdown
    Given a file "main.md" with content
      """
      # hello

      [e]()
      """
    When executing "tricorder fix --show=all"
    Then it prints the block
      """
      fix Markdown (tikibase)
      fix Markdown (rumdl)
      main.md:3:1: [MD042] Empty link found: [e]()
      """
    And the exit code is 0
    And file "main.md" is unchanged
