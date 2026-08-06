Feature: keep-sorted support

  Background:
    Given a file "run-that-app" with content
      """
      taplo 0.10.0
      delete-empty-folders 0.0.2
      ripgrep 15.2.0
      keep-sorted 0.9.1
      """
    And a file "unsorted.toml" with content
      """
      # keep-sorted start
      b = 1
      a = 1
      # keep-sorted end
      """

  Scenario: keep-sorted is disabled by default
    When executing "tricorder fix --show=all"
    Then it does not print
      """
      keep-sorted
      """
    And file "unsorted.toml" is unchanged

  Scenario: keep-sorted sorts a marker-bearing file when enabled
    Given a file "tricorder.toml" with content
      """
      [keep-sorted]
      enabled = true
      """
    When executing "tricorder fix --show=all"
    Then it prints the block
      """
      sort TOML (keep-sorted)
      """
    And file "unsorted.toml" now has content
      """
      # keep-sorted start
      a = 1
      b = 1
      # keep-sorted end
      """
    And the exit code is 0

  Scenario: a file matching "exclude" is left untouched
    Given a file "tricorder.toml" with content
      """
      exclude = ["unsorted.toml"]

      [keep-sorted]
      enabled = true
      """
    When executing "tricorder fix --show=all"
    Then it does not print
      """
      keep-sorted
      """
    And file "unsorted.toml" is unchanged
