Feature: "tricorder precommit" formats only staged files

  Background:
    Given a Git repository
    And a file "run-that-app" with content
      """
      rumdl 0.2.14
      """
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

  Scenario: precommit a partially staged file
    Given a file "partially_staged.md" with content
      """
      # Partially staged file

      modified   line   1

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
    Then the staged changes are
      """
      diff --git a/partially_staged.md b/partially_staged.md
      index 587d5c8..1e6f742 100644
      --- a/partially_staged.md
      +++ b/partially_staged.md
      @@ -1,5 +1,5 @@
       # Partially staged file
      -line 1
      +modified   line   1
       line 2
      """
    And the unstaged changes are
      """
      diff --git a/partially_staged.md b/partially_staged.md
      index 1e6f742..fe55a0a 100644
      --- a/partially_staged.md
      +++ b/partially_staged.md
      @@ -1,5 +1,5 @@
       # Partially staged file
      -modified   line   1
      +modified line 1
      -line 2
      +modified line 2
      """

  @this
  Scenario: precommit a fully staged file
    Given a file "fully_staged.md" with content
      """
      # Fully staged file

      line 1
      """
    And I ran "git add -A"
    And a file "fully_staged.md" with content
      """
      # Fully staged file

      line   1
      """
    When executing "tricorder precommit"
    Then there are no staged changes
      """

      """
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
