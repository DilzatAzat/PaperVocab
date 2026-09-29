# 当前状态

更新时间：2026-09-29

## 已验证

- Windows 10/11、Node/npm/pnpm、Rust/MSVC、WebView2、SQLite CLI 可用。
- node_modules/.bin/tsc.cmd --noEmit 通过。
- node_modules/.bin/vite.cmd build 通过。
- cargo check --manifest-path src-tauri/Cargo.toml 通过。
- cargo test --locked --manifest-path src-tauri/Cargo.toml 通过（5 个测试，含剪贴板旧内容/恢复条件判断和备份导入导出）。
- cargo fmt --all -- --check、node --test tests/*.test.mjs 通过。
- cargo clippy --locked --all-targets -- -D warnings 通过。
- Tauri NSIS 构建已通过，生成 x64 安装包；最新 release exe 的 PE Subsystem 为 2 (Windows GUI)。
- 当前本地安装包：`src-tauri/target/release/bundle/nsis/PaperVocab_0.1.0_x64-setup.exe`，SHA-256 为 `D63A6EB974C8FA26C8376C84F1AD833C82D624C8420148CAEDDD492122551995`。
- 已用 Windows 桌面启动 release exe，进程存在且主窗口标题为 PaperVocab；此前已检查中文工作台显示正常。
- 已完成独立宣传主页 `site/`：中文默认、中英文切换、产品流程说明、GitHub 仓库入口和 Release 下载入口；新增 GitHub Pages 工作流，部署时自动写入真实仓库地址。
- 已补充 GitHub 发布、自定义域名和双语宣传文案文档；主页本地静态服务器首屏、桌面布局和移动断点已检查。

## 当前实现

Tauri 2 + React/TypeScript + Rust。后端实现托盘、单实例、全局快捷键、模拟复制、剪贴板序号判断、SQLite、Windows 凭据管理器、OpenAI Chat Completions 兼容请求和基础复习。捕获过程先保存原词，再异步翻译。

## 未验证/阻塞

- 真实 PDF 选区、快捷键冲突实际占用、托盘菜单、浮窗不抢焦点、翻译 API、剪贴板图片/并发保护和安装包安装/退出仍需人工验收。
- JSON 导入导出后端命令已实现，完整导入/导出 UI 仍待补齐。
- 未使用真实 API 做翻译验证；CI 文件已配置但尚未在 GitHub runner 执行。
- GitHub Pages、Release 工作流尚未在真实 GitHub 仓库执行；主页本地配置为空时下载按钮保留当前页锚点，部署工作流会注入真实仓库地址和版本并生成安装包直链。
- 根目录未跟踪的 `papervocab.exe` 与 `uninstall.exe` 保留原样，未纳入提交；它们不是当前构建产物。

## 下一步

用户需在真实 PDF、托盘和安装包上执行 `docs/WINDOWS_TEST.md`，再记录安装包 SHA-256 与未通过项。发布主页时需在 GitHub 开启 Pages 的 GitHub Actions 构建，并按 `docs/GITHUB_PUBLISH.md` 推送仓库和版本 tag。
