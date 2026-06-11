Feature: format SQL

  Scenario: formats .sql files
    And a file "schema.sql" with content
      """
      SELECT id,name,email FROM users WHERE active=true ORDER BY name
      """
    When executing "tricorder format"
    Then it prints:
      """
      1 SQL
      running 1 tools
      SQL (sqlfmt)
      1 file formatted.
      0 files left unchanged.
      schema.sql formatted.
      """
    And the exit code is 0
    And file "schema.sql" now has content
      """
      select id, name, email from users where active = true order by name
      """

  Scenario Outline: does not format other SQL flavors
    Given a file "migration.<FILE EXTENSION>" with content
      """
      CREATE TABLE orders (id INT,total DECIMAL(10,2));
      """
    When executing "tricorder format"
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
