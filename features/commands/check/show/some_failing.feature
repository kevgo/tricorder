Feature: all tests are passing

  Background:
    And a file "README.md" with content
      """
      #   Hello
      """
    And a file "run-that-app" with content
      """
      rumdl 0.2.14
      """

  Scenario: --show=all
    When executing "tricorder check --show=all"
    Then it prints:
      """
      1 Markdown, 1 other
      running 1 tools
      Markdown (rumdl)
      README.md:1:2: [MD064] Multiple consecutive spaces (3) found [*]
      """
    And the exit code is 1

  Scenario: --show=names
    When executing "tricorder check --show=names"
    Then it prints:
      """
      1 Markdown, 1 other
      running 1 tools
      Markdown (rumdl)
      """
    And it does not print:
      """
      Success: No issues found in 1 file (2ms)
      """
    And the exit code is 0

  Scenario: --show=failed
    When executing "tricorder check --show=failed"
    Then it prints:
      """
      1 Markdown, 1 other
      running 1 tools
      """
    And it does not print:
      """
      Markdown (rumdl)
      """
    And it does not print:
      """
      Success: No issues found in 1 file (2ms)
      """
    And the exit code is 0
