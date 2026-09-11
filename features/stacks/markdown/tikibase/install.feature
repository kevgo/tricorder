@online
Feature: install Tikibase

  @this
  Scenario: not installed
    Given a file "run-that-app" with content
      """
      delete-empty-folders 0.0.2
      """
    And a file "tricorder.json" with content
      """
      {
        "applications": {
          "prettier": { "enabled": false },
          "rumdl": { "enabled": false }
          "text-runner": { "enabled": false }
        }
      }
      """
    And a file "tikibase.json" with content
      """
      {
        "ignore": [
          "run-that-app",
          "tricorder.json"
        ],
        "bidiLinks": false
      }
      """
    And a file "one.md" with content
      """
      # One
      [two](two.md)
      """
    And a file "two.md" with content
      """
      # Two
      [one](one.md)
      """
    When executing "tricorder lint --show=all"
    Then it prints the lines to STDERR
      """
      Talking to GitHub API (https://api.github.com/repos/kevgo/tikibase/releases/latest) ... ok
      """
    And it prints the lines
      """
      lint Markdown (tikibase)
      """
    And the exit code is 0
    And file "run-that-app" now has an additional line matching
      """
      tikibase \d+\.\d+\.\d+
      """
