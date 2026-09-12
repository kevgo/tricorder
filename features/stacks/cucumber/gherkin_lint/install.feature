@online
Feature: install Gherkin Lint

  @this
  Scenario: not installed
    Given a file "run-that-app" with content
      """
      delete-empty-folders 0.0.2
      """
    Given a file "features/one.feature" with content
      """
      Feature: one

        Scenario: one
          Given a step
      """
    And a file ".gherkin-lintrc" with content
      """
      {
        "allowed-tags": [ "on", { "tags": ["@online"] } ],
        "file-name": [ "on", { "style": "snake_case" } ],
        "indentation": [
          "on",
          {
            "Feature": 0,
            "Background": 2,
            "Scenario": 2,
            "Step": 4,
            "Examples": 4,
            "example": 6,
            "given": 4,
            "when": 4,
            "then": 4,
            "and": 4,
            "but": 4,
            "feature tag": 0,
            "scenario tag": 2
          }
        ],
        "keywords-in-logical-order": "on",
        "new-line-at-eof": [ "on", "yes" ],
        "no-background-only-scenario": "on",
        "no-dupe-scenario-names": [ "on", "in-feature" ],
        "no-duplicate-tags": "on",
        "no-empty-background": "on",
        "no-empty-file": "on",
        "no-examples-in-scenarios": "on",
        "no-files-without-scenarios": "on",
        "no-homogenous-tags": "on",
        "no-multiple-empty-lines": "on",
        "no-partially-commented-tag-lines": "on",
        "no-scenario-outlines-without-examples": "on",
        "no-superfluous-tags": "on",
        "no-trailing-spaces": "on",
        "no-unnamed-features": "on",
        "no-unused-variables": "on",
        "one-space-between-tags": "on",
        "use-and": "on"
      }
      """
    When executing "tricorder lint --show=all"
    Then it prints the lines
      """
      lint Cucumber (gherkin-lint)
      """
    And the exit code is 0
    And file "features/one.feature" is unchanged
