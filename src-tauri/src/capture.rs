#[cfg(target_os = "windows")]
mod windows;
#[cfg(target_os = "windows")]
pub use windows::{foreground, selection};

#[cfg(target_os = "macos")]
mod macos;
#[cfg(target_os = "macos")]
pub use macos::{accessibility_granted, foreground, request_accessibility, selection};

// Windows uses a wrapping u32 sequence; macOS uses an NSInteger change count.
// Only equality matters, so neither platform may accept unchanged clipboard text.
fn is_new_text<T: PartialEq>(before: T, after: T, text: &str) -> bool {
    before != after && !text.trim().is_empty()
}

fn should_restore<T: PartialEq>(expected_sequence: T, current_sequence: T) -> bool {
    expected_sequence == current_sequence
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn old_clipboard_is_never_accepted() {
        assert!(!is_new_text(10_u32, 10, "old text"));
        assert!(!is_new_text(10_u32, 11, "  "));
        assert!(is_new_text(u32::MAX, 0, "new selection"));
        assert!(!is_new_text(10_isize, 10, "old macOS text"));
        assert!(is_new_text(isize::MAX, isize::MIN, "new macOS selection"));
    }

    #[test]
    fn clipboard_is_restored_only_when_sequence_is_stable() {
        assert!(should_restore(22_u32, 22));
        assert!(!should_restore(22_u32, 23));
        // Never truncate macOS counters to Windows' u32 representation.
        assert!(!should_restore(22_i64, 22 + (1_i64 << 32)));
    }
}
