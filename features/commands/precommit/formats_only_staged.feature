Feature: "tricorder precommit" formats only staged files

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

  Scenario: fix formatting for a partially staged file
    Given I change file "partially_staged.md" to
      """
      # Partially staged file

      line   1

      line 2
      """
    And I ran "git add partially_staged.md"
    And I change file "partially_staged.md" to
      """
      # Partially staged file

      line   1

      line   2
      """
    When executing "tricorder precommit"
    Then the staged changes are
      """
      diff --git a/partially_staged.md b/partially_staged.md
      index 587d5c8..86b2397 100644
      --- a/partially_staged.md
      +++ b/partially_staged.md
      @@ -1,5 +1,5 @@
       # Partially staged file
      -line 1
      +line   1
       line 2
      """
    And the unstaged changes are
      """
      diff --git a/partially_staged.md b/partially_staged.md
      index 86b2397..587d5c8 100644
      --- a/partially_staged.md
      +++ b/partially_staged.md
      @@ -1,5 +1,5 @@
       # Partially staged file
      -line   1
      +line 1
       line 2
      """

  Scenario: precommit a fully staged file
    Given a file "fully_staged.md" with content
      """
      # Fully staged file

      line   1
      """
    And I ran "git add fully_staged.md"
    When executing "tricorder precommit"
    Then it prints nothing to STDOUT
    And the staged changes are
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
    And the unstaged changes are
      """
      diff --git a/fully_staged.md b/fully_staged.md
      index 9829d0b..81b13b0 100644
      --- a/fully_staged.md
      +++ b/fully_staged.md
      @@ -1,3 +1,3 @@
       # Fully staged file
      -line   1
      +line 1
      """
