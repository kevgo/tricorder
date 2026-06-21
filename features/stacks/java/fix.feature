Feature: fix Java

  Background:
    Given a file "run-that-app" with content
      """
      delete-empty-folders 0.0.2
      """

  Scenario: valid Java
    Given a file "Main.java" with content
      """
      public class Main {
          public static void main(String[] args) {
              System.out.println("Hello, world!");
          }
      }
      """
    When executing "tricorder fix --show=all"
    Then it prints to STDERR
      """
      1 Java, 1 other
      running 2 tools
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
    When executing "tricorder fix --show=all"
    Then it prints to STDERR
      """
      1 Java, 1 other
      running 2 tools
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
    When executing "tricorder fix --show=all"
    Then it prints to STDERR
      """
      1 Java, 1 other
      running 2 tools
      """
    And the exit code is 0
    And file "Main.java" is unchanged
