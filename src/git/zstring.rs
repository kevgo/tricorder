/// a zero-delimited string, as produced by Git `-z`
#[derive(Clone, Debug, Eq, PartialEq)]
pub(crate) struct ZString(String);

impl ZString {
    /// splits into NUL-delimited records, omitting empty entries
    pub(crate) fn lines(&self) -> impl Iterator<Item = &str> {
        self.0.split('\0').filter(|line| !line.is_empty())
    }
}

impl From<&str> for ZString {
    fn from(value: &str) -> Self {
        Self(value.to_owned())
    }
}

impl From<String> for ZString {
    fn from(value: String) -> Self {
        Self(value)
    }
}

#[cfg(test)]
mod tests {

    mod lines {
        use crate::git::ZString;

        #[test]
        fn splits_on_nul() {
            let give = ZString::from("a\0b\0c");
            let have: Vec<&str> = give.lines().collect();
            pretty::assert_eq!(have, vec!["a", "b", "c"]);
        }

        #[test]
        fn skips_empty_lines() {
            pretty::assert_eq!(
                ZString::from("").lines().collect::<Vec<_>>(),
                Vec::<&str>::new()
            );
            pretty::assert_eq!(
                ZString::from("\0").lines().collect::<Vec<_>>(),
                Vec::<&str>::new()
            );
            pretty::assert_eq!(
                ZString::from("a\0\0b\0").lines().collect::<Vec<_>>(),
                vec!["a", "b"]
            );
        }
    }
}
