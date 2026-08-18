Feature: "tricorder precommit" skips stack-scoped custom fixes when no file of that stack is staged

  Scenario: custom Python fix is skipped when only a non-Python file is staged
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
