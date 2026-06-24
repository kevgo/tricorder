Feature: pitstop Java

  Background:
    Given a file "run-that-app" with content
      """
      delete-empty-folders 0.0.2
      """

  Scenario: unformatted Java
    Given a file "Main.java" with content
      """
      public class Main {
      public static void main(String[] args) {
      System.out.println("Hello, world!");
      }
      }
      """
    When executing "tricorder pitstop"
    Then it prints to STDERR
      """
      checkstyle not found on PATH - skipping. Install with: brew install checkstyle
      """
    And the exit code is 0
    And file "Main.java" is unchanged

  Scenario: invalid Java
    Given a file "Main.java" with content
      """
      public class Main {
          public static void main(String[] args) {
              System.out.println("
          }
      }
      """
    When executing "tricorder pitstop"
    Then it prints to STDERR
      """
      checkstyle not found on PATH - skipping. Install with: brew install checkstyle
      """
    And the exit code is 0
    And file "Main.java" is unchanged
