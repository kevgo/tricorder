Feature: lint GitHub Actions workflow files

  Background:
    Given a Git repository
    And a file "run-that-app" with content
      """
      actionlint 1.7.12
      delete-empty-folders 0.0.2
      """

  @this
  Scenario: valid workflow
    Given a file ".github/workflows/main.yml" with content
      """
      name: CI
      on:
        push:
          branches: [main]
      jobs:
        test:
          runs-on: ubuntu-latest
          steps:
            - uses: actions/checkout@v6
      """
    # When inspect the workspace
    When executing "tricorder lint --show=all"
    Then it prints
      """
      lint Git (git diff HEAD --check)
      YML
      """
    And it prints to STDERR
      """
      1 YML, 27 other
      running 2 tools
      """
    And the exit code is 0
    And file ".github/workflows/main.yml" is unchanged

  Scenario: invalid workflow
    Given a file "main.yml" with content
      """
      key: "
      """
    When executing "tricorder lint --show=all"
    Then it prints nothing to STDOUT
    And the exit code is 0
    And file "main.yml" is unchanged
