Feature: unsafe-fix CSS

  Background:
    Given a file "run-that-app" with content
      """
      biome 2.4.0
      delete-empty-folders 0.0.2
      """

  Scenario: fixable CSS
    Given a file "main.css" with content
      """
      .style {
        color: red !important;
      }
      """
    And a file "biome.json" with content
      """
      {
        "linter": {
          "rules": {
            "complexity": {
              "noImportantStyles": "error"
            }
          }
        }
      }
      """
    When executing "tricorder fix-unsafe --show=all"
    Then it prints the lines
      """
      fix CSS (Biome)
      unsafe fix CSS (Biome)
      """
    And the exit code is 0
    And file "main.css" now has content
      """
      .style {
      \tcolor: red;
      }
      """
