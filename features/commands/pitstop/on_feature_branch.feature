Feature: pitstop on a feature branch

  Background:
    Given a Git repository
    And a committed file "run-that-app" with content
      """
      delete-empty-folders 0.0.2
      rumdl 0.2.14
      """

  Scenario: processes only uncommitted changes when they exist
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
    When executing "trident pitstop --show=output"
    Then it prints the lines
      """
      fix Markdown (rumdl)
      """
    And it prints the block
      """
      untracked.md:1:2: [MD019] Multiple spaces (5) after # in heading [fixed]
      """
    And it does not print
      """
      on-branch.md
      """
    And it does not print
      """
      on-main.md
      """
    And file "on-main.md" is unchanged
    And file "on-branch.md" is unchanged
    And file "untracked.md" now has content
      """
      # Bar
      """
    And the exit code is 0

  Scenario: processes branch changes when the working tree is clean
    Given a committed file "on-main.md" with content
      """
      missing header
      """
    And I ran "git checkout -b feature"
    And a committed file "on-branch.md" with content
      """
      #     Foo
      """
    When executing "trident pitstop --show=output"
    Then it prints the block
      """
      on-branch.md:1:2: [MD019] Multiple spaces (5) after # in heading [fixed]
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
    And the exit code is 0

  Scenario: branch contains no changes
    Given a committed file "on-main.md" with content
      """
      #     Main
      """
    And I ran "git checkout -b feature"
    When executing "trident pitstop --show=output"
    Then it prints the block
      """
      on-main.md:1:2: [MD019] Multiple spaces (5) after # in heading [fixed]
      """
    And file "on-main.md" now has content
      """
      # Main
      """
    And the exit code is 0
