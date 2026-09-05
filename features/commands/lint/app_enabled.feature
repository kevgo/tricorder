Feature: "tricorder lint" skips disabled applications

  Scenario: skips a disabled application
    Given a file "run-that-app" with content
      """
      taplo 0.10.0
      delete-empty-folders 0.0.2
      node 26.4.0
      prettier 3.7.0
      """
    And a file "config.toml" with content
      """
      key =     "value"
      """
    And a file "tricorder.json" with content
      """
      {
        "applications": {
          "taplo": {
            "enabled": false
          }
        }
      }
      """
    When executing "tricorder lint --show=all"
    Then it does not print
      """
      Taplo
      """
    And the exit code is 0
