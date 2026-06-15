Feature: check SQL

  Background:
    Given a file "run-that-app" with content
      """
      uv 0.11.20
      """

  Scenario: valid SQL
    Given a file "one.sql" with content
      """
      select id, name from one
      """
    Given a file "two.sql" with content
      """
      select id, name from two
      """
    When executing "tricorder check --show=all"
    Then it prints the block
      """
      SQL (sqlfmt)
      2 files passed formatting check.
      """
    And the exit code is 0
    And file "one.sql" is unchanged
    And file "two.sql" is unchanged

  Scenario: unformatted SQL
    Given a file "one.sql" with content
      """
      SELECT            id, name FROM one
      """
    Given a file "two.sql" with content
      """
      SELECT            id, name FROM two
      """
    When executing "tricorder check --show=all"
    Then it prints the block
      """
      SQL (sqlfmt)
      2 files failed formatting check.
      0 files passed formatting check.
      one.sql failed formatting check.
      two.sql failed formatting check.
      """
    And the exit code is 1
    And file "one.sql" is unchanged
    And file "two.sql" is unchanged

  Scenario: invalid SQL
    Given a file "one.sql" with content
      """
      SELECT FROM "
      """
    Given a file "two.sql" with content
      """
      SELECT FROM "
      """
    When executing "tricorder check --show=all"
    Then it prints the block
      """
      SQL (sqlfmt)
      2 files had errors while formatting.
      0 files passed formatting check.
      one.sql
          sqlfmt encountered an error: Could not parse SQL at position 11: '"'
      two.sql
          sqlfmt encountered an error: Could not parse SQL at position 11: '"'
      """
    And the exit code is 2
    And file "one.sql" is unchanged
    And file "two.sql" is unchanged

  Scenario Outline: unsupported SQL flavors
    Given a file "migration.<FILE EXTENSION>" with content
      """
      CREATE TABLE orders (id INT, total DECIMAL(10,2));
      """
    When executing "tricorder check --show=all"
    Then it prints to STDERR
      """
      no stacks found
      """
    And the exit code is 0
    And file "migration.<FILE EXTENSION>" is unchanged

    Examples:
      | FILE EXTENSION |
      | pgsql          |
      | tsql           |
