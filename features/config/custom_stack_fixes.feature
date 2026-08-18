Feature: stack-specific fixes

  Background:
    Given a file "run-that-app" with content
      """
      taplo 0.10.0
      delete-empty-folders 0.0.2
      ruff 0.15.16
      """

  Scenario: "add-fix" adds custom fixes to the built-in ones for that stack
    Given a file "tricorder.toml" with content
      """
      [[stack.python.add-fix]]
      name = "my fix"
      command = "echo MY FIX RAN"
      """
    And a file "main.py" with content
      """
      # some Python code
      """
    When executing "tricorder fix --show=all"
    Then it prints the block
      """
      fix Python (ruff)
      """
    And it prints the block
      """
      my fix
      MY FIX RAN
      """
    And the exit code is 0

  Scenario: "fix" replaces the built-in fixes for that stack
    Given a file "tricorder.toml" with content
      """
      [[stack.python.fix]]
      name = "my fix"
      command = "echo MY FIX RAN"
      """
    And a file "main.py" with content
      """
      # some Python code
      """
    When executing "tricorder fix --show=all"
    Then it prints the block
      """
      my fix
      MY FIX RAN
      """
    And it does not print any of these lines
      """
      fix Python (ruff)
      """
    And the exit code is 0

  Scenario: disable a stack's fixes
    Given a file "tricorder.toml" with content
      """
      [stack.python]
      fix = []
      """
    And a file "main.py" with content
      """
      # some Python code
      """
    When executing "tricorder fix --show=all"
    Then it does not print any of these lines
      """
      fix Python (ruff)
      """
    And the exit code is 0

  Scenario: runs only when files of that stack exist
    Given a file "tricorder.toml" with content
      """
      [[stack.python.add-fix]]
      name = "my fix"
      command = "echo MY FIX RAN"
      """
    When executing "tricorder fix --show=all"
    Then it does not print any of these lines
      """
      my fix
      MY FIX RAN
      """
    And the exit code is 0
