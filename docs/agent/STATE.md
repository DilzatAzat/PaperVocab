# 当前状态

更新时间：2026-09-27

## 已验证

- Windows 10/11、Node/npm/pnpm、Rust/MSVC、WebView2、SQLite CLI 可用。
- node_modules/.bin/tsc.cmd --noEmit 通过。
- node_modules/.bin/vite.cmd build 通过。
- cargo check --manifest-path src-tauri/Cargo.toml 通过。
- cargo test --manifest-path src-tauri/Cargo.toml 通过（4 个测试，含剪贴板旧内容判断和备份导入导出）。
- cargo fmt --all -- --check、node --test tests/*.test.mjs 通过。
- Tauri NSIS 构建已通过，生成 x64 安装包；修复取词焦点/所有者校验后已重新生成。
- 已用 Windows 桌面启动 release exe，主窗口可见，中文工作台正常显示。

## 当前实现

Tauri 2 + React/TypeScript + Rust。后端实现托盘、单实例、全局快捷键、模拟复制、剪贴板序号判断、SQLite、Windows 凭据管理器、OpenAI Chat Completions 兼容请求和基础复习。捕获过程先保存原词，再异步翻译。

## 未验证/阻塞

- 真实 PDF 选区、快捷键冲突实际占用、托盘菜单、浮窗不抢焦点、翻译 API 和安装包安装/退出仍需人工验收。
- JSON 导入导出后端命令已实现，完整导入 UI 仍待补齐。
- 未使用真实 API 做翻译验证；CI 文件已配置但尚未在 GitHub runner 执行。

## 下一步

运行 pnpm test，再运行 pnpm tauri build；在 Windows 桌面执行验收流程，记录安装包路径和未通过项。
