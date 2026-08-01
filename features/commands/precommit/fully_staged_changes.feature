Feature: "tricorder precommit" formats and stages files with fully staged changes

  Background:
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

  Scenario: precommit a fully staged file
    Given I change file "fully_staged.md" to
      """
      # Fully staged file

      line   2
      """
    And I ran "git add fully_staged.md"
    When executing "tricorder precommit"
    Then it prints nothing to STDOUT
    And the staged changes are
      """
      diff --git a/fully_staged.md b/fully_staged.md
      index 81b13b0..7fde770 100644
      --- a/fully_staged.md
      +++ b/fully_staged.md
      @@ -1,3 +1,3 @@
       # Fully staged file
      -line 1
      +line 2
      """
    And there are no unstaged changes
