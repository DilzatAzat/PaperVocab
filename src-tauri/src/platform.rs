use serde::Serialize;

#[cfg(target_os = "macos")]
pub const DEFAULT_SHORTCUT: &str = "SUPER+SHIFT+L";
#[cfg(target_os = "windows")]
pub const DEFAULT_SHORTCUT: &str = "CTRL+SHIFT+L";

#[derive(Serialize)]
pub struct PlatformInfo {
    pub os: &'static str,
    pub default_shortcut: &'static str,
    pub copy_shortcut: &'static str,
    pub credential_store: &'static str,
    pub accessibility_required: bool,
    pub accessibility_granted: bool,
}

impl PlatformInfo {
    pub fn for_os(os: &str, accessibility_granted: bool) -> Self {
        if os == "macos" {
            Self {
                os: "macos",
                default_shortcut: "SUPER+SHIFT+L",
                copy_shortcut: "⌘C",
                credential_store: "macOS 钥匙串（Keychain）",
                accessibility_required: true,
                accessibility_granted,
            }
        } else {
            Self {
                os: "windows",
                default_shortcut: "CTRL+SHIFT+L",
                copy_shortcut: "Ctrl+C",
                credential_store: "Windows 凭据管理器",
                accessibility_required: false,
                accessibility_granted: true,
            }
        }
    }
}

pub fn require_main_label(label: &str) -> Result<(), String> {
    if label == "main" {
        Ok(())
    } else {
        Err("此操作只能从 PaperVocab 主窗口执行".into())
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn permission_state_is_reported_without_changing_platform_defaults() {
        let denied = PlatformInfo::for_os("macos", false);
        assert_eq!(denied.default_shortcut, "SUPER+SHIFT+L");
        assert!(denied.accessibility_required);
        assert!(!denied.accessibility_granted);
        assert!(PlatformInfo::for_os("macos", true).accessibility_granted);
        let windows = PlatformInfo::for_os("windows", false);
        assert_eq!(windows.default_shortcut, "CTRL+SHIFT+L");
        assert!(!windows.accessibility_required);
        assert!(windows.accessibility_granted);
    }

    #[test]
    fn system_actions_require_main_window() {
        assert!(require_main_label("main").is_ok());
        assert!(require_main_label("capture").is_err());
        assert!(require_main_label("external").is_err());
    }
}
