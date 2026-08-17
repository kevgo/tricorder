Feature: lint Rust

  Background:
    Given a file "run-that-app" with content
      """
      delete-empty-folders 0.0.2
      taplo 0.10.0
      """
    Given a file "hello.rs" with content
      """
      fn main() {
        println!("Hello!");
      }
      """

  Scenario: no custom linters defined
    When executing "tricorder lint --show=all"
    Then it prints nothing to STDOUT
    And it prints to STDERR
      """
      1 Rust, 1 other
      running 0 tools
      """
    And the exit code is 0
    And file "hello.rs" is unchanged

  @this
  Scenario: a custom linter is defined
    Given a file "tricorder.toml" with content
      """
      [[custom-lints]]
      command = "echo 'custom linter running'"
      name = "my custom linter"
      stack = "rust"
      """
    When executing "tricorder lint --show=all"
    Then it prints the block
      """
      my custom linter
      custom linter running
      """
    And it prints to STDERR
      """
      1 Rust, 1 TOML, 1 other
      running 2 tools
      """
    And the exit code is 0
    And file "hello.rs" is unchanged
