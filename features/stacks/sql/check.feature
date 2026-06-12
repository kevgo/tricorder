Feature: check SQL

  Scenario: already configured
    Given a file "run-that-app" with content
      """
      uv 0.11.20
      """
    And a file "schema.sql" with content
      """
      SELECT id,name,email FROM users WHERE active=true ORDER BY name
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
  Scenario: auto-install
    Given a file "schema.sql" with content
      """
      SELECT id,name,email FROM users WHERE active=true ORDER BY name
      """
    When executing "tricorder check"
    Then it prints:
      """
      1 SQL
      running 1 tools
      SQL (sqlfmt)
      schema.sql failed formatting check.
      """
    And the exit code is 1
    And file "run-that-app" now matches
      """
      # more info at https://github.com/kevgo/run-that-app

      uv \d+\.\d+\.\d+
      """
    And file "schema.sql" is unchanged

  Scenario Outline: unsupported SQL flavors
    Given a file "migration.<FILE EXTENSION>" with content
      """
      CREATE TABLE orders (id INT, total DECIMAL(10,2));
      """
    When executing "tricorder check"
    Then it prints:
      """
      1 other
      """
    And the exit code is 0
    And file "migration.<FILE EXTENSION>" is unchanged

    Examples:
      | FILE EXTENSION |
      | pgsql          |
      | tsql           |
