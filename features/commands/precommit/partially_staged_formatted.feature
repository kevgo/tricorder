Feature: "tricorder precommit" formats but does not stage files with partially staged changes that are already formatted

  Background:
    Given a Git repository
    And a file "run-that-app" with content
      """
      delete-empty-folders 0.0.2
      rumdl 0.2.14
      """
    And a file "partially_staged.md" with content
      """
      # Partially staged file

      line     1

      line     2
      """
    And I ran "git add -A"
    And I ran "git commit -m original"

  Scenario: precommit partially staged changes
    Given I change file "partially_staged.md" to
      """
      # Partially staged file

      line     1

      line 2
      """
    And I ran "git add partially_staged.md"
    And I change file "partially_staged.md" to
      """
      # Partially staged file

      line 1

      line 2
      """
    When executing "tricorder precommit"
    Then the staged changes are
      """
      diff --git a/partially_staged.md b/partially_staged.md
      index 0ae52b7..9bbf111 100644
      --- a/partially_staged.md
      +++ b/partially_staged.md
      @@ -2,4 +2,4 @@
       line     1
      -line     2
      +line 2
      """
    And the unstaged changes are
      """
      diff --git a/partially_staged.md b/partially_staged.md
      index 9bbf111..587d5c8 100644
      --- a/partially_staged.md
      +++ b/partially_staged.md
      @@ -1,5 +1,5 @@
       # Partially staged file
      -line     1
      +line 1
       line 2
      """
