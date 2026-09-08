Feature: disable an application's lint operation

  Background:
    Given a file "run-that-app" with content
      """
      taplo 0.10.0
      delete-empty-folders 0.0.2
      node 26.4.0
      prettier 3.7.0
      rumdl 0.1.0
      """
    Given a file "tricorder.json" with content
      """
      {
        "applications": {
          "taplo": {
            "operations": {
              "lint": {
                "enabled": false
              }
            }
          }
        }
      }
      """
    Given a file "other.md" with content
      """
      # a markdown file
      """
    And a file "Cargo.toml" with content
      """
      [package]
      name =      "demo"

      [lints.clippy]
      pedantic = { level = "warn", priority = -1 }
      """

  Scenario: lint skips the application
    When executing "tricorder lint --show=all"
    Then it prints the block
      """
      lint Markdown (rumdl)
      """
    Then it does not print
      """
      Taplo
      """
    And the exit code is 0

  @this
  Scenario: fix still runs when lint is disabled for an application
    When executing "tricorder fix --show=verbose"
    Then it prints the block matching
      """
      fix TOML \(Taplo\)
      \S+/taplo format Cargo\.toml
      """
    And it prints the block matching
      """
      fix Markdown \(rumdl\)
      \S+/rumdl fmt other.md\n
      """
    And the exit code is 0
