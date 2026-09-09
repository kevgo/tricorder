Feature: exclude a file from being linted by a specific app only

  Background:
    Given a file "run-that-app" with content
      """
      taplo 0.10.0
      delete-empty-folders 0.0.2
      node 26.4.0
      prettier 3.7.0
      """
    And a file "tricorder.json" with content
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
    And a file "other.toml" with content
      """
      key =     "value"
      """
    And a file "Cargo.toml" with content
      """
      [package]
      name =      "demo"

      [lints.clippy]
      pedantic = { level = "warn", priority = -1 }
      """

  Scenario: lint ignores the file
    When executing "tricorder lint --show=verbose"
    Then it prints the block matching
      """
      lint TOML \(Taplo\)
      \S+/taplo lint other\.toml\n
      """
    And it does not print
      """
      Cargo.toml
      """
    And the exit code is 0

  Scenario: fix still formats the file
    When executing "tricorder fix --show=verbose"
    Then it prints the block matching
      """
      fix TOML \(Taplo\)
      \S+/taplo format Cargo\.toml other\.toml\n
      """
    And file "other.toml" now has content
      """
      key = "value"
      """
    And file "Cargo.toml" now has content
      """
      [package]
      name = "demo"

      [lints.clippy]
      pedantic = { level = "warn", priority = -1 }
      """
    And the exit code is 0

  Scenario: fix-unsafe still formats the file
    When executing "tricorder fix-unsafe --show=verbose"
    Then it prints the block matching
      """
      force fix TOML \(Taplo\)
      \S+/taplo format --force Cargo\.toml other\.toml\n
      """
    And file "other.toml" now has content
      """
      key = "value"
      """
    And file "Cargo.toml" now has content
      """
      [package]
      name = "demo"

      [lints.clippy]
      pedantic = { level = "warn", priority = -1 }
      """
    And the exit code is 0
