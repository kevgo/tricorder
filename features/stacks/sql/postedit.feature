Feature: postedit SQL

  Background:
    Given a Git repository
    And a committed file "run-that-app" with content
      """
      uv 0.11.20
      delete-empty-folders 0.0.2
      """

  Scenario: valid SQL
    Given a file "one.sql" with content
      """
      select id, name from one
      """
    And a file "two.sql" with content
      """
      select id, name from two
      """
    When executing "tricorder postedit --show=all"
    Then it prints the lines
      """
      lint Git (git diff HEAD --check)
      """
    And it does not print
      """
      lint SQL
      """
    And the exit code is 0
    And file "one.sql" is unchanged
    And file "two.sql" is unchanged

  Scenario: unformatted SQL
    Given a file "one.sql" with content
      """
      SELECT            id, name FROM one
      """
    When executing "tricorder postedit --show=all"
    Then it prints the lines
      """
      lint Git (git diff HEAD --check)
      """
    And it does not print
      """
      lint SQL
      """
    And the exit code is 0
    And file "one.sql" is unchanged

  Scenario: invalid SQL
    Given a file "one.sql" with content
      """
      SELECT FROM "
      """
    And a file "two.sql" with content
      """
      SELECT FROM "
      """
    When executing "tricorder postedit --show=all"
    Then it prints the lines
      """
      lint Git (git diff HEAD --check)
      """
    And it does not print
      """
      lint SQL
      """
    And the exit code is 0
    And file "one.sql" is unchanged
    And file "two.sql" is unchanged

  Scenario Outline: unsupported SQL flavors
    Given a file "migration.<FILE EXTENSION>" with content
      """
      CREATE TABLE orders (id INT, total DECIMAL(10,2));
      """
    When executing "tricorder postedit --show=all"
    Then it prints to STDERR
      """
      1 other
      running 1 tools
      """
    And the exit code is 0
    And file "migration.<FILE EXTENSION>" is unchanged

    Examples:
      | FILE EXTENSION |
      | pgsql          |
      | tsql           |
