Feature: pitstop on a feature branch

  Background:
    Given a Git repository
    And a committed file "run-that-app" with content
      """
      rumdl 0.2.14
      delete-empty-folders 0.0.2
      """

  Scenario: processes only committed and uncommitted changes on the branch
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
      # Hello
      """
    And file "untracked.md" now has content
      """
      # World
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
      lint Git (git diff HEAD --check)
      """
    And it does not print
      """
      on-main.md
      """
    And file "on-main.md" is unchanged
    And the exit code is 0
