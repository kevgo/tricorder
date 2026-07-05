Feature: lint documentation with Text-Runner

  Background:
    Given a file "run-that-app" with content
      """
      rumdl 0.2.14
      delete-empty-folders 0.0.2
      node 26.0.0
      text-runner 7.1.0
      """
    And a file "text-runner.jsonc" with content
      """
      {
      "format": "detailed",
      "systemTmp": true,
      "online": false
      }
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
    When inspect the workspace
    When executing "tricorder lint --show=all"
    Then it prints nothing to STDERR
    Then it prints the lines
      """
      lint Markdown (rumdl)
      test Markdown (Text-Runner)
      """
    And the exit code is 0
    And all files are unchanged

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
    When executing "tricorder lint --show=all"
    Then it prints the block
      """
      lint Markdown (tikibase)
      two.md:1  document is not connected to any other documents
      two.md:1  missing link to one.md
      """
    And the exit code is 2
    And all files are unchanged

  Scenario: invalid Markdown
    Given a file "main.md" with content
      """
      text
      """
    When executing "tricorder lint --show=all"
    Then it prints the lines
      """
      lint Markdown (tikibase)
      main.md:1  no title section
      lint Markdown (rumdl)
      main.md:1:1: [MD041] First line in file should be a level 1 heading
      """
    And the exit code is 1
    And all files are unchanged
