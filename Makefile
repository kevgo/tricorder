RUN_THAT_APP_VERSION = 0.37.0  # run-that-app version to use

RTA      = tools/rta@$(RUN_THAT_APP_VERSION)
LEFTHOOK = $(RTA) lefthook
RUMDL    = $(RTA) rumdl
TAPLO    = $(RTA) taplo

fix: ${RTA}  # runs all linters and auto-fixes
	$(RUMDL) fmt
	$(TAPLO) format

lint: ${RTA}  # lints the main codebase concurrently
	$(RUMDL) check

setup-githooks: ${RTA}  ## installs a Git pre-commit hook that auto-formats code
	@$(LEFTHOOK) install

ps: test fix  ## pitstop

test: lint  ## runs all tests

update: ${RTA}  # updates all dependencies
	$(RTA) --update

# --- HELPER TARGETS --------------------------------------------------------------------------------------------------------------------------------

${RTA}:
	@rm -f tools/rta*
	@(cd tools && curl https://raw.githubusercontent.com/kevgo/run-that-app/main/download.sh | sh -s -- --version ${RUN_THAT_APP_VERSION} --name rta@${RUN_THAT_APP_VERSION})
	@ln -s rta@${RUN_THAT_APP_VERSION} tools/rta

.DEFAULT_GOAL := test
.SILENT:
