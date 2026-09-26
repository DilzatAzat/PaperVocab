# PaperVocab

PaperVocab 是面向英文论文阅读的 Windows 本地单词本。选中文字后按全局快捷键，应用会保存原词、请求中文释义，并提供按日期查看和基础复习。

## 开发

pnpm install
pnpm test
pnpm exec tsc --noEmit
pnpm tauri dev

生成 Windows 安装包：pnpm tauri build

## 翻译接口

第一版使用 OpenAI 兼容的 POST {API Base URL}/chat/completions，发送 model 和 messages，要求返回 choices[0].message.content 中的 JSON。请求由 Rust 后端发出。

## 隐私

单词、遇见记录和复习记录只保存在本机 SQLite。API 密钥只保存在 Windows 凭据管理器。应用不会持续上传剪贴板历史；快捷键只在触发时读取一次新复制的文本。导出数据不包含密钥。

## 已知限制

扫描版 PDF 没有可复制文字时无法取词，第一版不含 OCR。真实 PDF、快捷键、托盘、浮窗和安装包验收需要 Windows 桌面实测。当前版本提供后端 JSON 导出命令，完整导入界面仍待补齐。
