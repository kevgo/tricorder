Feature: "tricorder precommit" formats but does not stage files with partially staged changes that are already formatted

  @this
  Scenario: precommit partially staged changes
    Given a Git repository
    And a file "run-that-app" with content
      """
      delete-empty-folders 0.0.2
      rumdl 0.2.14
      """
    And a file "file.md" with content
      """
      line     1 old

      line     2 old
      """
    And I ran "git add -A"
    And I ran "git commit -m original"
    And I change file "file.md" to
      """
      line     1 old

      line 2 new
      """
    And I ran "git add file.md"
    And I change file "file.md" to
      """
      line 1 new

      line 2 new
      """
    When executing "tricorder precommit"
    Then the staged changes are
      """
      diff --git a/file.md b/file.md
      index 0ae52b7..9bbf111 100644
      --- a/file.md
      +++ b/file.md
      @@ -1,3 +1,3 @@
       line     1
      -line     2
      +line 2
      """
    And the unstaged changes are
      """
      diff --git a/file.md b/file.md
      index 9bbf111..587d5c8 100644
      --- a/file.md
      +++ b/file.md
      @@ -1,3 +1,3 @@
       # Partially staged file
      -line     1
      +line 1
       line 2
      """
