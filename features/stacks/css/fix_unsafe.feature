Feature: unsafe-fix CSS

  Background:
    Given a file "run-that-app" with content
      """
      biome 2.4.0
      delete-empty-folders 0.0.2
      """
    And a file "main.css" with content
      """
      .style {
      \tcolor: red !important;
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

  Scenario: fix-unsafe
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

  Scenario: fix
    When executing "tricorder fix --show=all"
    Then it prints the lines
      """
      fix CSS (Biome)
      """
    And the exit code is 0
    And file "main.css" is unchanged
