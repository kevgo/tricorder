Feature: all tests are passing

  Background:
    And a file "README.md" with content
      """
      # Hello
      """
    And a file "run-that-app" with content
      """
      rumdl 0.2.14
      """

  @this
  Scenario: --show=all
    When executing "tricorder check --show=all"
    Then it prints:
      """
      1 Markdown, 1 other
      running 1 tools
      Markdown (rumdl)
      Success: No issues found in 1 file (2ms)
      """

  Scenario: --show=names

  Scenario: --show=failed
