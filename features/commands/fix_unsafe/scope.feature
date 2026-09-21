Feature: "trident fix-unsafe --scope" selects which files to fix

  Background:
    Given a Git repository
    And a committed file "run-that-app" with content
      """
      delete-empty-folders 0.0.2
      ruff 0.15.16
      """
    And a committed file "ruff.toml" with content
      """
      [lint]
      extend-select = ["B006"]
      """

  Scenario: --scope=uncommitted fixes only uncommitted files
    Given a committed file "committed.py" with content
      """
      def add_to_list(item, items=[]):
          items.append(item)
          return items
      """
    And a file "untracked.py" with content
      """
      def add_to_list(item, items=[]):
          items.append(item)
          return items
      """
    When executing "trident fix-unsafe --scope=uncommitted --show=output"
    Then it prints to STDERR
      """
      1 Python
      running 1 tools
      """
    And file "committed.py" is unchanged
    And file "untracked.py" now has content
      """
      def add_to_list(item, items=None):
          if items is None:
              items = []
          items.append(item)
          return items
      """
    And the exit code is 0
