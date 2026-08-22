Feature: "tricorder postedit" lints only uncommitted files

  Background:
    Given a Git repository
    And a committed file "run-that-app" with content
      """
      rumdl 0.2.14
      delete-empty-folders 0.0.2
      """

  Scenario: no uncommitted files
    Given a committed file "main.md" with content
      """
      "unterminated string
      """
    When executing "tricorder postedit --show=all"
    Then it prints to STDERR
      """
      running 1 tools
      """
    And it prints the lines
      """
      lint Git (git diff HEAD --check)
      """
    And it does not print
      """
      lint Markdown
      """
    And the exit code is 0

  Scenario: lints only uncommitted but not committed files
    Given a committed file "already_committed.md" with content
      """
      missing header
      """
    And a committed file "modified.md" with content
      """
      # correct header
      """
    And I change file "modified.md" to
      """
      missing header
      """
    And a file "untracked.md" with content
      """
      missing header
      """
    When executing "tricorder postedit --show=all"
    Then it prints to STDERR
      """
      2 Markdown
      running 2 tools
      """
    And it prints the lines
      """
      lint Markdown (rumdl)
      """
    And it prints the lines
      """
      modified.md:1:1: [MD041] First line in file should be a level 1 heading
      """
    And it prints the lines
      """
      untracked.md:1:1: [MD041] First line in file should be a level 1 heading
      """
    And it does not print
      """
      already_committed.md
      """
    And the exit code is 1
