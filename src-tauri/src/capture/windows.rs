use super::{is_new_text, should_restore};
use arboard::{Clipboard, ImageData};
use std::{
    thread,
    time::{Duration, Instant},
};
use windows::Win32::{
    Foundation::HWND,
    System::DataExchange::GetClipboardSequenceNumber,
    UI::{
        Input::KeyboardAndMouse::{
            GetAsyncKeyState, SendInput, INPUT, INPUT_0, INPUT_KEYBOARD, KEYBDINPUT,
            KEYEVENTF_KEYUP, VK_C, VK_CONTROL, VK_LWIN, VK_MENU, VK_RWIN, VK_SHIFT,
        },
        WindowsAndMessaging::GetForegroundWindow,
    },
};

fn current_foreground() -> HWND {
    unsafe { GetForegroundWindow() }
}

pub fn foreground() -> Result<HWND, String> {
    Ok(current_foreground())
}

struct ClipboardSnapshot {
    text: Option<String>,
    image: Option<ImageData<'static>>,
}

fn snapshot() -> ClipboardSnapshot {
    match Clipboard::new() {
        Ok(mut clipboard) => ClipboardSnapshot {
            text: clipboard.get_text().ok(),
            image: clipboard.get_image().ok(),
        },
        Err(_) => ClipboardSnapshot {
            text: None,
            image: None,
        },
    }
}

fn restore(snapshot: ClipboardSnapshot, expected_sequence: u32) {
    if !should_restore(expected_sequence, unsafe { GetClipboardSequenceNumber() }) {
        return;
    }
    let Ok(mut clipboard) = Clipboard::new() else {
        return;
    };
    if !should_restore(expected_sequence, unsafe { GetClipboardSequenceNumber() }) {
        return;
    }
    if let Some(image) = snapshot.image {
        let _ = clipboard.set_image(image);
    } else if let Some(text) = snapshot.text {
        let _ = clipboard.set_text(text);
    }
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
    if source.0.is_null() || current_foreground() != source {
        return Err("阅读器焦点已改变，请重新选择后取词".into());
    }
    let previous = snapshot();
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
        if current_foreground() != source {
            return Err("取词期间阅读器焦点已改变".into());
        }
        let sequence = unsafe { GetClipboardSequenceNumber() };
        if sequence != before {
            if let Ok(text) = Clipboard::new().and_then(|mut clipboard| clipboard.get_text()) {
                let after = unsafe { GetClipboardSequenceNumber() };
                if after != sequence {
                    return Err("剪贴板再次变化，请重新取词".into());
                }
                if !is_new_text(before, after, &text) {
                    return Err("选区没有文字".into());
                }
                restore(previous, after);
                return Ok(text);
            }
        }
        if Instant::now() >= deadline {
            return Err("没有新的可复制文本；请确认选区，扫描 PDF 暂不支持取词".into());
        }
        thread::sleep(Duration::from_millis(20));
    }
}
