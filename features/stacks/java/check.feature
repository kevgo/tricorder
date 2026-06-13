Feature: check Java

  Background:
    Given a file "Main.java" with content
      """
      public class Main {
          public static void main(String[] args) {
              System.out.println("Hello, world!");
          }
      }
      """

  Scenario: checkstyle not installed
    When executing "tricorder check"
    Then it prints the lines
      """
      checkstyle not found on PATH - skipping. Install with: brew install checkstyle
      """
