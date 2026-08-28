/// A string whose lines are separated by the NUL character.
#[derive(Clone, Debug, Eq, PartialEq)]
pub(crate) struct ZeroString(String);

impl From<String> for ZeroString {
    fn from(value: String) -> Self {
        Self(value)
    }
}

impl From<&str> for ZeroString {
    fn from(value: &str) -> Self {
        Self(value.to_string())
    }
}

impl From<&Vec<u8>> for ZeroString {
    fn from(value: &Vec<u8>) -> Self {
        let text = String::from_utf8_lossy(value);
        Self::from(text.to_string())
    }
}

impl ZeroString {
    /// emits all non-empty lines
    pub(crate) fn lines(&self) -> impl Iterator<Item = &str> {
        self.0.split('\0').filter(|line| !line.is_empty())
    }
}

#[cfg(test)]
mod tests {
    mod lines {
        use super::super::ZeroString;

        #[test]
        fn splits_on_nul() {
            let give = ZeroString::from("a\0b\0c");
            let have: Vec<&str> = give.lines().collect();
            pretty::assert_eq!(have, vec!["a", "b", "c"]);
        }

        #[test]
        fn skips_empty_entries() {
            pretty::assert_eq!(
                ZeroString::from("").lines().collect::<Vec<_>>(),
                Vec::<&str>::new()
            );
            pretty::assert_eq!(
                ZeroString::from("\0").lines().collect::<Vec<_>>(),
                Vec::<&str>::new()
            );
            pretty::assert_eq!(
                ZeroString::from("a\0\0b\0").lines().collect::<Vec<_>>(),
                vec!["a", "b"]
            );
        }
    }
}
