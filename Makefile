RUN_THAT_APP_VERSION = 0.37.0  # run-that-app version to use

RTA      = tools/rta@$(RUN_THAT_APP_VERSION)
LEFTHOOK = $(RTA) lefthook
RUMDL    = $(RTA) rumdl
TAPLO    = $(RTA) taplo

build:  # builds the codebase
	rm -rf tmp
	cargo build

cuke: build  # runs all end-to-end tests
	cargo test --test=cucumber

fix: ${RTA}  # runs all linters and auto-fixes
	cargo +nightly fix --allow-dirty
	cargo clippy --fix --allow-dirty
	cargo +nightly fmt
	$(RUMDL) fmt
	$(TAPLO) format

help:  # prints all available targets
	@grep -h -E '^[a-zA-Z_-]+:.*?# .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?# "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

lint: ${RTA}  # lints the main codebase concurrently
	cargo clippy --all-targets --all-features -- --deny=warnings
	$(RUMDL) check
	$(TAPLO) check

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

.DEFAULT_GOAL := help
.SILENT:
