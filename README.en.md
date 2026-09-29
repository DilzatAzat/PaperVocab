# PaperVocab

[中文](README.md) | [English](README.en.md)

PaperVocab is a local-first Windows vocabulary companion for reading English papers.

Select English text in a PDF or browser, press the global shortcut, and PaperVocab saves the original text, requests an explanation in the selected target language, and makes it available for date-based review. Chinese is the default; English, German, French, and Japanese are also available. Data stays on the device; API keys are stored in Windows Credential Manager.

## Download

The source is public; the Windows installer has not been released yet. Once published, download `PaperVocab_*_x64-setup.exe` from [GitHub Releases](https://github.com/DilzatAzat/PaperVocab/releases). The first release targets Windows 10/11 x64.

Visit the [promotional site](https://dilzatazat.github.io/PaperVocab/). Once an installer is published, the site finds the latest GitHub Release asset automatically. See [docs/DOMAIN.md](docs/DOMAIN.md) for a custom domain.

## Use

1. Start PaperVocab and open Settings.
2. Enter an OpenAI-compatible API Base URL, model, and API key.
3. Choose a target language; Chinese is the default.
4. Select copyable English text in a PDF.
5. Press Ctrl+Shift+L and wait for the lookup popup.
6. Closing the main window keeps PaperVocab in the system tray. Right-click the tray icon to quit.

The current release implements only the OpenAI Chat Completions compatible protocol: POST {API Base URL}/chat/completions with choices[0].message.content, whose content must contain PaperVocab's JSON explanation structure. Services using that protocol can work; native Anthropic Messages API, native Gemini API, and other non-compatible protocols are not supported directly.

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
- Each word currently keeps one latest target-language explanation. Changing the target language requires old explanations to be translated again; encounter and review records remain intact.

## Contributing

Read CONTRIBUTING.md, SECURITY.md, and the Windows acceptance checklist before opening a change.

## License

MIT License
