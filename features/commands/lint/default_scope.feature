Feature: "trident lint" chooses a default --scope from the Git workspace

  Background:
    Given a Git repository
    And a committed file "run-that-app" with content
      """
      delete-empty-folders 0.0.2
      rumdl 0.2.14
      """
    And a committed file "on-main.md" with content
      """
      #     Main
      """

  Scenario: uncommitted files exist
    Given I ran "git checkout -b feature"
    And a committed file "committed-on-branch.md" with content
      """
      #     Branch
      """
    And a file "untracked.md" with content
      """
      #     Untracked
      """
    When executing "trident lint --show=output"
    Then it prints to STDERR
      """
      1 Markdown
      running 2 tools
      """
    And it prints the block
      """
      untracked.md:1:2: [MD019] Multiple spaces (5) after # in heading [*]
      """
    And it does not print
      """
      committed-on-branch.md
      """
    And it does not print
      """
      on-main.md
      """
    And all files are unchanged
    And the exit code is 1

  Scenario: working tree is clean and the branch has changes
    Given I ran "git checkout -b feature"
    And a committed file "committed-on-branch.md" with content
      """
      #     Branch
      """
    When executing "trident lint --show=output"
    Then it prints to STDERR
      """
      1 Markdown
      running 2 tools
      """
    And it prints the block
      """
      committed-on-branch.md:1:2: [MD019] Multiple spaces (5) after # in heading [*]
      """
    And it does not print
      """
      on-main.md
      """
    And all files are unchanged
    And the exit code is 1

  Scenario: working tree is clean and the branch has no changes
    When executing "trident lint --show=output"
    Then it prints to STDERR
      """
      1 Markdown, 1 other
      running 2 tools
      """
    And it prints the block
      """
      on-main.md:1:2: [MD019] Multiple spaces (5) after # in heading [*]
      """
    And all files are unchanged
    And the exit code is 1
