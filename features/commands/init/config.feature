Feature: "tricorder init:config" writes the default config file

  Scenario: write tricorder.json into an empty project
    When executing "tricorder init:config"
    Then it prints
      """
      created tricorder.json
      """
    And it prints nothing to STDERR
    And the exit code is 0
    And file "tricorder.json" now has content
      """
      {
        // link to the JSON schema for this file,
        // for auto-complete in VSCode and compatible editors
        "$schema": "https://github.com/kevgo/tricorder/raw/refs/heads/main/docs/schema.json",

        // These files are invisible to Tricorder.
        "ignore-files": ["vendor/", "**/*.min.css"],

        // These tools always run.
        "global-lints": [
          { "command": "tools/lint_1.sh", "name": "custom lint 1" },
          { "command": "tools/lint_2.sh" }
        ],
        "global-fixes": [
          { "command": "tools/fix_1.sh", "name": "custom fix 1" },
          { "command": "tools/fix_2.sh" }
        ],

        // configure the supported software stacks
        "stacks": {
          "css": {},
          "cucumber": {},
          "dockerfile": {},
          "go": {},
          "java": {},
          "json": {},
          "jsonc": {},
          "markdown": {},
          "python": {
            "lint": {
              // additional lints for Python files
              "add": [
                {
                  "name": "mypy",
                  "command": "mypy .",
                }
              ]
            },
            "fix": {
              // additional fixes for Python files
              "add": [
                {
                  "name": "isort",
                  "command": "isort ."
                }
              ]
            }
          },
          "rust": {
            "lint": {
              // replace all built-in lints for Rust files with these ones
              "replace": [
                {
                  "name": "clippy",
                  "command": "cargo clippy --all-targets"
                }
              ]
            },
            "fix": {
              // replace all built-in fixes for Rust files with these ones
              "replace": [
                {
                  "name": "rustfmt",
                  "command": "cargo +nightly fmt"
                }
              ]
            }
          },
          "sql": {},
          "toml": {},
          "typescript": {},
          "unknown": {},
          "yml": {}
        },

        // configure the built-in tools
        //
        // Only applications that can receive file paths as CLI arguments have an "ignore-files" key.
        "applications": {
          "actionlint": { "enabled": true },
          "biome": { "enabled": true, "ignore-files": [] },
          "checkstyle": { "enabled": true },
          "delete_empty_folders": { "enabled": true },
          "dprint": { "enabled": false, "ignore-files": [] },
          "gherkin_lint": { "enabled": true, "ignore-files": [] },
          "ghokin": { "enabled": true, "ignore-files": [] },
          "git_diff_check": { "enabled": true },
          "gofumpt": { "enabled": true, "ignore-files": [] },
          "golangci_lint": { "enabled": true },
          // github.com/google/keep-sorted is disabled by default
          // because using it requires scanning the file content of all workspace files for markers.
          "keep-sorted": { "enabled": false, "ignore-files": [] },
          "prettier": { "enabled": true, "ignore-files": [] },
          "pyright": { "enabled": true, "ignore-files": [] },
          "ruff": { "enabled": true, "ignore-files": [] },
          "rumdl": { "enabled": true, "ignore-files": [] },
          "sqlfmt": { "enabled": true, "ignore-files": [] },
          "taplo": {
            // enable or disable the application
            "enabled": true,
            // files that Taplo should ignore altogtether
            "ignore-files": [],
            "operations": {
              "lint": {
                // enable or disable all Taplo lints
                "enabled": true,
                // Taplo won't lint these files
                "ignore-files": []
              },
              "fix": {
                // enable or disable all Taplo fixes
                "enabled": true,
                // Taplo won't fix these files
                "ignore-files": []
              }
            }
          },
          "text-runner": { "enabled": true },
          "tikibase": { "enabled": true }
        }
      }
      """

  Scenario Outline: existing config file
    Given a file "<FILENAME>" with content
      """
      existing
      """
    When executing "tricorder init:config"
    Then it prints
      """
      config file <FILENAME> already exists
      """
    And it prints nothing to STDERR
    And the exit code is 1
    And file "<FILENAME>" is unchanged

    Examples:
      | FILENAME        |
      | tricorder.json  |
      | tricorder.jsonc |

  Scenario Outline: force overwrites an existing config file
    Given a file "<FILENAME>" with content
      """
      existing
      """
    When executing "tricorder init:config <FLAG>"
    Then it prints
      """
      created <FILENAME>
      """
    And it prints nothing to STDERR
    And the exit code is 0
    And file "<FILENAME>" now has content
      """
      {
        // link to the JSON schema for this file,
        // for auto-complete in VSCode and compatible editors
        "$schema": "https://github.com/kevgo/tricorder/raw/refs/heads/main/docs/schema.json",

        // These files are invisible to Tricorder.
        "ignore-files": ["vendor/", "**/*.min.css"],

        // These tools always run.
        "global-lints": [
          { "command": "tools/lint_1.sh", "name": "custom lint 1" },
          { "command": "tools/lint_2.sh" }
        ],
        "global-fixes": [
          { "command": "tools/fix_1.sh", "name": "custom fix 1" },
          { "command": "tools/fix_2.sh" }
        ],

        // configure the supported software stacks
        "stacks": {
          "css": {},
          "cucumber": {},
          "dockerfile": {},
          "go": {},
          "java": {},
          "json": {},
          "jsonc": {},
          "markdown": {},
          "python": {
            "lint": {
              // additional lints for Python files
              "add": [
                {
                  "name": "mypy",
                  "command": "mypy .",
                }
              ]
            },
            "fix": {
              // additional fixes for Python files
              "add": [
                {
                  "name": "isort",
                  "command": "isort ."
                }
              ]
            }
          },
          "rust": {
            "lint": {
              // replace all built-in lints for Rust files with these ones
              "replace": [
                {
                  "name": "clippy",
                  "command": "cargo clippy --all-targets"
                }
              ]
            },
            "fix": {
              // replace all built-in fixes for Rust files with these ones
              "replace": [
                {
                  "name": "rustfmt",
                  "command": "cargo +nightly fmt"
                }
              ]
            }
          },
          "sql": {},
          "toml": {},
          "typescript": {},
          "unknown": {},
          "yml": {}
        },

        // configure the built-in tools
        //
        // Only applications that can receive file paths as CLI arguments have an "ignore-files" key.
        "applications": {
          "actionlint": { "enabled": true },
          "biome": { "enabled": true, "ignore-files": [] },
          "checkstyle": { "enabled": true },
          "delete_empty_folders": { "enabled": true },
          "dprint": { "enabled": false, "ignore-files": [] },
          "gherkin_lint": { "enabled": true, "ignore-files": [] },
          "ghokin": { "enabled": true, "ignore-files": [] },
          "git_diff_check": { "enabled": true },
          "gofumpt": { "enabled": true, "ignore-files": [] },
          "golangci_lint": { "enabled": true },
          // github.com/google/keep-sorted is disabled by default
          // because using it requires scanning the file content of all workspace files for markers.
          "keep-sorted": { "enabled": false, "ignore-files": [] },
          "prettier": { "enabled": true, "ignore-files": [] },
          "pyright": { "enabled": true, "ignore-files": [] },
          "ruff": { "enabled": true, "ignore-files": [] },
          "rumdl": { "enabled": true, "ignore-files": [] },
          "sqlfmt": { "enabled": true, "ignore-files": [] },
          "taplo": {
            // enable or disable the application
            "enabled": true,
            // files that Taplo should ignore altogtether
            "ignore-files": [],
            "operations": {
              "lint": {
                // enable or disable all Taplo lints
                "enabled": true,
                // Taplo won't lint these files
                "ignore-files": []
              },
              "fix": {
                // enable or disable all Taplo fixes
                "enabled": true,
                // Taplo won't fix these files
                "ignore-files": []
              }
            }
          },
          "text-runner": { "enabled": true },
          "tikibase": { "enabled": true }
        }
      }
      """

    Examples:
      | FILENAME        | FLAG    |
      | tricorder.json  | --force |
      | tricorder.json  | -f      |
      | tricorder.jsonc | --force |
      | tricorder.jsonc | -f      |
