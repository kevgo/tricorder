Feature: keep-sorted support

  Background:
    Given a file "run-that-app" with content
      """
      taplo 0.10.0
      delete-empty-folders 0.0.2
      ripgrep 15.2.0
      keep-sorted 0.9.1
      node 26.4.0
      prettier 3.7.0
      """
    And a file "unsorted_1.toml" with content
      """
      # keep-sorted start
      a = 1
      b = 1
      # keep-sorted end
      """
    And a file "unsorted_2.toml" with content
      """
      # keep-sorted start
      c = 1
      d = 1
      # keep-sorted end
      """

  Scenario: keep-sorted is disabled by default
    When executing "tricorder fix --show=all"
    Then it does not print
      """
      keep-sorted
      """
    And file "unsorted_1.toml" is unchanged
    And file "unsorted_2.toml" is unchanged

  Scenario: keep-sorted sorts marker-bearing files when enabled
    Given a file "tricorder.json" with content
      """
      {
        "applications": {
          "keep-sorted": {
            "enabled": true
          }
        }
      }
      """
    When executing "tricorder fix --show=all"
    Then it prints the block
      """
      sort TOML (keep-sorted)
      """
    And file "unsorted_1.toml" now has content
      """
      # keep-sorted start
      a = 1
      b = 1
      # keep-sorted end
      """
    And file "unsorted_2.toml" now has content
      """
      # keep-sorted start
      c = 1
      d = 1
      # keep-sorted end
      """
    And the exit code is 0

  Scenario: does not sort globally ignored files
    Given a file "tricorder.json" with content
      """
      {
        "ignore-files": ["unsorted_1.toml"],
        "applications": {
          "keep-sorted": {
            "enabled": true
          }
        }
      }
      """
    When executing "tricorder fix --show=all"
    Then it prints the block
      """
      keep-sorted
      """
    And file "unsorted_1.toml" is unchanged
    And file "unsorted_2.toml" now has content
      """
      # keep-sorted start
      c = 1
      d = 1
      # keep-sorted end
      """

  Scenario: does not sort files that should not be sorted
    Given a file "tricorder.json" with content
      """
      {
        "applications": {
          "keep-sorted": {
            "enabled": true,
            "ignore-files": ["unsorted_1.toml"]
          }
        }
      }
      """
    When executing "tricorder fix --show=all"
    Then it prints the block
      """
      keep-sorted
      """
    And file "unsorted_1.toml" is unchanged
    And file "unsorted_2.toml" now has content
      """
      # keep-sorted start
      c = 1
      d = 1
      # keep-sorted end
      """
