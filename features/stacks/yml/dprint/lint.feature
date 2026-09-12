Feature: lint YML with dprint

  Background:
    Given a file "run-that-app" with content
      """
      delete-empty-folders 0.0.2
      dprint 0.57.4
      """
    And a file "dprint.json" with content
      """
      {
        "plugins": ["https://plugins.dprint.dev/g-plane/pretty_yaml-v0.6.0.wasm"]
      }
      """
    And a file "tricorder.json" with content
      """
      {
        "applications": {
          "prettier": { "enabled": false },
          "dprint": { "ignore-files": ["dprint.json", "tricorder.json"] }
        }
      }
      """

  Scenario: formatted YML
    Given a file "main.yml" with content
      """
      key: value
      """
    When executing "tricorder lint --show=all"
    Then it prints the block
      """
      lint YML (dprint)
      """
    And the exit code is 0
    And file "main.yml" is unchanged

  Scenario: unformatted YML
    Given a file "main.yml" with content
      """
      key:     value
      """
    And a file "other.yml" with content
      """
      key:     other
      """
    When executing "tricorder lint --show=all"
    Then it prints the lines
      """
      lint YML (dprint)
      """
    And the exit code is 20
    And file "main.yml" is unchanged
    And file "other.yml" is unchanged

  Scenario: invalid YML
    Given a file "main.yml" with content
      """
      key: "
      """
    When executing "tricorder lint --show=all"
    Then it prints the block
      """
      lint YML (dprint)
      Error formatting
      """
    And the exit code is 1
    And file "main.yml" is unchanged
