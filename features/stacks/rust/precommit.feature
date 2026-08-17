@this
Feature: precommit Rust

  Background:
    Given a Git repository
    And a file "run-that-app" with content
      """
      delete-empty-folders 0.0.2
      taplo 0.10.0
      """
    And a file "main.rs" with content
      """
      // some Rust code
      """
    And I ran "git add main.rs"

  Scenario: no custom fixes defined
    When executing "tricorder precommit --show=all"
    Then it prints
      """
      delete empty folders
      """
    And it prints to STDERR
      """
      1 Rust
      running 1 tools
      """
    And the exit code is 0
    And file "main.rs" is unchanged

  Scenario: a custom fix is defined
    Given a file "tricorder.toml" with content
      """
      [[custom-fixes]]
      command = "echo 'custom fix running'"
      name = "my custom fix"
      stack = "rust"
      """
    When executing "tricorder precommit --show=all"
    Then it prints the block
      """
      my custom fix
      custom fix running
      """
    And it prints to STDERR
      """
      1 Rust
      running 2 tools
      """
    And the exit code is 0
    And file "main.rs" is unchanged
