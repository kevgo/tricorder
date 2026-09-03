RUN_THAT_APP_VERSION = 0.42.1  # run-that-app version to use

RTA          = tools/rta@$(RUN_THAT_APP_VERSION)
CONTEST      = $(RTA) contest
GHOKIN       = $(RTA) ghokin
TRICORDER    = target/debug/tricorder

build:  # builds the project in debug mode
	cargo build

build-release:	# builds the project in release mode
	cargo build --release

contest: ${RTA}
	$(CONTEST)

cuke: build-release ${RTA}  # runs all end-to-end tests
	cargo test --test=cuke -- -t "not @online"

cuke-slow: build-release ${RTA}  # runs the end-to-end tests one by one
	cargo test --test=cuke -- -t "not @online" --concurrency 1

cuke-update: build-release ${RTA}  # updates the golden snapshots in the end-to-end tests
	TRICORDER_UPDATE_SNAPSHOTS=1 cargo test --test=cuke -- --concurrency 1

cuke-all: build-release ${RTA}  # runs all end-to-end tests including the ones making network calls
	cargo test --test=cuke -- --concurrency 1

cukethis: build-release ${RTA}  # runs only end-to-end tests tagged with @this
	cargo test --test=cuke -- -t @this

.PHONY: demo
demo:  # runs Tricorder in the "demo" folder
	cargo build --release --quiet
	(cd demo && ../target/release/tricorder lint)

install:  # installs Tricorder into the global path
	cargo install --path . --locked

fix: build ${RTA} ${TRICORDER}  # corrects all auto-fixable issues
	$(TRICORDER) fix --show=names

ghokin: ${RTA}  # format the Cucumber files
	${GHOKIN} fmt replace features/

help:  # prints all available targets
	grep -h -E '^[a-zA-Z_-]+:.*?# .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?# "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

lint: build ${RTA} ${TRICORDER}  # runs all linters
	$(TRICORDER) lint --show=names

setup: setup-ci  # install development dependencies on this computer
	cargo install cargo-machete cargo-nextest --locked

setup-ci:  # installs the necessary tools for the CI pipeline
	rustup component add clippy
	rustup toolchain add nightly
	rustup component add rustfmt --toolchain nightly

ps: unit $(TRICORDER)
	$(TRICORDER) pitstop

psa: test fix  ## pitstop, run during active development

test: unit lint cuke  ## runs all tests

unit:  # runs the unit tests
	cargo nextest run --locked --workspace --status-level fail

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
