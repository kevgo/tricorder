Feature: "tricorder pitstop" processes only files changed on the current branch

  Background:
    Given a Git repository
    And a committed file "run-that-app" with content
      """
      rumdl 0.2.14
      delete-empty-folders 0.0.2
      """

  Scenario: ignores changes on the main branch
    Given a committed file "on-main.md" with content
      """
      missing header
      """
    And I ran "git checkout -b feature"
    And a committed file "on-branch.md" with content
      """
      #     Hello
      """
    When executing "tricorder pitstop --show=all"
    Then it prints the lines
      """
      fix Markdown (rumdl)
      on-branch.md:1:2: [MD019] Multiple spaces (5) after # in heading [fixed]
      """
    And it does not print
      """
      on-main.md
      """
    And file "on-main.md" is unchanged
    And file "on-branch.md" now has content
      """
      # Hello
      """
    And the exit code is 0
  #@this

  Scenario: processes committed and untracked changes on a feature branch
    Given a committed file "on-main.md" with content
      """
      missing header
      """
    And I ran "git checkout -b feature"
    And a committed file "on-branch.md" with content
      """
      #     Hello
      """
    And a file "untracked.md" with content
      """
      #     World
      """
    When executing "tricorder pitstop --show=all"
    Then it prints the lines
      """
      fix Markdown (rumdl)
      """
    And it prints the lines
      """
      on-branch.md:1:2: [MD019] Multiple spaces (5) after # in heading [fixed]
      """
    And it prints the lines
      """
      untracked.md:1:2: [MD019] Multiple spaces (5) after # in heading [fixed]
      """
    And it does not print
      """
      on-main.md
      """
    And file "on-main.md" is unchanged
    And file "on-branch.md" now has content
      """
      # Hello
      """
    And file "untracked.md" now has content
      """
      # World
      """
    And the exit code is 0

  Scenario: processes only uncommitted changes on the main branch
    Given a committed file "committed.md" with content
      """
      missing header
      """
    And a committed file "modified.md" with content
      """
      # correct header
      """
    And I change file "modified.md" to
      """
      #     Hello
      """
    And a file "untracked.md" with content
      """
      #     World
      """
    When executing "tricorder pitstop --show=all"
    Then it prints the lines
      """
      fix Markdown (rumdl)
      """
    And it prints the lines
      """
      modified.md:1:2: [MD019] Multiple spaces (5) after # in heading [fixed]
      """
    And it prints the lines
      """
      untracked.md:1:2: [MD019] Multiple spaces (5) after # in heading [fixed]
      """
    And it does not print
      """
      committed.md
      """
    And file "committed.md" is unchanged
    And file "modified.md" now has content
      """
      # Hello
      """
    And file "untracked.md" now has content
      """
      # World
      """
    And the exit code is 0
