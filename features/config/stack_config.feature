Feature: stack-specific configuration

  Background:
    Given a file "run-that-app" with content
      """
      taplo 0.10.0
      delete-empty-folders 0.0.2
      ruff 0.15.16
      """

  Scenario: add-lint runs alongside a built-in lint
    Given a file "tricorder.toml" with content
      """
      [[stack.python.add-lint]]
      name = "mypy"
      command = "echo MYPY RAN"
      """
    And a file "main.py" with content
      """
      print("hello")
      """
    When executing "tricorder lint --show=all"
    Then it prints the block
      """
      lint Python (ruff)
      """
    And it prints the block
      """
      mypy
      MYPY RAN
      """
    And the exit code is 0

  Scenario: lint replaces the built-in lint
    Given a file "tricorder.toml" with content
      """
      [[stack.python.lint]]
      name = "custom python lint"
      command = "echo CUSTOM LINT RAN"
      """
    And a file "main.py" with content
      """
      print("hello")
      """
    When executing "tricorder lint --show=all"
    Then it prints the block
      """
      custom python lint
      CUSTOM LINT RAN
      """
    And it does not print any of these lines
      """
      lint Python (ruff)
      """
    And the exit code is 0

  Scenario: lint = [] disables a stack's lints
    Given a file "tricorder.toml" with content
      """
      [stack.python]
      lint = []
      """
    And a file "main.py" with content
      """
      print("hello")
      """
    When executing "tricorder lint --show=all"
    Then it does not print any of these lines
      """
      lint Python (ruff)
      """
    And the exit code is 0

  Scenario: a stack section does nothing when no files of that stack exist
    Given a file "tricorder.toml" with content
      """
      [[stack.python.add-lint]]
      name = "my custom lint"
      command = "echo MY CUSTOM LINT RAN"
      """
    When executing "tricorder lint --show=all"
    Then it does not print any of these lines
      """
      my custom lint
      MY CUSTOM LINT RAN
      """
    And the exit code is 0

  Scenario: add-fix runs after the built-in fix within the stack sequence
    Given a file "tricorder.toml" with content
      """
      [[stack.python.add-fix]]
      name = "my fix"
      command = "echo MY FIX RAN"
      """
    And a file "main.py" with content
      """
      print("hello")
      """
    When executing "tricorder fix --show=all"
    Then it prints the lines
      """
      fix Python (ruff)
      format Python (ruff)
      my fix
      MY FIX RAN
      """
    And the exit code is 0
