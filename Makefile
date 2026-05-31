RUN_THAT_APP_VERSION = 0.37.0  # run-that-app version to use

RTA    = tools/rta@$(RTA_VERSION)
RUMDL  = $(RTA) rumdl
TAPLO  = $(RTA) taplo

fix: ${RTA}  # runs all linters and auto-fixes
	$(RUMDL) fmt
	$(DPRINT) fmt
	$(TAPLO) fmt

lint: node_modules ${RTA}  # lints the main codebase concurrently
	$(RUMDL) check

update: ${RTA}  # updates all dependencies
	$(RTA) --update
	$(DPRINT) config update

# --- HELPER TARGETS --------------------------------------------------------------------------------------------------------------------------------

${RTA}:
	@rm -f tools/rta*
	@(cd tools && curl https://raw.githubusercontent.com/kevgo/run-that-app/main/download.sh | sh -s -- --version ${RTA_VERSION} --name rta@${RTA_VERSION})
	@ln -s rta@${RTA_VERSION} tools/rta

.DEFAULT_GOAL := help
.SILENT:
