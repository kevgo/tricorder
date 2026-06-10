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
      schema.sql failed formatting check.
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
      running 1 tools
      SQL (sqlfmt)
      schema.sql failed formatting check.
      """
    And the exit code is 1
    And there is no file "run-that-app"
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
