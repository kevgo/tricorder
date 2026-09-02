Feature: pitstop on a feature branch

  Background:
    Given a Git repository
    And a committed file "run-that-app" with content
      """
      rumdl 0.2.14
      delete-empty-folders 0.0.2
      """

  Scenario: processes only changes committed to the branch and uncommitted changes
    Given a committed file "on-main.md" with content
      """
      missing header
      """
    And I ran "git checkout -b feature"
    And a committed file "on-branch.md" with content
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
      on-branch.md:1:2: [MD019] Multiple spaces (5) after # in heading [fixed]
      """
    And it prints the block
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
      # Foo
      """
    And file "untracked.md" now has content
      """
      # Bar
      """
    And the exit code is 0

  Scenario: branch contains no changes
    Given a committed file "on-main.md" with content
      """
      missing header
      """
    And I ran "git checkout -b feature"
    When executing "tricorder pitstop --show=all"
    Then it prints
      """
      delete empty folders
      lint Git diff markers (git diff HEAD --check)
      """
    And it does not print
      """
      Markdown
      """
    And it does not print
      """
      on-main.md
      """
    And file "on-main.md" is unchanged
    And the exit code is 0
