Feature: lint documentation with Text-Runner

  Background:
    Given a file "run-that-app" with content
      """
      biome 2.5.2
      delete-empty-folders 0.0.2
      node 26.0.0
      npm 26.0.0
      rumdl 0.2.14
      taplo 0.10.0
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
    And a file "rumdl.toml" with content
      """
      enable = []
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
    When executing "tricorder lint --show=all"
    Then it prints the lines
      """
      lint Markdown (rumdl)
      test Markdown (Text-Runner)
      one.md:3 -- link to local file two.md
      two.md:3 -- link to local file one.md
      """
    And the exit code is 0
    And all files are unchanged

  Scenario: unformatted Markdown
    Given a file "one.md" with content
      """
      # One

      <a type="failing">Zonk</a>
      """
    And a file "text-runner/failing.js" with content
      """
      export default function failing() {
        throw new Error("Zonk");
      }
      """
    When executing "tricorder lint --show=all"
    Then it prints the block
      """
      test Markdown (Text-Runner)
      one.md:3 -- Zonk
      """
    And the exit code is 1
    And all files are unchanged

  @this
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
