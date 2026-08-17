Feature: lint Rust

  Background:
    Given a file "run-that-app" with content
      """
      delete-empty-folders 0.0.2
      """

  @this
  Scenario: no custom linters defined
    Given a file "hello.rs" with content
      """
      fn main() {
        println!("Hello!");
      }
      """
    When executing "tricorder lint --show=all"
    Then it prints nothing to STDOUT
    And it prints to STDERR
      """
      1 Rust, 1 other
      running 0 tools
      """
    And the exit code is 0
    And file "hello.rs" is unchanged

  Scenario: unformatted Python
    Given a file "main.py" with content
      """
      print   ("Hello, world!")
      """
    And a file "other.py" with content
      """
      print   ("Hello, other!")
      """
    When executing "tricorder lint --show=all"
    Then the exit code is 0
    And file "main.py" is unchanged
    And file "other.py" is unchanged

  Scenario: invalid Python
    Given a file "main.py" with content
      """
      print("
      """
    And a file "other.py" with content
      """
      print("
      """
    When executing "tricorder lint --show=all"
    Then the exit code is 1
    And file "main.py" is unchanged
    And file "other.py" is unchanged
