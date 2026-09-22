Feature: "trident pitstop" chooses a default --scope from the Git workspace

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

  Scenario: on feature branch with uncommitted files
    Given I ran "git checkout -b feature"
    And a committed file "committed-on-branch.md" with content
      """
      #     Branch
      """
    And a file "untracked.md" with content
      """
      #     Untracked
      """
    When executing "trident pitstop --show=output"
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
      committed-on-branch.md
      """
    And it does not print
      """
      on-main.md
      """
    And file "untracked.md" now has content
      """
      # Untracked
      """
    And file "committed-on-branch.md" is unchanged
    And file "on-main.md" is unchanged
    And the exit code is 0

  Scenario: on main branch with uncommitted files
    And a file "untracked.md" with content
      """
      #     Untracked
      """
    When executing "trident pitstop --show=output"
    Then it prints to STDERR
      """
      1 Markdown
      running 4 tools
      """
    And it prints the block
      """
      untracked.md:1:2: [MD019] Multiple spaces (5) after # in heading [fixed]
      """
    And file "untracked.md" now has content
      """
      # Untracked
      """
    And file "on-main.md" is unchanged
    And the exit code is 0

  Scenario: on feature branch, no uncommitted files, branch has changes
    Given I ran "git checkout -b feature"
    And a committed file "committed-on-branch.md" with content
      """
      #     Branch
      """
    When executing "trident pitstop --show=output"
    Then it prints to STDERR
      """
      1 Markdown
      running 4 tools
      """
    And it prints the block
      """
      committed-on-branch.md:1:2: [MD019] Multiple spaces (5) after # in heading [fixed]
      """
    And it does not print
      """
      on-main.md
      """
    And file "committed-on-branch.md" now has content
      """
      # Branch
      """
    And file "on-main.md" is unchanged
    And the exit code is 0

  Scenario: on main branch, no uncommitted files
    When executing "trident pitstop --show=output"
    Then it prints to STDERR
      """
      1 Markdown, 1 other
      running 4 tools
      """
    And it prints the block
      """
      on-main.md:1:2: [MD019] Multiple spaces (5) after # in heading [fixed]
      """
    And file "on-main.md" now has content
      """
      # Main
      """
    And the exit code is 0
