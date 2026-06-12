Feature: check Markdown

  Background:
    And a file "README.md" with content
      """
      #    Hello
      """

  Scenario: already configured
    Given a file "run-that-app" with content
      """
      rumdl 0.2.14
      """
    When executing "tricorder check"
    Then it prints:
      """
      1 Markdown, 1 other
      running 1 tools
      Markdown (rumdl)
      README.md:1:2: [MD019] Multiple spaces (4) after # in heading [*]
      """
    And it does not print:
      """
      Talking to GitHub API
      """
    And the exit code is 1
    And all files are unchanged

  @this @online
  Scenario: auto-install
    When executing "tricorder check"
    Then it prints:
      """
      1 JSON
      Talking to GitHub API (https://api.github.com/repos/markelliot/prettier-standalone/releases/latest) ... ok
      running 1 tools
      JSON (prettier)
      main.json
      """
    And the exit code is 1
    And file "run-that-app" now matches
      """
      # more info at https://github.com/kevgo/run-that-app
      
      prettier-standalone \d+\.\d+\.\d+
      """
    And file "main.json" is unchanged
