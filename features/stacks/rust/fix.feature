Feature: fix Rust

  Background:
    Given a file "run-that-app" with content
      """
      delete-empty-folders 0.0.2
      taplo 0.10.0
      """
    Given a file "main.rs" with content
      """
      fn main() {
        println!("Hello!");
      }
      """

  Scenario: no custom fixes defined
    When executing "tricorder fix --show=all"
    Then it prints
      """
      delete empty folders
      """
    And it prints to STDERR
      """
      1 Rust, 1 other
      running 1 tools
      """
    And the exit code is 0
    And file "main.rs" is unchanged

  Scenario: a custom linter is defined
    Given a file "tricorder.toml" with content
      """
      [[custom-fixes]]
      command = "echo 'custom fix running'"
      name = "my custom fix"
      stack = "rust"
      """
    When executing "tricorder fix --show=all"
    Then it prints the block
      """
      my custom fix
      custom fix running
      """
    And it prints to STDERR
      """
      1 Rust, 1 TOML, 1 other
      running 3 tools
      """
    And the exit code is 0
    And file "main.rs" is unchanged
