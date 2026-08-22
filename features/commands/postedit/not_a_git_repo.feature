Feature: "tricorder postedit" lints all files outside a Git repository

  Scenario: not a Git repository
    Given a file "run-that-app" with content
      """
      rumdl 0.2.14
      delete-empty-folders 0.0.2
      """
    And a file "main.md" with content
      """
      text
      """
    When executing "tricorder postedit --show=all"
    Then it prints to STDERR
      """
      1 Markdown, 1 other
      running 1 tools
      """
    And it prints the lines
      """
      lint Markdown (rumdl)
      main.md:1:1: [MD041] First line in file should be a level 1 heading
      """
    And the exit code is 1
    And file "main.md" is unchanged
