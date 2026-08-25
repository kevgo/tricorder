Feature: "tricorder postedit" enables linters whose config is already committed

  Scenario: runs Tikibase even though its config file is not changed
    Given a Git repository
    And a committed file "run-that-app" with content
      """
      delete-empty-folders 0.0.2
      rumdl 0.2.14
      tikibase 0.6.2
      """
    And a committed file "tikibase.json" with content
      """
      {
        "ignore": [
          "run-that-app"
        ],
        "bidiLinks": true
      }
      """
    And a committed file "one.md" with content
      """
      # One

      also check out [Two](two.md)
      """
    And a committed file "two.md" with content
      """
      # Two

      also check out [One](one.md)
      """
    And I change file "one.md" to
      """
      # New one

      also check out [Two](two.md)
      """
    When executing "tricorder postedit --show=all"
    Then it prints the lines
      """
      lint Markdown (tikibase)
      lint Markdown (rumdl)
      """
    And the exit code is 0
