@online
Feature: install Rumdl

  @this
  Scenario: not installed
    Given a file "main.md" with content
      """
      #     Hello
      """
    And a file "tricorder.json" with content
      """
      {
        "applications": {
          "markdownlint": { "enabled": false },
          "prettier": { "enabled": false },
          "text-runner": { "enabled": false },
          "tikibase": { "enabled": false }
        }
      }
      """
    When executing "tricorder fix --show=all"
    Then it prints the lines to STDERR
      """
      Talking to GitHub API (https://api.github.com/repos/rvben/rumdl/releases/latest) ... ok
      """
    And it prints the lines
      """
      fix Markdown (rumdl)
      """
    And the exit code is 0
    And file "main.md" now has content
      """
      # Hello
      """
    And file "run-that-app" now has an additional line matching
      """
      rumdl \d+\.\d+\.\d+
      """
