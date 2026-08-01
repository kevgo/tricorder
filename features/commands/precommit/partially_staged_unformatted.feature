Feature: "tricorder precommit" formats and stages files with partially staged changes

  Scenario: precommit partially staged changes
    Given a Git repository
    And a file "run-that-app" with content
      """
      delete-empty-folders 0.0.2
      rumdl 0.2.14
      """
    And a file "partially_staged.md" with content
      """
      # Partially staged file

      line 1

      line 2
      """
    And I ran "git add -A"
    And I ran "git commit -m original"
    And I change file "partially_staged.md" to
      """
      # Partially staged file

      line   3

      line 2
      """
    And I ran "git add partially_staged.md"
    And I change file "partially_staged.md" to
      """
      # Partially staged file

      line   3

      line   4
      """
    When executing "tricorder precommit"
    Then the staged changes are
      """
      diff --git a/partially_staged.md b/partially_staged.md
      index 587d5c8..d66556c 100644
      --- a/partially_staged.md
      +++ b/partially_staged.md
      @@ -1,5 +1,5 @@
       # Partially staged file
      -line 1
      +line 3
      -line 2
      +line 4
      """
    And there are no unstaged changes
