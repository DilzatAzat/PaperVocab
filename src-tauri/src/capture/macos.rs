use super::{is_new_text, should_restore};
use arboard::{Clipboard, ImageData};
use core_foundation::{
    base::{CFType, CFTypeRef, TCFType},
    boolean::CFBoolean,
    dictionary::CFDictionary,
    string::{CFString, CFStringRef},
};
use core_graphics::{
    event::{CGEvent, CGEventFlags, CGEventTapLocation},
    event_source::{CGEventSource, CGEventSourceStateID},
};
use objc2::rc::autoreleasepool;
use objc2_app_kit::NSPasteboard;
use std::{
    ffi::c_void,
    ptr, thread,
    time::{Duration, Instant},
};

// Public Accessibility APIs. Their Create/Copy results follow CF ownership rules.
#[link(name = "ApplicationServices", kind = "framework")]
extern "C" {
    fn AXIsProcessTrusted() -> u8;
    fn AXIsProcessTrustedWithOptions(options: *const c_void) -> u8;
    static kAXTrustedCheckOptionPrompt: CFStringRef;
    fn AXUIElementCreateSystemWide() -> CFTypeRef;
    fn AXUIElementCopyAttributeValue(
        element: CFTypeRef,
        attribute: CFStringRef,
        value: *mut CFTypeRef,
    ) -> i32;
    fn AXUIElementGetPid(element: CFTypeRef, pid: *mut i32) -> i32;
    fn AXUIElementGetTypeID() -> usize;
}

#[link(name = "CoreGraphics", kind = "framework")]
extern "C" {
    fn CGEventSourceKeyState(state_id: i32, key: u16) -> bool;
}

pub fn accessibility_granted() -> bool {
    // This query does not display a permission dialog.
    unsafe { AXIsProcessTrusted() != 0 }
}

pub fn request_accessibility() -> bool {
    let prompt_key = unsafe { CFString::wrap_under_get_rule(kAXTrustedCheckOptionPrompt) };
    let options = CFDictionary::from_CFType_pairs(&[(prompt_key, CFBoolean::true_value())]);
    unsafe { AXIsProcessTrustedWithOptions(options.as_concrete_TypeRef().cast()) != 0 }
}

pub struct Source {
    pid: i32,
    window: CFType,
}

fn owned_ax(value: CFTypeRef) -> Result<CFType, String> {
    if value.is_null() {
        return Err("无法读取阅读器焦点，请重新选择后取词".into());
    }
    // Each input is exclusively a Create/Copy-owned reference, released by CFType.
    let value = unsafe { CFType::wrap_under_create_rule(value) };
    if value.type_of() != unsafe { AXUIElementGetTypeID() } {
        return Err("阅读器没有可访问的选区窗口，请使用手动收词".into());
    }
    Ok(value)
}

fn focused_attribute(element: &CFType, name: &str) -> Result<CFType, String> {
    let attribute = CFString::new(name);
    let mut value = ptr::null();
    let error = unsafe {
        AXUIElementCopyAttributeValue(
            element.as_CFTypeRef(),
            attribute.as_concrete_TypeRef(),
            &mut value,
        )
    };
    if error != 0 {
        return Err("无法读取阅读器焦点；请确认辅助功能授权，或使用手动收词".into());
    }
    owned_ax(value)
}

pub fn foreground() -> Result<Source, String> {
    if !accessibility_granted() {
        return Err("取词需要辅助功能权限；请在 PaperVocab 设置中授权后重试".into());
    }
    let system = owned_ax(unsafe { AXUIElementCreateSystemWide() })?;
    let application = focused_attribute(&system, "AXFocusedApplication")?;
    let mut pid = 0;
    if unsafe { AXUIElementGetPid(application.as_CFTypeRef(), &mut pid) } != 0 || pid <= 0 {
        return Err("无法识别阅读器，请重新选择后取词".into());
    }
    let window = focused_attribute(&application, "AXFocusedWindow")?;
    Ok(Source { pid, window })
}

fn same_source(source: &Source) -> bool {
    foreground().is_ok_and(|current| current.pid == source.pid && current.window == source.window)
}

