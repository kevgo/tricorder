Feature: stack-specific configuration

  Background:
    Given a file "run-that-app" with content
      """
      taplo 0.10.0
      delete-empty-folders 0.0.2
      ruff 0.15.16
      """

  Scenario: add-lints runs alongside a built-in lint
    Given a file "tricorder.toml" with content
      """
      [stack.python]
      add-lints = [{ name = "mypy", command = "echo MYPY RAN" }]
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

  Scenario: lints replaces the built-in lint
    Given a file "tricorder.toml" with content
      """
      [stack.python]
      lints = [{ name = "custom python lint", command = "echo CUSTOM LINT RAN" }]
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

  Scenario: lints = [] disables a stack's lints
    Given a file "tricorder.toml" with content
      """
      [stack.python]
      lints = []
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
      [stack.python]
      add-lints = [{ name = "mypy", command = "echo MYPY RAN" }]
      """
    When executing "tricorder lint --show=all"
    Then it does not print any of these lines
      """
      mypy
      MYPY RAN
      """
    And the exit code is 0

  Scenario: add-fixes runs after the built-in fix within the stack sequence
    Given a file "tricorder.toml" with content
      """
      [stack.python]
      add-fixes = [{ name = "isort", command = "echo ISORT RAN" }]
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
      isort
      ISORT RAN
      """
    And the exit code is 0
