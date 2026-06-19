RUN_THAT_APP_VERSION = 0.37.0  # run-that-app version to use

RTA          = tools/rta@$(RUN_THAT_APP_VERSION)
CONTEST      = $(RTA) contest
GHERKIN_LINT = $(NPM) exec --yes gherkin-lint
GHOKIN       = $(RTA) ghokin
KEEPSORTED   = $(RTA) keep-sorted
LEFTHOOK     = $(RTA) lefthook
NPM          = $(RTA) npm
RUMDL        = $(RTA) rumdl
TAPLO        = $(RTA) taplo

build:  # builds the codebase
	rm -rf tmp
	cargo build

build-release:	# builds the codebase in release mode
	rm -rf tmp
	cargo build --release

contest: ${RTA}
	$(CONTEST)

cuke: build-release ${RTA}  # runs all end-to-end tests
	$(RTA) --install rumdl@0.2.14
	$(RTA) --install delete-empty-folders@0.0.2
	$(RTA) --install prettier-standalone@0.24.0
	$(RTA) uv@0.11.20 tool run --from shandy-sqlfmt sqlfmt 2> /dev/null
	cargo test --test=cuke -- -t "not @online"

cuke-update: build-release ${RTA}  # updates the end-to-end tests
	TRICORDER_UPDATE_SNAPSHOTS=1 cargo test --test=cuke

cuke-all: build-release ${RTA}  # runs the online end-to-end tests
	cargo test --test=cuke

cukethis: build-release ${RTA}  # runs only end-to-end tests with a @this tag
	cargo test --test=cuke -- -t @this

.PHONY: demo
demo:  # runs Tricorder in the "demo" folder
	cargo build --release --quiet
	(cd demo && ../target/release/tricorder check)

install:
	cargo install --path . --locked

fix: ${RTA}  # runs all linters and auto-fixes
	cargo +nightly fix --allow-dirty
	cargo clippy --fix --allow-dirty
	cargo +nightly fmt
	$(RUMDL) fmt
	$(TAPLO) format
	make --no-print-directory ghokin
	make --no-print-directory keep-sorted

ghokin: ${RTA}  # format the Cucumber tests
	${GHOKIN} fmt replace features/

help:  # prints all available targets
	grep -h -E '^[a-zA-Z_-]+:.*?# .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?# "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

keep-sorted: ${RTA}
	$(RTA) --install ripgrep
	$(KEEPSORTED) $(shell $(RTA) ripgrep -l --hidden 'keep-sorted end' ./ --glob '!{.git,Makefile}')

lint: ${RTA}  # lints the main codebase concurrently
	cargo clippy --all-targets --all-features -- --deny=warnings
	cargo clippy --test=cuke --all-features -- --deny=warnings
	$(RUMDL) check
	${GHERKIN_LINT}
	# $(TAPLO) check  # current version has a bug with Cargo.toml, see https://github.com/rust-lang/cargo/issues/15030

setup: setup-ci  # install development dependencies on this computer
	cargo install cargo-machete --locked

setup-ci:
	rustup component add clippy
	rustup toolchain add nightly
	rustup component add rustfmt --toolchain nightly

setup-githooks: ${RTA}  ## installs the Git pre-commit to auto-format
	$(LEFTHOOK) install

ps: test fix  ## pitstop

test: unit lint cuke  ## runs all tests

unit:  # runs the unit tests
	cargo test --locked
	cargo test -p test_helpers

update: ${RTA}  # updates all dependencies
	cargo install cargo-edit cargo-machete
	cargo machete
	cargo upgrade
	$(RTA) --update

# --- HELPER TARGETS --------------------------------------------------------------------------------------------------------------------------------

${RTA}:
	rm -f tools/rta*
	(cd tools && curl https://raw.githubusercontent.com/kevgo/run-that-app/main/download.sh | sh -s -- --version ${RUN_THAT_APP_VERSION} --name rta@${RUN_THAT_APP_VERSION})
	ln -s rta@$(RUN_THAT_APP_VERSION) tools/rta


.DEFAULT_GOAL := help
.SILENT:
