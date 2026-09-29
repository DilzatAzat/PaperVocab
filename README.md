# PaperVocab

[中文](README.md) | [English](README.en.md)

PaperVocab 是一个面向英文论文阅读的 Windows 本地单词本。

在 PDF 或浏览器中选中英文，按全局快捷键，PaperVocab 会保存原词、请求目标语言释义，并提供按日期查看和基础复习。默认目标语言为中文，也可选择 English、Deutsch、Français 或日本語。数据保存在本机，API 密钥使用 Windows 凭据管理器保存。

## 下载

源码现已公开；Windows 安装包尚未发布。发布后可在 [GitHub Releases](https://github.com/DilzatAzat/PaperVocab/releases) 下载 `PaperVocab_*_x64-setup.exe`。第一版面向 Windows 10/11 x64。

访问 [宣传主页](https://dilzatazat.github.io/PaperVocab/)；发布安装包后，主页会自动找到最新的 GitHub Release 安装包。自定义域名和 Pages 设置见 [docs/DOMAIN.md](docs/DOMAIN.md)。

## 使用

1. 启动 PaperVocab，打开“设置”。
2. 填写 OpenAI 兼容 API Base URL、模型和 API 密钥。
3. 选择目标语言；默认是中文。
4. 在可复制文本的 PDF 中选中英文。
5. 按 Ctrl+Shift+L，等待取词浮窗显示释义。
6. 关闭主窗口后，应用仍会留在系统托盘；右键托盘图标可退出。

当前仅实现 OpenAI Chat Completions 兼容协议：请求为 POST {API Base URL}/chat/completions，要求响应包含 choices[0].message.content，内容再解析为 PaperVocab 的 JSON 释义结构。使用该协议的服务可以配置；原生 Anthropic Messages API、Gemini 原生 API 等非兼容协议暂不支持直接接入。

## 开发

    pnpm install
    pnpm test
    pnpm exec tsc --noEmit
    pnpm tauri dev

生成 Windows 安装包：

    pnpm tauri build

## 隐私和范围

- 单词、遇见记录和复习记录只保存在本机 SQLite。
- API 密钥只保存在 Windows 凭据管理器，不进入数据库、导出文件或日志。
- 快捷键触发时才读取一次选区，不持续上传剪贴板历史；成功取词后会在序号未再次变化时尽量恢复原有文字或图片剪贴板，自定义格式和取词期间的新复制内容以 Windows 实测为准。
- 扫描版 PDF、OCR、云同步、账号、手机端和浏览器插件不在第一版范围内。
- 每个单词当前只保留最近一次目标语言释义；切换目标语言后，已有旧语言释义需要重新翻译，遇见记录和复习记录仍保留。

## 贡献

请先阅读 CONTRIBUTING.md、SECURITY.md 和 Windows 验收清单。欢迎提交 Issue、改进翻译协议适配和 Windows 交互测试。

## 许可证

MIT License
