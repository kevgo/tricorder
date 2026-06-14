Feature: check Java

  Scenario: valid Java
    Given a file "Main.java" with content
      """
      public class Main {
          public static void main(String[] args) {
              System.out.println("Hello, world!");
          }
      }
      """
    When executing "tricorder check --show=all"
    Then it prints the lines
      """
      checkstyle not found on PATH - skipping. Install with: brew install checkstyle
      """
    And the exit code is 0
    And file "Main.java" is unchanged

  Scenario: unformatted Java
    Given a file "Main.java" with content
      """
      public class Main {
      public static void main(String[] args) {
      System.out.println("Hello, world!");
      }
      }
      """
    When executing "tricorder check"
    Then it prints the lines
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
    When executing "tricorder check"
    Then it prints the lines
      """
      checkstyle not found on PATH - skipping. Install with: brew install checkstyle
      """
    And the exit code is 0
    And file "Main.java" is unchanged
