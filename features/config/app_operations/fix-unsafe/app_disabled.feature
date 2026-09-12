Feature: disable an application's fix-unsafe operation

  Background:
    Given a file "run-that-app" with content
      """
      biome 2.4.0
      delete-empty-folders 0.0.2
      node 26.4.0
      prettier 3.7.0
      taplo 0.10.0
      """
    And a file "tricorder.json" with content
      """
      {
        "applications": {
          "taplo": {
            "operations": {
              "fix-unsafe": {
                "enabled": false
              }
            }
          }
        }
      }
      """
    And a file "other.css" with content
      """
      .foo {
      \tcolor: red;
      }
      """
    And a file "Cargo.toml" with content
      """
      [package]
      name =      "demo"

      [lints.clippy]
      pedantic = { level = "warn", priority = -1 }
      """

  Scenario: fix-unsafe skips the application
    When executing "tricorder fix-unsafe --show=all"
    Then it prints the block
      """
      unsafe-fix CSS (Biome)
      """
    And it does not print
      """
      Taplo
      """
    And file "Cargo.toml" is unchanged
    And the exit code is 0

  Scenario: lint still runs the application
    When executing "tricorder lint --show=verbose"
    Then it prints the block matching
      """
      lint TOML \(Taplo\)
      \S+/taplo lint Cargo\.toml
      """
    And it prints the block matching
      """
      lint CSS \(Biome\)
      \S+/biome lint other\.css\n
      """
    And the exit code is 0

  Scenario: fix still runs the application
    When executing "tricorder fix --show=verbose"
    Then it prints the block matching
      """
      fix TOML \(Taplo\)
      \S+/taplo format Cargo\.toml
      """
    And it prints the block matching
      """
      fix CSS \(Biome\)
      \S+/biome format --write other\.css\n
      """
    And the exit code is 0
