Feature: check CSS

  Background:
    Given a file "main.css" with content
      """
      .foo {
        color : red ;
        background:    blue;
      }
      """

  Scenario: already configured
    Given a file "run-that-app" with content
      """
      biome 2.4.0
      """
    When executing "tricorder check"
    Then it prints the lines
      """
      CSS (biome)
      Found 1 error.
      """
    And it does not print
      """
      Talking to GitHub API
      """
    And the exit code is 1

  @online
  Scenario: auto-install
    When executing "tricorder check"
    Then it prints to STDERR
      """
      1 CSS
      Talking to GitHub API (https://api.github.com/repos/biomejs/biome/releases/latest) ... ok
      running 1 tools
      """
    Then it prints the lines
      """
      CSS (biome)
      Found 1 error.
      """
    And the exit code is 1
    And file "run-that-app" now matches
      """
      # more info at https://github.com/kevgo/run-that-app

      biome \d+\.\d+\.\d+
      """
