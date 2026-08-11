Feature: precommit GitHub Actions workflow files

  Scenario: invalid workflow
    Given a Git repository
    And a file "run-that-app" with content
      """
      actionlint 1.7.12
      delete-empty-folders 0.0.2
      """
    Given a file ".github/workflows/main.yml" with content
      """
      key: "
      """
    When executing "tricorder precommit --show=all"
    Then it prints
      """
      delete empty folders
      """
    And the exit code is 0
    And all files are unchanged
