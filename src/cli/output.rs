use crate::domain::DetectedStacks;
use itertools::Itertools;
use std::process::Command;

pub fn print_metadata(stacks: &DetectedStacks) {
    let mut texts = Vec::with_capacity(stacks.len());
    for stack in stacks {
        texts.push(format!("{} {}", stack.files.len(), stack.stack));
    }
    if texts.is_empty() {
        return;
    }
    eprintln!("{}", texts.iter().join(", "));
}

/// appends the full command line to the name of each executable in the given runnables
pub fn add_command_details(runnables: &mut [conc::Runnable]) {
    for runnable in runnables {
        match runnable {
            conc::Runnable::Single(executable) => {
                executable.name = format!(
                    "{}\n  {}",
                    executable.name,
                    command_line(&executable.command)
                );
            }
            conc::Runnable::Sequence(executables) => {
                for executable in executables {
                    executable.name = format!(
                        "{}\n  {}",
                        executable.name,
                        command_line(&executable.command)
                    );
                }
            }
        }
    }
}

/// renders the program and arguments of the given command as a single line
fn command_line(command: &Command) -> String {
    let mut result = command.get_program().to_string_lossy().into_owned();
    for arg in command.get_args() {
        result.push(' ');
        result.push_str(&arg.to_string_lossy());
    }
    result
}

#[cfg(test)]
mod tests {

    mod command_line {
        use super::super::command_line;
        use std::process::Command;

        #[test]
        fn no_args() {
            let command = Command::new("biome");
            let have = command_line(&command);
            assert_eq!(have, "biome");
        }

        #[test]
        fn with_args() {
            let mut command = Command::new("biome");
            command.arg("lint").arg("main.css");
            let have = command_line(&command);
            assert_eq!(have, "biome lint main.css");
        }
    }

    mod add_command_details {
        use super::super::add_command_details;
        use std::process::Command;

        #[test]
        fn sequence() {
            let mut command1 = Command::new("biome");
            command1.arg("lint").arg("main.css");
            let mut command2 = Command::new("ruff");
            command2.arg("check").arg("main.py");
            let mut runnables = vec![conc::Runnable::Sequence(vec![
                conc::Executable {
                    name: "lint CSS (Biome)".into(),
                    command: command1,
                },
                conc::Executable {
                    name: "lint Python (ruff)".into(),
                    command: command2,
                },
            ])];
            add_command_details(&mut runnables);
            let conc::Runnable::Sequence(executables) = &runnables[0] else {
                panic!("expected a sequence");
            };
            assert_eq!(
                executables[0].name,
                "lint CSS (Biome)\n  biome lint main.css"
            );
            assert_eq!(
                executables[1].name,
                "lint Python (ruff)\n  ruff check main.py"
            );
        }
    }
}
