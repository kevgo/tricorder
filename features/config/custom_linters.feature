Feature: custom lints

  Background:
    Given a file "run-that-app" with content
      """
      taplo 0.10.0
      delete-empty-folders 0.0.2
      """

  Scenario: custom lint passes
    Given a file "tricorder.toml" with content
      """
      [[custom-lints]]
      command = "lints/one.sh"

      [[custom-lints]]
      name = "list all files"
      command = "find . | sort | xargs echo"
      """
    And an executable file "lints/one.sh" with content
      """
      #!/usr/bin/env bash
      echo "custom lint is running"
      """
    When executing "tricorder lint --show=all"
    Then it prints the block
      """
      lints/one.sh
      custom lint is running
      """
    And it prints the block
      """
      list all files
      . ./lints ./lints/one.sh ./run-that-app ./tricorder.toml
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

  Scenario: custom lint with matching stack runs
    Given a file "tricorder.toml" with content
      """
      [[custom-lints]]
      name = "TOML custom lint"
      command = "lints/toml.sh"
      stack = "toml"
      """
    And an executable file "lints/toml.sh" with content
      """
      #!/bin/sh
      echo "TOML custom lint is running"
      """
    When executing "tricorder lint --show=all"
    Then it prints the block
      """
      TOML custom lint
      TOML custom lint is running
      """
    And the exit code is 0

  Scenario: custom lint with unmatched stack is skipped
    Given a file "tricorder.toml" with content
      """
      [[custom-lints]]
      name = "Python custom lint"
      command = "lints/python.sh"
      stack = "python"
      """
    And an executable file "lints/python.sh" with content
      """
      #!/usr/bin/env bash
      echo "Python custom lint should not run"
      exit 4
      """
    When executing "tricorder lint --show=all"
    Then it does not print any of these lines
      """
      Python custom lint
      Python custom lint should not run
      """
    And the exit code is 0
