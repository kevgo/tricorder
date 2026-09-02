Feature: pitstop on the main branch

  Background:
    Given a Git repository
    And a committed file "run-that-app" with content
      """
      rumdl 0.2.14
      delete-empty-folders 0.0.2
      """

  Scenario: processes only uncommitted changes
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
      #     Foo
      """
    And a file "untracked.md" with content
      """
      #     Bar
      """
    When executing "tricorder pitstop --show=all"
    Then it prints the lines
      """
      fix Markdown (rumdl)
      """
    And it prints the block
      """
      modified.md:1:2: [MD019] Multiple spaces (5) after # in heading [fixed]
      """
    And it prints the block
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
      # Foo
      """
    And file "untracked.md" now has content
      """
      # Bar
      """
    And the exit code is 0

  Scenario: no uncommitted changes
    Given a committed file "committed.md" with content
      """
      missing header
      """
    When executing "tricorder pitstop --show=all"
    Then it prints
      """
      delete empty folders
      lint Git (git diff HEAD --check)
      """
    And it does not print
      """
      Markdown
      """
    And it does not print
      """
      committed.md
      """
    And file "committed.md" is unchanged
    And the exit code is 0
