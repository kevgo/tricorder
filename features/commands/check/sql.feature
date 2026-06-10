Feature: checking SQL files

  Background:
    And a file "schema.sql" with content
      """
      SELECT id,name,email FROM users WHERE active=true ORDER BY name
      """

  Scenario: already configured
    Given a file "run-that-app" with content
      """
      sqlfmt 0.24.0
      """
    When executing "tricorder check"
    Then it prints:
      """
      1 SQL, 1 other
      running 1 tools
      SQL (sqlfmt)
      schema.sql was reformatted
      """
    And it does not print:
      """
      Talking to GitHub API
      """
    And the exit code is 1
    And file "schema.sql" is unchanged

  @online
  Scenario: unconfigured
    When executing "tricorder check"
    Then it prints:
      """
      1 SQL
      Talking to GitHub API (https://api.github.com/repos/tconbeer/sqlfmt/releases/latest) ... ok
      running 1 tools
      SQL (sqlfmt)
      schema.sql was reformatted
      """
    And the exit code is 1
    And file "run-that-app" now matches
      """
      # more info at https://github.com/kevgo/run-that-app

      sqlfmt \d+\.\d+\.\d+
      """
    And file "schema.sql" is unchanged

  Scenario: detects multiple SQL file extensions
    Given a file "migration.pgsql" with content
      """
      CREATE TABLE orders (id INT, total DECIMAL(10,2));
      """
    And a file "proc.tsql" with content
      """
      CREATE PROCEDURE GetUser AS SELECT * FROM users
      """
    Given a file "run-that-app" with content
      """
      sqlfmt 0.24.0
      """
    When executing "tricorder check"
    Then it prints:
      """
      3 SQL, 1 other
      running 1 tools
      SQL (sqlfmt)
      """
    And the exit code is 1
