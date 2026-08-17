Feature: custom fixes

  Background:
    Given a file "run-that-app" with content
      """
      taplo 0.10.0
      delete-empty-folders 0.0.2
      """

  Scenario: custom fixes run after the stack-specific ones, in the order defined
    Given a file "tricorder.toml" with content
      """
      [[custom-fixes]]
      command = "fixes/toml-1.sh"
      name = "my custom fix for TOML 1"
      stack = "toml"

      [[custom-fixes]]
      command = "fixes/toml-2.sh"
      name = "my custom fix for TOML 2"
      stack = "toml"

      [[custom-fixes]]
      name = "my global fix 1"
      command = "echo global fix 1 running"

      [[custom-fixes]]
      name = "my global fix 2"
      command = "echo global fix 2 running"
      """
    And an executable file "fixes/toml-1.sh" with content
      """
      #!/usr/bin/env bash
      echo "TOML fix 1 is running"
      """
    And an executable file "fixes/toml-2.sh" with content
      """
      #!/usr/bin/env bash
      echo "TOML fix 2 is running"
      """
    When executing "tricorder fix --show=all"
    Then it prints the lines
      """
      delete empty folders
      my global fix 1
      global fix 1 running
      my global fix 2
      global fix 2 running
      fix TOML (Taplo)
      my custom fix for TOML 1
      TOML fix 1 is running
      my custom fix for TOML 2
      TOML fix 2 is running
      """
    And the exit code is 0

  Scenario: a stack-scoped custom fix is skipped when no file of that stack exists
    Given a file "tricorder.toml" with content
      """
      [[custom-fixes]]
      command = "fixes/python.sh"
      name = "my python fix"
      stack = "python"
      """
    And an executable file "fixes/python.sh" with content
      """
      #!/usr/bin/env bash
      echo "PYTHON FIX RAN"
      """
    When executing "tricorder fix --show=all"
    Then it does not print
      """
      my python fix
      """
    And it does not print
      """
      PYTHON FIX RAN
      """
    And the exit code is 0

  Scenario: a stack-scoped custom fix runs when a file of that stack exists
    Given a file "run-that-app" with content
      """
      taplo 0.10.0
      delete-empty-folders 0.0.2
      ruff 0.15.16
      """
    And a file "tricorder.toml" with content
      """
      [[custom-fixes]]
      command = "fixes/python.sh"
      name = "my python fix"
      stack = "python"
      """
    And an executable file "fixes/python.sh" with content
      """
      #!/usr/bin/env bash
      echo "PYTHON FIX RAN"
      """
    And a file "main.py" with content
      """
      print("hello")
      """
    When executing "tricorder fix --show=all"
    Then it prints the block
      """
      my python fix
      PYTHON FIX RAN
      """
    And the exit code is 0

  Scenario: custom lint fails
    Given a file "tricorder.toml" with content
      """
      [[custom-lints]]
      command = "lints/fail.sh"
      """
    And an executable file "lints/fail.sh" with content
      """
      #!/usr/bin/env bash
      echo "custom lint failed"
      exit 4
      """
    When executing "tricorder lint --show=all"
    Then it prints the block
      """
      lints/fail.sh
      custom lint failed
      """
    And the exit code is 4

  Scenario: custom fix with unmatched stack is skipped
    Given a file "tricorder.toml" with content
      """
      [[custom-fixes]]
      name = "Python custom fix"
      command = "fixes/python.sh"
      stack = "python"
      """
    And an executable file "fixes/python.sh" with content
      """
      #!/usr/bin/env bash
      echo "Python custom fix should not run"
      exit 4
      """
    When executing "tricorder fix --show=all"
    Then it does not print any of these lines
      """
      Python custom fix
      Python custom fix should not run
      """
    And the exit code is 0
