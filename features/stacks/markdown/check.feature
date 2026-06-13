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
    Then it prints the lines
      """
      Markdown (rumdl)
      README.md:1:2: [MD019] Multiple spaces (4) after # in heading [*]
      """
    And it does not print
      """
      Talking to GitHub API
      """
    And the exit code is 1
    And all files are unchanged

  @online
  Scenario: auto-install
    When executing "tricorder check"
    Then it prints the lines
      """
      Talking to GitHub API (https://api.github.com/repos/rvben/rumdl/releases/latest) ... ok
      Markdown (rumdl)
      README.md:1:2: [MD019] Multiple spaces (4) after # in heading [*]
      """
    And the exit code is 1
    And file "run-that-app" now matches
      """
      # more info at https://github.com/kevgo/run-that-app

      rumdl \d+\.\d+\.\d+
      """
    And file "README.md" is unchanged
