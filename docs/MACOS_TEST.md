# macOS 验收与构建

macOS 版共用 Windows 的工作台、SQLite、翻译协议、目标语言、重试和复习逻辑。系统取词、密钥存储、菜单与浮窗使用 macOS 实现。`codex/windows` 保留 Windows 版，`codex/macos` 维护 Mac 版；`master` 继续托管公开主页。

## 构建

macOS 11 及以上。开发机安装 Node.js、pnpm、Rust 和 Xcode Command Line Tools，然后运行：

```sh
pnpm install --frozen-lockfile
pnpm test
pnpm exec tsc --noEmit
pnpm exec vite build
cargo test --locked --manifest-path src-tauri/Cargo.toml
cargo clippy --locked --manifest-path src-tauri/Cargo.toml --all-targets -- -D warnings
pnpm tauri dev
pnpm tauri build --bundles app,dmg
```

Tauri 自动合并 `tauri.macos.conf.json`。CI 分别在 Apple Silicon 与 Intel runner 上构建，验证二进制架构、ad-hoc 签名、DMG 完整性和 8 秒进程启动。自动构建及启动不等于下列桌面场景已经通过。

## 安装与首次使用

1. 在“关于本机”中确认芯片：Apple Silicon（M 系列）选 `aarch64`，Intel 选 `x64`。
2. 打开对应 DMG，将 PaperVocab 拖到“应用程序”。不要在 DMG 中直接长期运行，以免授权路径变化。
3. 当前测试版仅有 ad-hoc 签名，无 Developer ID 与 Apple 公证；系统可能拒绝首次打开。确认来源后，按 macOS“隐私与安全性”页面提供的允许运行操作处理。不建议禁用 Gatekeeper。
4. 打开软件设置，授权辅助功能。授权只用于用户触发的模拟复制与焦点判断，不是屏幕录制或持续读取剪贴板。
5. 配置自己的 Chat Completions 兼容 API。密钥只存 macOS Keychain，不写入 SQLite、日志、备份或前端存储。
6. 在可复制 PDF 中选英文，按默认 `⌘+Shift+L`（设置值 `SUPER+SHIFT+L`）。用户可修改快捷键，验收使用实际已注册值。

## 尚需交互式 macOS 桌面验收

所有条目初始均为待实测。记录 macOS、芯片、阅读器、构建提交、安装包 SHA-256 和结果；不要记录密钥或私有论文全文。

| 场景 | 验收要求 | 状态 |
| --- | --- | --- |
| 首次安装与启动 | DMG 安装、首次打开提示、图标、菜单栏图标、主窗正常 | 待实测 |
| 辅助功能 | 未授权明确提示；拒绝可恢复；授权后状态更新并可取词 | 待实测 |
| Preview 与浏览器 PDF | 单词、短语和缩写选区准确，真实 API 释义可见 | 待实测 |
| 旧剪贴板与空选区 | 不能把旧文本误收为新词，不增加词/遇见记录 | 待实测 |
| 焦点与快捷键 | 松开修饰键再复制；切换窗口/应用时不误取词；快捷键冲突可恢复 | 待实测 |
| 剪贴板恢复 | 原文字/图片尽量恢复；取词期间的新复制内容不被覆盖 | 待实测 |
| 浮窗 | 不抢阅读器焦点；可拖动、关闭、滚动；全屏与多个桌面可用 | 待实测 |
| 日期筛选 | WKWebView 下可选择、清除日期，无本地化混合占位符 | 待实测 |
| 持久化与复习 | 重启后保留单词/释义；评分产生 1/3/7 天到期；遇见不冒充复习 | 待实测 |
| 钥匙串与退出 | 密钥重启后可用；主窗关闭保留菜单栏入口；Cmd+Q 完全退出 | 待实测 |
| 失败与恢复 | 断网保存原词；重试同条记录；旧翻译响应不覆盖新目标语言 | 待实测 |
| 卸载与重装 | 在隔离账户检查程序、词库、Keychain 的实际保留情况 | 待实测 |

没有 Apple 开发者签名凭据时，不能把测试版写成已签名/已公证正式版。Windows 已验证能力也不能自动算作 Mac 桌面已验证。

## 发布

Mac 测试版 tag 使用 `macos-v<应用版本>-beta.<序号>`，例如 `macos-v0.1.0-beta.1`。tag 触发 `.github/workflows/macos.yml`，只有两种芯片构建、自动测试、签名检查和启动烟测都通过后才发布两个 DMG 及组合 `SHA256SUMS.txt`。Windows `v0.1.0` 资产保留。

`site/release.js` 的 Mac 元数据仅在公开 DMG 真实下载且校验通过后填写。宣传主页双语显示两种芯片入口，并明确当前测试版的签名和桌面验证状态。
