# PaperVocab 工程说明

PaperVocab 是独立的 Windows / macOS 桌面项目。不要修改旧博客，不要复制博客的 Jekyll 路由、部署配置或历史进度。

## 恢复入口

每次继续工作前先读本文件、docs/agent/STATE.md、docs/agent/ROADMAP.md，再检查 git status 和实际代码。保留用户已有修改。工作循环是 Understand -> Plan -> Implement -> Verify -> Review -> Repair -> Accept。

## 真实命令

- pnpm install
- pnpm test
- pnpm exec tsc --noEmit
- pnpm exec vite build
- cargo check --manifest-path src-tauri/Cargo.toml
- pnpm tauri dev
- pnpm tauri build

数据保存在各平台应用数据目录的 SQLite 中。翻译密钥只进入 Windows 凭据管理器或 macOS Keychain。不要把密钥写入数据库、前端持久化、日志、导出或 Git。未在对应平台交互式桌面实测的系统交互必须标为待实测。
