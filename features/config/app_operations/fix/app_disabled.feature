Feature: disable an application's fix operation

  Background:
    Given a file "run-that-app" with content
      """
      delete-empty-folders 0.0.2
      markdownlint 0.41.1
      node 26.4.0
      prettier 3.7.0
      rumdl 0.2.14
      taplo 0.10.0
      """
    And a file "tricorder.json" with content
      """
      {
        "applications": {
          "taplo": {
            "operations": {
              "fix": {
                "enabled": false
              }
            }
          }
        }
      }
      """
    And a file "other.md" with content
      """
      # a markdown file
      """
    And a file "Cargo.toml" with content
      """
      [package]
      name =      "demo"

      [lints.clippy]
      pedantic = { level = "warn" }
      """

  Scenario: fix skips the application
    When executing "tricorder fix --show=all"
    Then it prints the block
      """
      fix Markdown (rumdl)
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
      lint Markdown \(rumdl\)
      \S+/rumdl check other.md\n
      """
    And the exit code is 0

  Scenario: fix-unsafe still runs the application
    When executing "tricorder fix-unsafe --show=verbose"
    Then it prints the block matching
      """
      force fix TOML \(Taplo\)
      \S+/taplo format --force Cargo\.toml
      """
    And the exit code is 0
