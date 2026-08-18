Feature: "tricorder precommit" skips stack-scoped custom fixes when no file of that stack is staged

  Background:
    Given a Git repository
    And a file "run-that-app" with content
      """
      delete-empty-folders 0.0.2
      rumdl 0.2.14
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
      #!/bin/sh
      echo "PYTHON FIX RAN"
      """
    And a file "main.py" with content
      """
      print("hello")
      """
    And a file "one.md" with content
      """
      # One
      """
    And I ran "git add -A"
    And I ran "git commit -m original"

  Scenario: no Python file is staged
    And I change file "one.md" to
      """
      # New one
      """
    And I ran "git add one.md"
    When executing "tricorder precommit --show=all"
    Then it does not print
      """
      my python fix
      """
    And it does not print
      """
      PYTHON FIX RAN
      """
    And the exit code is 0

  Scenario: a Python file is staged
    Given I change file "main.py" to
      """
      print("world")
      """
    And I ran "git add main.py"
    When executing "tricorder precommit --show=all"
    Then it prints the block
      """
      my python fix
      PYTHON FIX RAN
      """
    And the exit code is 0
