use crate::stacks::{Checker, Tool};

pub struct Ruff;

impl Tool for Ruff {
    fn name(&self) -> &'static str {
        "ruff"
    }
}

impl Checker for Ruff {
    fn check_command(&self, apps: &rta::applications::Apps) -> conc::Executable {
        let ruff = rta::applications::Ruff {};
        let command = rta::get_cmd(
            &ruff,
            rta::GetCmdArgs {
                app_args: vec!["format".into(), "--check".into(), "--quiet".into()],
                version: None,
                from_source: false,
                include_apps: vec![],
                optional: false,
                verbose: false,
            },
            apps,
        )
        .unwrap()
        .unwrap();
        conc::Executable {
            name: "ruff --check".into(),
            command,
        }
    }
}
