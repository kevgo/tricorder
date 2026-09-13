Feature: pitstop Dockerfile with dprint

  Scenario: unformatted Dockerfile
    Given a file "run-that-app" with content
      """
      delete-empty-folders 0.0.2
      dprint 0.57.4
      """
    And a file "dprint.json" with content
      """
      {
        "plugins": ["https://plugins.dprint.dev/dockerfile-0.4.1.wasm"]
      }
      """
    And a file "tricorder.json" with content
      """
      {
        "applications": {
          "prettier": { "enabled": false },
          "hadolint": { "enabled": false },
          "dprint": { "enabled": true, "ignore-files": ["dprint.json", "tricorder.json"] }
        }
      }
      """
    And a file "Dockerfile" with content
      """
      FROM     alpine
      """
    And a file "subdir/Dockerfile" with content
      """
      FROM     debian
      """
    When executing "tricorder pitstop --show=all"
    Then it prints the lines
      """
      fix Dockerfile (dprint)
      """
    And the exit code is 0
    And file "Dockerfile" now has content
      """
      FROM alpine
      """
    And file "subdir/Dockerfile" now has content
      """
      FROM debian
      """
