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
