Feature: "tricorder precommit" skips stack-scoped custom fixes when that stack is not staged

  Scenario: custom fix for an unstaged stack does not run
    Given a Git repository
    And a file "run-that-app" with content
      """
      delete-empty-folders 0.0.2
      taplo 0.10.0
      """
    And a file "tricorder.toml" with content
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
    And a file "config.toml" with content
      """
      key = "value"
      """
    And I ran "git add -A"
    And I ran "git commit -m original"
    And I change file "config.toml" to
      """
      key = "changed"
      """
    And I ran "git add config.toml"
    When executing "tricorder precommit --show=all"
    Then it does not print any of these lines
      """
      Python custom fix
      Python custom fix should not run
      """
    And the exit code is 0
