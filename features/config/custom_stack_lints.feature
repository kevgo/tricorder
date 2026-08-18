Feature: stack-specific lints

  Background:
    Given a file "run-that-app" with content
      """
      taplo 0.10.0
      delete-empty-folders 0.0.2
      ruff 0.15.16
      """

  Scenario: "add-lint" adds custom lints to the built-in ones for that stack
    Given a file "tricorder.toml" with content
      """
      [[stack.python.add-lint]]
      name = "my lint"
      command = "echo MY LINT RAN"
      """
    And a file "main.py" with content
      """
      # some Python code
      """
    When executing "tricorder lint --show=all"
    Then it prints the block
      """
      lint Python (ruff)
      """
    And it prints the block
      """
      my lint
      MY LINT RAN
      """
    And the exit code is 0

  Scenario: "lint" replaces the built-in lints for that stack
    Given a file "tricorder.toml" with content
      """
      [[stack.python.lint]]
      name = "my lint"
      command = "echo MY LINT RAN"
      """
    And a file "main.py" with content
      """
      # some Python code
      """
    When executing "tricorder lint --show=all"
    Then it prints the block
      """
      my lint
      MY LINT RAN
      """
    And it does not print any of these lines
      """
      lint Python (ruff)
      """
    And the exit code is 0

  Scenario: disable a stack's lints
    Given a file "tricorder.toml" with content
      """
      [stack.python]
      lint = []
      """
    And a file "main.py" with content
      """
      # some Python code
      """
    When executing "tricorder lint --show=all"
    Then it does not print any of these lines
      """
      lint Python (ruff)
      """
    And the exit code is 0

  Scenario: runs only when files of that stack exist
    Given a file "tricorder.toml" with content
      """
      [[stack.python.add-lint]]
      name = "my lint"
      command = "echo MY LINT RAN"
      """
    When executing "tricorder lint --show=all"
    Then it does not print any of these lines
      """
      my lint
      MY LINT RAN
      """
    And the exit code is 0
