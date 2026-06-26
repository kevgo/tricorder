# Making a release

- in a branch:
  - update [CHANGELOG.md](../CHANGELOG.md)
  - update all occurrences of `0.0.10`
  - ship into `main`
- create a new tag:

  ```bash
  git sync --all && git checkout main && git tag v0.0.10 && git push --tags
  ```

- the CI server creates the release fully automatically
