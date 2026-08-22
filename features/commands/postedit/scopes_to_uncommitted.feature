Feature: "tricorder postedit" lints only uncommitted files

  Background:
    Given a Git repository
    And a committed file "run-that-app" with content
      """
      rumdl 0.2.14
      ruff 0.15.16
      delete-empty-folders 0.0.2
      """
    And a committed file "main.py" with content
      """
      print("hello")
      """

  Scenario: ignores committed files of another stack
    Given a file "main.md" with content
      """
      text
      """
    When executing "tricorder postedit --show=all"
    Then it prints to STDERR
      """
      1 Markdown
      running 2 tools
      """
    And it prints the lines
      """
      lint Markdown (rumdl)
      """
    And it does not print
      """
      lint Python
      """
    And the exit code is 1

  Scenario: lints untracked files
    Given a file "untracked.md" with content
      """
      missing header
      """
    When executing "tricorder postedit --show=all"
    Then it prints the lines
      """
      lint Markdown (rumdl)
      untracked.md:1:1: [MD041] First line in file should be a level 1 heading
      """
    And the exit code is 1

  Scenario: lints unstaged files
    Given a committed file "main.md" with content
      """
      # Hello
      """
    And I change file "main.md" to
      """
      missing header
      """
    When executing "tricorder postedit --show=all"
    Then it prints the lines
      """
      lint Markdown (rumdl)
      main.md:1:1: [MD041] First line in file should be a level 1 heading
      """
    And the exit code is 1

  Scenario: lints staged files
    Given a file "main.md" with content
      """
      missing header
      """
    And I ran "git add main.md"
    When executing "tricorder postedit --show=all"
    Then it prints the lines
      """
      lint Markdown (rumdl)
      """
    And the exit code is 1
