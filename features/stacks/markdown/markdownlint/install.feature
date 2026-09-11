@online
Feature: install Markdownlint

  Scenario: not installed
    Given a file "run-that-app" with content
      """
      # more info at https://github.com/kevgo/run-that-app

      delete-empty-folders 0.0.2
      node 26.4.0
      """
    And a file "tricorder.json" with content
      """
      {
        "applications": {
          "rumdl": { "enabled": false }
        }
      }
      """
    And a file "main.md" with content
      """
      text
      """
    When executing "tricorder lint --show=all"
    Then it prints the lines to STDERR
      """
      Talking to GitHub API (https://api.github.com/repos/igorshubovych/markdownlint-cli/releases/latest) ... ok
      """
    Then it prints the lines
      """
      lint Markdown (markdownlint)
      main.md:1 error MD041/first-line-heading/first-line-h1 First line in a file should be a top-level heading [Context: "text"]
      """
    And the exit code is 1
    And file "run-that-app" now has an additional line matching
      """
      markdownlint \d+\.\d+\.\d+
      """
