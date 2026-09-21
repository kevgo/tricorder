Feature: full applies fixes and succeeds

  Scenario: formats unformatted files and exits 0
    Given a Git repository
    And a committed file "run-that-app" with content
      """
      delete-empty-folders 0.0.2
      ruff 0.15.16
      """
    And a committed file "main.py" with content
      """
      print(  "hello"  )
      """
    When executing "trident full --show=output"
    Then it prints the block
      """
      format Python (ruff)
      1 file reformatted
      """
    And file "main.py" now has content
      """
      print("hello")
      """
    And the exit code is 0
