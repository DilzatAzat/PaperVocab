# PaperVocab

[中文](README.md) | [English](README.en.md)

PaperVocab 是一个面向英文论文阅读的 Windows / macOS 本地单词本。

在 PDF 或浏览器中选中英文，按全局快捷键，PaperVocab 会保存原词、请求目标语言释义，并提供按日期查看和基础复习。默认目标语言为中文，也可选择 English、Deutsch、Français 或日本語。数据保存在本机，API 密钥使用 Windows 凭据管理器或 macOS Keychain 保存。

## 下载

访问 [PaperVocab 主页](https://dilzat.com/PaperVocab/)，点击“下载 Windows 版”，或 [直接下载 v0.1.0 安装包](https://github.com/DilzatAzat/PaperVocab/releases/download/v0.1.0/PaperVocab_0.1.0_x64-setup.exe)。支持 Windows 10/11 x64；双击安装后即可从桌面快捷方式打开，无需 Node.js、Rust 或开发终端。

首次翻译需配置自己的 API 地址、模型与密钥，软件不附带翻译服务或免费额度。若缺少 WebView2，安装程序需要联网下载运行时。当前安装包未签名，Windows 可能显示未知发布者或 SmartScreen 提示。校验文件和已知限制见 [发布说明](https://github.com/DilzatAzat/PaperVocab/releases/tag/v0.1.0)；自定义域名和 Pages 设置见 [docs/DOMAIN.md](docs/DOMAIN.md)。

macOS 测试版：主页提供 Apple Silicon（M 系列）和 Intel 两种 DMG。要求 macOS 11 及以上；安装后将应用移入“应用程序”，在软件设置中授权辅助功能。当前为 ad-hoc 签名测试版，尚无 Apple Developer ID 签名/公证，完整 PDF、权限与浮窗行为待 Mac 桌面实测。详见 [Mac 验收与构建](docs/MACOS_TEST.md)。

## 使用

1. 下载安装包并双击安装，启动 PaperVocab，打开“设置”。
2. 填写 OpenAI 兼容 API Base URL、模型和 API 密钥。
3. 选择目标语言；默认是中文。
4. 在可复制文本的 PDF 中选中英文。
5. Windows 按 Ctrl+Shift+L，Mac 按 ⌘+Shift+L，等待取词浮窗显示释义；以设置中实际注册的快捷键为准。
6. 关闭主窗口后，应用仍会留在系统托盘；右键托盘图标可退出。

当前仅实现 OpenAI Chat Completions 兼容协议：请求为 POST {API Base URL}/chat/completions，要求响应包含 choices[0].message.content，内容再解析为 PaperVocab 的 JSON 释义结构。使用该协议的服务可以配置；原生 Anthropic Messages API、Gemini 原生 API 等非兼容协议暂不支持直接接入。

## 开发

Windows 开发使用 `codex/windows`，Mac 开发先切换到 `codex/macos`；`master` 主要维护公开主页。请在对应平台运行桌面构建。

    pnpm install
    pnpm test
    pnpm exec tsc --noEmit
    pnpm tauri dev

生成当前平台安装包（Windows 使用 NSIS；Mac 使用 app/DMG）：

    pnpm tauri build

平台分支：[Windows](https://github.com/DilzatAzat/PaperVocab/tree/codex/windows) / [macOS](https://github.com/DilzatAzat/PaperVocab/tree/codex/macos)。`master` 继续维护公开主页，Mac 分支复用应用业务逻辑并按平台选择系统实现。

## 隐私和范围

- 单词、遇见记录和复习记录只保存在本机 SQLite。
- API 密钥只保存在 Windows 凭据管理器或 macOS Keychain，不进入数据库、导出文件或日志。
- 快捷键触发时才读取一次选区，不持续上传剪贴板历史；成功取词后会在序号未再次变化时尽量恢复原有文字或图片剪贴板，自定义格式和取词期间的新复制内容以 Windows 实测为准。
- 扫描版 PDF、OCR、云同步、账号、手机端和浏览器插件不在第一版范围内。
- 每个单词当前只保留最近一次目标语言释义；切换目标语言后，已有旧语言释义需要重新翻译，遇见记录和复习记录仍保留。

## 贡献

请先阅读 CONTRIBUTING.md、SECURITY.md 和 Windows 验收清单。欢迎提交 Issue、改进翻译协议适配和 Windows 交互测试。

## 许可证

MIT License