fn sequence() -> isize {
    NSPasteboard::generalPasteboard().changeCount()
}

struct ClipboardSnapshot {
    text: Option<String>,
    image: Option<ImageData<'static>>,
}

fn snapshot() -> Result<ClipboardSnapshot, String> {
    let mut clipboard = Clipboard::new().map_err(|_| "无法访问剪贴板，请稍后重试")?;
    Ok(ClipboardSnapshot {
        text: clipboard.get_text().ok(),
        image: clipboard.get_image().ok(),
    })
}

fn restore(previous: ClipboardSnapshot, expected: isize) {
    if !should_restore(expected, sequence()) {
        return;
    }
    let Ok(mut clipboard) = Clipboard::new() else {
        return;
    };
    // A user's newer copy always takes priority. As on Windows, arbitrary clipboard
    // formats are left alone; only the saved text/image can be restored.
    if !should_restore(expected, sequence()) {
        return;
    }
    if let Some(image) = previous.image {
        let _ = clipboard.set_image(image);
    } else if let Some(text) = previous.text {
        let _ = clipboard.set_text(text);
    }
}

fn command_copy() -> Result<(), String> {
    let source = CGEventSource::new(CGEventSourceStateID::Private)
        .map_err(|_| "系统无法创建复制事件，请稍后重试")?;
    // Create every event before posting any, so allocation failure cannot leave a
    // synthetic Command key held. C=8, left Command=55 in Apple's virtual key map.
    let events = [(55, true), (8, true), (8, false), (55, false)]
        .into_iter()
        .map(|(key, down)| {
            CGEvent::new_keyboard_event(source.clone(), key, down)
                .map_err(|_| "系统无法创建复制事件，请稍后重试".to_string())
        })
        .collect::<Result<Vec<_>, _>>()?;
    for (index, event) in events.iter().enumerate() {
        event.set_flags(if index < 3 {
            CGEventFlags::CGEventFlagCommand
        } else {
            CGEventFlags::empty()
        });
        event.post(CGEventTapLocation::HID);
    }
    Ok(())
}

pub fn selection(source: Source) -> Result<String, String> {
    // NSPasteboard and arboard run on this worker; drain Cocoa autoreleased objects.
    autoreleasepool(|_| selection_inner(source))
}

fn selection_inner(source: Source) -> Result<String, String> {
    let deadline = Instant::now() + Duration::from_secs(2);
    // Read the physical HID state, including both sides of every modifier.
    while [54, 55, 56, 60, 58, 61, 59, 62]
        .iter()
        .any(|key| unsafe { CGEventSourceKeyState(1, *key) })
    {
        if Instant::now() >= deadline {
            return Err("请松开快捷键后再试".into());
        }
        thread::sleep(Duration::from_millis(15));
    }
    if !same_source(&source) {
        return Err("阅读器焦点已改变，请重新选择后取词".into());
    }
    let before = sequence();
    let previous = snapshot()?;
    if sequence() != before {
        return Err("剪贴板已变化，请重新取词".into());
    }
    if !same_source(&source) {
        return Err("阅读器焦点已改变，请重新选择后取词".into());
    }
    command_copy()?;
    let deadline = Instant::now() + Duration::from_millis(900);
    loop {
        if !same_source(&source) {
            return Err("取词期间阅读器焦点已改变".into());
        }
        let current = sequence();
        if current != before {
            if let Ok(text) = Clipboard::new().and_then(|mut clipboard| clipboard.get_text()) {
                let after = sequence();
                if after != current {
                    return Err("剪贴板再次变化，请重新取词".into());
                }
                if !is_new_text(before, after, &text) {
                    restore(previous, after);
                    return Err("选区没有文字".into());
                }
                restore(previous, after);
                return Ok(text);
            }
        }
        if Instant::now() >= deadline {
            return Err(
                "没有新的可复制文本；请确认辅助功能授权和选区，扫描 PDF 暂不支持取词".into(),
            );
        }
        thread::sleep(Duration::from_millis(20));
    }
}
