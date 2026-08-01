Feature: "tricorder precommit" does not format files with unstaged changes

  Scenario: precommit an unstaged file
    Given a Git repository
    And a file "run-that-app" with content
      """
      delete-empty-folders 0.0.2
      rumdl 0.2.14
      """
    And a file "fully_staged.md" with content
      """
      # Fully staged file

      line 1
      """
    And I ran "git add -A"
    And I ran "git commit -m original"
    And I change file "fully_staged.md" to
      """
      # Fully staged file

      line   1
      """
    When executing "tricorder precommit"
    Then it prints nothing to STDOUT
    And there are no staged changes
    And the unstaged changes are
      """
      diff --git a/fully_staged.md b/fully_staged.md
      index 81b13b0..9829d0b 100644
      --- a/fully_staged.md
      +++ b/fully_staged.md
      @@ -1,3 +1,3 @@
       # Fully staged file
      -line 1
      +line   1
      """
