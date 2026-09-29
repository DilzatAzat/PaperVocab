# Launch copy

## 中文

PaperVocab 是一个面向英文论文阅读的 Windows 本地单词本：选中文字，按快捷键，看到目标语言释义并自动保存到本地复习列表。默认目标语言为中文，也可选择 English、Deutsch、Français 或日本語。它不需要账号，API 密钥保存在 Windows 凭据管理器，适合希望保持阅读节奏的研究生、工程师和科研人员。

当前仅支持 OpenAI Chat Completions 兼容接口，支持今日收词、日期筛选和基础复习。原生 Anthropic/Gemini 等非兼容协议、扫描版 PDF/OCR 和云同步暂不支持。

启动请使用 NSIS 安装包，或使用 `src-tauri/target/release/papervocab.exe`。仓库根目录若存在旧的 `papervocab.exe`，不作为当前版本启动入口。

## English

PaperVocab is a local-first Windows vocabulary companion for English papers. Select text, press a shortcut, see an explanation in your target language, and review it later without an account. Chinese is the default. API keys stay in Windows Credential Manager.

The current release supports only the OpenAI Chat Completions compatible protocol, daily vocabulary, date filtering, and lightweight review. Native Anthropic/Gemini protocols, scanned PDFs/OCR, and cloud sync are not included yet.

Use the NSIS installer or `src-tauri/target/release/papervocab.exe` to launch the current build. An older `papervocab.exe` in the repository root is not the supported launch entry.
