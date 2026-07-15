Feature: runs all fixes for the changed files

  Scenario: runs Tikibase even though its config file is not changed
    Given a Git repository
    And a file "run-that-app" with content
      """
      delete-empty-folders 0.0.2
      rumdl 0.2.14
      tikibase 0.6.2
      """
    And a file "tikibase.json" with content
      """
      {
        "ignore": [
          "run-that-app"
        ],
        "bidiLinks": false
      }
      """
    Given a file "one.md" with content
      """
      # One

      text
      """
    And I ran "git add -A"
    And I ran "git commit -m original"
    And I change file "one.md" to
      """
      # New   one

      text
      """
    And I ran "git add one.md"
    When executing "tricorder precommit --show=all"
    Then it prints the lines
      """
      fix Markdown (tikibase)
      fix Markdown (rumdl)
      """
    And the exit code is 0
    And file "one.md" now has content
      """
      # New one

      text
      """
    Then the staged changes are
      """
      diff --git a/one.md b/one.md
      index b3e70d0..7a53595 100644
      --- a/one.md
      +++ b/one.md
      @@ -1,3 +1,3 @@
      -# One
      +# New   one
       text
      """
    And the unstaged changes are
      """
      diff --git a/one.md b/one.md
      index 7a53595..4168e2b 100644
      --- a/one.md
      +++ b/one.md
      @@ -1,3 +1,3 @@
      -# New   one
      +# New one
       text
      """
