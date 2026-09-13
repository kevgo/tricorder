Feature: lint Dockerfile

  Background:
    Given a file "run-that-app" with content
      """
      delete-empty-folders 0.0.2
      hadolint 2.15.1
      """

  Scenario: valid Dockerfile
    Given a file "Dockerfile" with content
      """
      FROM alpine:3.20
      USER 65534
      """
    When executing "tricorder lint --show=all"
    Then it prints the lines
      """
      lint Dockerfile (hadolint)
      """
    And the exit code is 0
    And file "Dockerfile" is unchanged

  Scenario: invalid Dockerfile
    Given a file "Dockerfile" with content
      """
      FROM alpine:3.20
      WORKDIR tmp
      """
    And a file "subdir/Dockerfile" with content
      """
      FROM alpine:3.20
      WORKDIR other
      """
    When executing "tricorder lint --show=all"
    Then it prints the lines
      """
      lint Dockerfile (hadolint)
      Dockerfile:2 DL3000 error: Use absolute WORKDIR
      """
    And it prints the lines
      """
      subdir/Dockerfile:2 DL3000 error: Use absolute WORKDIR
      """
    And the exit code is 1
    And file "Dockerfile" is unchanged
    And file "subdir/Dockerfile" is unchanged
