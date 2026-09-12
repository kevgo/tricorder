Feature: precommit YML with dprint

  Background:
    Given a Git repository
    And a file "run-that-app" with content
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
          "dprint": { "enabled": true, "ignore-files": ["dprint.json", "tricorder.json"] }
        }
      }
      """

  Scenario: formatted YML
    Given a file "main.yml" with content
      """
      key: value
      """
    And I ran "git add main.yml"
    When executing "tricorder precommit --show=all"
    Then it prints the block
      """
      fix YML (dprint)
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
    And I ran "git add main.yml other.yml"
    When executing "tricorder precommit --show=all"
    Then it prints the lines
      """
      fix YML (dprint)
      """
    And the exit code is 0
    And file "main.yml" now has content
      """
      key: value
      """
    And file "other.yml" now has content
      """
      key: other
      """

  Scenario: invalid YML
    Given a file "main.yml" with content
      """
      key: "
      """
    And I ran "git add main.yml"
    When executing "tricorder precommit --show=all"
    Then it prints the block
      """
      fix YML (dprint)
      Error formatting
      """
    And the exit code is 0
    And file "main.yml" is unchanged
