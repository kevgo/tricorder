# Tricorder changelog

## 0.0.6 (2026-06-22)

- custom fixes

## 0.0.5 (2026-06-19)

- simplified config file format
- executes delete-empty-folders separately before the other fixers
  because it isn't stack specific

## 0.0.4 (2026-06-18)

- the new `tricorder precommit` command never fails even if the code is invalid
- now runs `pyright` for Python stacks,
  but only if file `pyrightconfig.json` exists
- updates `delete-empty-folders` to v0.0.2

## 0.0.3 (2026-06-17)

- Support for custom linters in `tricorder.toml`.
- Removed checking for formatting from `tricorder check`.
  Given that not all stacks support format checking,
  and there are custom formatters,
  the only way to guarantee correct formatting is to run `tricorder fix`.
- Renamed `tricorder format` to `tricorder fix` because it formats
  and also fixes code smells.
- `tricorder postgenerate` for running inside the agentic loop.
- `tricorder precommit` for running inside Git's precommit hook.

## 0.0.2 (2026-06-16)

- Ruff runs both the formatter and linter
- always runs the `delete-empty-folder` fixer

## 0.0.1 (2026-06-15)

- commands: check, format, init
- stacks: CSS, Cucumber, Go, Java, JSON, Markdown, Python, SQL, TOML, TypeScript
- tools: Biome, CheckStyle, Gherkin-Lint, Ghokin, Gofumpt, Golangci-Lint,
  Prettier, Ruff, Rumdl, Sqlfmt, Taplo
