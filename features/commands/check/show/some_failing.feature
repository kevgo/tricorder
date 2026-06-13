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
    Then it prints the lines
      """
      1 Markdown, 1 other
      running 1 tools
      Markdown (rumdl)
      README.md:1:2: [MD064] Multiple consecutive spaces (3) found [*]
      Run `rumdl fmt` to automatically fix 2 of the 2 issues
      """
    And the exit code is 1

  Scenario: --show=names
    When executing "tricorder check --show=names"
    Then it prints the lines
      """
      Markdown (rumdl)
      README.md:1:2: [MD064] Multiple consecutive spaces (3) found [*]
      Run `rumdl fmt` to automatically fix 2 of the 2 issues
      """
    And it does not print
      """
      Success: No issues found in 1 file (2ms)
      """
    And the exit code is 0

  Scenario: --show=failed
    When executing "tricorder check --show=failed"
    Then it prints the lines
      """
      Markdown (rumdl)
      README.md:1:2: [MD064] Multiple consecutive spaces (3) found [*]
      Run `rumdl fmt` to automatically fix 2 of the 2 issues
      """
    And the exit code is 0
