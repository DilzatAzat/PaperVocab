use arboard::Clipboard;
use std::{
    thread,
    time::{Duration, Instant},
};
use windows::Win32::{
    Foundation::HWND,
    System::DataExchange::{GetClipboardOwner, GetClipboardSequenceNumber},
    UI::{
        Input::KeyboardAndMouse::{
            GetAsyncKeyState, SendInput, INPUT, INPUT_0, INPUT_KEYBOARD, KEYBDINPUT,
            KEYEVENTF_KEYUP, VK_C, VK_CONTROL, VK_LWIN, VK_MENU, VK_RWIN, VK_SHIFT,
        },
        WindowsAndMessaging::{GetForegroundWindow, GetWindowThreadProcessId},
    },
};

pub fn foreground() -> HWND {
    unsafe { GetForegroundWindow() }
}

pub fn is_new_text(before: u32, after: u32, text: &str) -> bool {
    before != after && !text.trim().is_empty()
}

pub fn selection(source: HWND) -> Result<String, String> {
    let deadline = Instant::now() + Duration::from_secs(2);
    // Never synthesize Ctrl+C while physical shortcut modifiers are held.
    while [VK_CONTROL, VK_SHIFT, VK_MENU, VK_LWIN, VK_RWIN]
        .iter()
        .any(|key| unsafe { GetAsyncKeyState(key.0 as i32) } < 0)
    {
        if Instant::now() >= deadline {
            return Err("请松开快捷键后再试".into());
        }
        thread::sleep(Duration::from_millis(15));
    }
    if source.0.is_null() || foreground() != source {
        return Err("阅读器焦点已改变，请重新选择后取词".into());
    }
    let before = unsafe { GetClipboardSequenceNumber() };
    let key = |vk, up| INPUT {
        r#type: INPUT_KEYBOARD,
        Anonymous: INPUT_0 {
            ki: KEYBDINPUT {
                wVk: vk,
                dwFlags: if up {
                    KEYEVENTF_KEYUP
                } else {
                    Default::default()
                },
                ..Default::default()
            },
        },
    };
    let inputs = [
        key(VK_CONTROL, false),
        key(VK_C, false),
        key(VK_C, true),
        key(VK_CONTROL, true),
    ];
    if unsafe { SendInput(&inputs, std::mem::size_of::<INPUT>() as i32) } != 4 {
        return Err("复制操作被系统拒绝；请让阅读器和 PaperVocab 以相同权限运行".into());
    }
    let deadline = Instant::now() + Duration::from_millis(900);
    loop {
        if foreground() != source {
            return Err("取词期间阅读器焦点已改变".into());
        }
        let sequence = unsafe { GetClipboardSequenceNumber() };
        if sequence != before {
            let owner = unsafe { GetClipboardOwner() }.map_err(|_| "无法确认剪贴板来源")?;
            let mut source_pid = 0;
            let mut owner_pid = 0;
            unsafe {
                GetWindowThreadProcessId(source, Some(&mut source_pid));
                GetWindowThreadProcessId(owner, Some(&mut owner_pid));
            }
            if owner_pid != source_pid {
                return Err("取词期间剪贴板被其他程序更新，请重试".into());
            }
            if let Ok(text) = Clipboard::new().and_then(|mut clipboard| clipboard.get_text()) {
                let after = unsafe { GetClipboardSequenceNumber() };
                if after != sequence {
                    return Err("剪贴板再次变化，请重新取词".into());
                }
                if !is_new_text(before, after, &text) {
                    return Err("选区没有文字".into());
                }
                return Ok(text);
            }
        }
        if Instant::now() >= deadline {
            return Err("没有新的可复制文本；请确认选区，扫描 PDF 暂不支持取词".into());
        }
        thread::sleep(Duration::from_millis(20));
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    #[test]
    fn old_clipboard_is_never_accepted() {
        assert!(!is_new_text(10, 10, "old text"));
        assert!(!is_new_text(10, 11, "  "));
        assert!(is_new_text(u32::MAX, 0, "new selection"));
    }
}
