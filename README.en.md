# PaperVocab

[中文](README.md) | [English](README.en.md)

PaperVocab is a local-first Windows vocabulary companion for reading English papers.

Select English text in a PDF or browser, press the global shortcut, and PaperVocab saves the original text, requests a Chinese explanation, and makes it available for date-based review. Data stays on the device; API keys are stored in Windows Credential Manager.

## Download

Open GitHub Releases and download the latest PaperVocab_*_x64-setup.exe. The first release targets Windows 10/11 x64.

## Use

1. Start PaperVocab and open Settings.
2. Enter an OpenAI-compatible API Base URL, model, and API key.
3. Select copyable English text in a PDF.
4. Press Ctrl+Shift+L and wait for the lookup popup.
5. Closing the main window keeps PaperVocab in the system tray. Right-click the tray icon to quit.

The first version uses POST {API Base URL}/chat/completions and expects choices[0].message.content. Native Anthropic Messages API and other non-compatible protocols are not supported directly.

## Development

    pnpm install
    pnpm test
    pnpm exec tsc --noEmit
    pnpm tauri dev

Build the Windows installer:

    pnpm tauri build

## Privacy and scope

- Words, encounters, and review events stay in a local SQLite database.
- API keys stay in Windows Credential Manager and are never included in the database, exports, or logs.
- The clipboard is read only after the shortcut is pressed; after a successful lookup, PaperVocab conditionally restores captured text or image data when the clipboard sequence is unchanged. Custom formats and copies made during capture still require Windows testing.
- OCR, cloud sync, accounts, mobile apps, and browser extensions are outside the first release.

## Contributing

Read CONTRIBUTING.md, SECURITY.md, and the Windows acceptance checklist before opening a change.

## License

MIT License
