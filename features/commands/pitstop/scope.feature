Feature: "trident pitstop --scope" selects which files to process

  Background:
    Given a Git repository
    And a committed file "run-that-app" with content
      """
      delete-empty-folders 0.0.2
      rumdl 0.2.14
      """

  Scenario: --scope=uncommitted processes only uncommitted files
    Given a committed file "on-main.md" with content
      """
      #     Main
      """
    And I ran "git checkout -b feature"
    And a committed file "on-branch.md" with content
      """
      #     Branch
      """
    And a file "untracked.md" with content
      """
      #     Untracked
      """
    When executing "trident pitstop --scope=uncommitted --show=output"
    Then it prints to STDERR
      """
      1 Markdown
      running 4 tools
      """
    And it prints the block
      """
      untracked.md:1:2: [MD019] Multiple spaces (5) after # in heading [fixed]
      """
    And it does not print
      """
      on-main.md
      """
    And it does not print
      """
      on-branch.md
      """
    And file "on-main.md" is unchanged
    And file "on-branch.md" is unchanged
    And file "untracked.md" now has content
      """
      # Untracked
      """
    And the exit code is 0

  Scenario: --scope=all processes all files
    Given a committed file "committed.md" with content
      """
      #     Committed
      """
    And a file "untracked.md" with content
      """
      #     Untracked
      """
    When executing "trident pitstop --scope=all --show=output"
    Then it prints to STDERR
      """
      2 Markdown, 1 other
      running 4 tools
      """
    And it prints the block
      """
      committed.md:1:2: [MD019] Multiple spaces (5) after # in heading [fixed]
      """
    And it prints the block
      """
      untracked.md:1:2: [MD019] Multiple spaces (5) after # in heading [fixed]
      """
    And file "committed.md" now has content
      """
      # Committed
      """
    And file "untracked.md" now has content
      """
      # Untracked
      """
    And the exit code is 0
