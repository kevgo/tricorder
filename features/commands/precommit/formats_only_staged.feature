Feature: "tricorder precommit" formats only staged files

  Background:
    Given a Git repository
    And a file "partially_staged.md" with content
      """
      # Partially staged file

      line 1

      line 2
      """
    And a file "fully_staged.md" with content
      """
      # Fully staged file

      line 1
      """
    And I ran "git add -A"
    And I ran "git commit -m original"

  @this
  Scenario: precommit a partially staged file
    Given a file "partially_staged.md" with content
      """
      # Partially staged file

      modified line 1

      line 2
      """
    And I ran "git add -A"
    And a file "partially_staged.md" with content
      """
      # Partially staged file

      modified line 1

      modified line 2
      """
    When executing "tricorder precommit"
    Then the staged changes match
      """
      diff --git a/partially_staged.md b/partially_staged.md
      index 587d5c8..8c901d4 100644
      --- a/partially_staged.md
      +++ b/partially_staged.md
      @@ -1,5 +1,5 @@
       # Partially staged file
      -line 1
      +modified line 1
       line 2
      """
    And the unstaged changes are
      """
      diff --git a/partially_staged.md b/partially_staged.md
      index 8c901d4..fe55a0a 100644
      --- a/partially_staged.md
      +++ b/partially_staged.md
      @@ -2,4 +2,4 @@
       modified line 1
      -line 2
      +modified line 2
      """
