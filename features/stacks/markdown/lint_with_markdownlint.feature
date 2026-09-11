Feature: lint Markdown with markdownlint

  Background:
    Given a file "run-that-app" with content
      """
      delete-empty-folders 0.0.2
      markdownlint 0.49.1
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

  Scenario: valid Markdown
    Given a file "main.md" with content
      """
      # Hello
      """
    When executing "tricorder lint --show=all"
    Then it prints the lines
      """
      lint Markdown (markdownlint)
      """
    And the exit code is 0
    And file "main.md" is unchanged

  Scenario: rule violation
    Given a file "main.md" with content
      """
      text
      """
    When executing "tricorder lint --show=all"
    Then it prints the lines
      """
      lint Markdown (markdownlint)
      main.md:1 error MD041/first-line-heading/first-line-h1 First line in a file should be a top-level heading [Context: "text"]
      """
    And the exit code is 1
    And file "main.md" is unchanged

  Scenario: file with spaces in the name
    Given a file "my file.md" with content
      """
      text
      """
    When executing "tricorder lint --show=all"
    Then it prints the lines
      """
      lint Markdown (markdownlint)
      my file.md:1 error MD041/first-line-heading/first-line-h1 First line in a file should be a top-level heading [Context: "text"]
      """
    And the exit code is 1
    And file "my file.md" is unchanged

  @this @online
  Scenario: not installed
    Given a file "run-that-app" with content
      """
      # more info at https://github.com/kevgo/run-that-app

      delete-empty-folders 0.0.2
      node 26.4.0
      """
    And a file "main.md" with content
      """
      # Hello
      """
    When executing "tricorder lint --show=all"
    Then it prints the lines to STDERR
      """
      Talking to GitHub API (https://api.github.com/repos/igorshubovych/markdownlint-cli/releases/latest) ... ok
      """
    And it prints the lines
      """
      lint Markdown (markdownlint)
      """
    And the exit code is 0
    And file "main.md" is unchanged
    And file "run-that-app" now has an additional line matching
      """
      markdownlint \d+\.\d+\.\d+
      """
