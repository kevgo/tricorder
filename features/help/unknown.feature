Feature: wrong CLI command

  Scenario: calling a non-existing subcommand
    When executing "trident zonk"
    Then it prints
      """
      error: unrecognized subcommand 'zonk'

      Usage: trident <COMMAND>

      For more information, try '--help'.
      """
    And the exit code is 1
