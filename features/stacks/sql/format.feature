Feature: format SQL

  Scenario: formats .sql files
    And a file "schema.sql" with content
      """
      SELECT id,name,email FROM users WHERE active=true ORDER BY name
      """
    When executing "tricorder format"
    Then it prints the lines
      """
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
    Then it prints the lines
      """
      1 other
      """
    And the exit code is 0
    And file "migration.<FILE EXTENSION>" is unchanged

    Examples:
      | FILE EXTENSION |
      | pgsql          |
      | tsql           |

  @online
  Scenario: auto-install
    Given a file "schema.sql" with content
      """
      SELECT id,name,email FROM users WHERE active=true ORDER BY name
      """
    When executing "tricorder format"
    Then it prints the lines
      """
      Talking to GitHub API (https://api.github.com/repos/astral-sh/uv/releases/latest) ... ok
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
    And file "run-that-app" now matches
      """
      # more info at https://github.com/kevgo/run-that-app

      uv \d+\.\d+\.\d+
      """
