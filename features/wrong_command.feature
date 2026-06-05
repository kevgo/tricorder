Feature: wrong CLI command

  Scenario: calling a non-existing subcommand
    When executing "tricorder zonk"
    Then it prints:
      """
      CLI error: error: unrecognized subcommand 'zonk'
      
      Usage: tricorder [COMMAND]
      
      For more information, try '--help'.
      """
    And the exit code is 1
