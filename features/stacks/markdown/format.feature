Feature: format Markdown

  Background:
    Given a file "run-that-app" with content
      """
      rumdl 0.2.14
      """

  Scenario: valid Markdown
    Given a file "main.md" with content
      """
      # Hello
      """
    When executing "tricorder format --show=all"
    Then it prints the lines
      """
      Markdown (rumdl)
      """
    And the exit code is 0
    And file "main.md" is unchanged

  Scenario: unformatted JSON
    Given a file "main.md" with content
      """
      #     Hello
      """
    When executing "tricorder format --show=all"
    Then it prints the lines
      """
      Markdown (rumdl)
      main.md:1:2: [MD019] Multiple spaces (5) after # in heading [fixed]
      """
    And the exit code is 0
    And file "main.md" now has content
      """
      # Hello
      """

  Scenario: invalid JSON
    Given a file "main.md" with content
      """
      # hello
      
      [e
      """
    When executing "tricorder format --show=all"
    Then it prints the lines
      """
      Markdown (rumdl)
      Success: No issues found in 1 file (3ms)
      """
    And the exit code is 0
    And file "main.md" is unchanged
#   @online
#   Scenario: auto-install
#     When executing "tricorder format"
#     Then it prints the lines
#       """
#       Markdown (rumdl)
#       """
#     And the exit code is 0
#     And file "run-that-app" now matches
#       """
#       # more info at https://github.com/kevgo/run-that-app
#       rumdl \d+\.\d+\.\d+
#       """
#     And file "README.md" now has content
#       """
#       # Hello
#       """
