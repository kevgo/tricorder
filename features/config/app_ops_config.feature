Feature: fine-tune specific operations per application

  Scenario: ignore a file only for linting
    Given a file "tricorder.json" with content
      """
      {
        "applications": {
          "taplo": {
            "operations": {
              "lint": {
                "ignore-files": ["Cargo.toml"]
              }
            }
          }
        }
      }
      """
    When executing "tricorder lint --show=verbose"
    Then it prints the block matching
      """
      lint TOML \(Taplo\)
      \S+/taplo lint config\.toml\n
      """
    And it does not print
      """
      Cargo.toml
      """
    And the exit code is 0

  Scenario: fix still formats files ignored only while linting
    Given a file "tricorder.json" with content
      """
      {
        "applications": {
          "taplo": {
            "operations": {
              "lint": { "ignore-files": ["Cargo.toml"] }
            }
          }
        }
      }
      """
    And a file "Cargo.toml" with content
      """
      [package]
      name =    "demo"
      """
    And a file "config.toml" with content
      """
      key =     "value"
      """
    When executing "tricorder fix --show=verbose"
    Then it prints the block
      """
      fix TOML (Taplo)
      """
    And it prints the block
      """
      Cargo.toml
      """
    And it prints the block
      """
      config.toml
      """
    And file "config.toml" now has content
      """
      key = "value"
      """
    And file "Cargo.toml" now has content
      """
      [package]
      name = "demo"
      """
    And the exit code is 0

  Scenario: lint skips an application disabled for lint
    Given a file "tricorder.json" with content
      """
      {
        "applications": {
          "taplo": {
            "operations": {
              "lint": { "enabled": false }
            }
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

  Scenario: fix still runs when lint is disabled for an application
    Given a file "tricorder.json" with content
      """
      {
        "applications": {
          "taplo": {
            "operations": {
              "lint": { "enabled": false }
            }
          }
        }
      }
      """
    And a file "config.toml" with content
      """
      key =     "value"
      """
    When executing "tricorder fix --show=all"
    Then it prints the block
      """
      fix TOML (Taplo)
      """
    And file "config.toml" now has content
      """
      key = "value"
      """
    And the exit code is 0
