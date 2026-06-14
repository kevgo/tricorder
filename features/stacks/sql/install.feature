Feature: install all SQL tools

  Background:
    Given a file "one.sql" with content
      """
      SELECT    id, name FROM one
      """

  @online
  Scenario: not installed
    When executing "tricorder format --show=all"
    Then it prints the lines to STDERR
      """
      Talking to GitHub API (https://api.github.com/repos/astral-sh/uv/releases/latest) ... ok
      """
    Then it prints the lines
      """
      SQL (sqlfmt)
      """
    And the exit code is 0
    And file "one.sql" now has content
      """
      select id, name from one
      """
    And file "run-that-app" now matches
      """
      # more info at https://github.com/kevgo/run-that-app

      uv \d+\.\d+\.\d+
      """
