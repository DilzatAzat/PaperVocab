# PaperVocab macOS 0.1.0 beta 1

## 中文

PaperVocab 的首个 macOS 测试版，提供 Apple Silicon（M 系列，`aarch64`）与 Intel（`x64`）DMG，要求 macOS 11 及以上。

- 共用 Windows 版的收词汇总、搜索、首次收录日期筛选、遇见记录、五种目标语言、翻译重试和 1/3/7 天基础复习。
- 使用 `⌘+Shift+L` 触发 macOS 模拟复制；读取新剪贴板文本、检查焦点并尽量有条件恢复原文字/图片。
- API 密钥存 macOS Keychain；词库存本机应用数据目录，不包含任何用户数据或密钥。
- 菜单栏驻留、窗口控制和取词浮窗增加 Mac 适配；设置提供辅助功能授权入口。

打开 DMG 后将软件拖入“应用程序”。首次打开可能需要在系统“隐私与安全性”中允许运行；在软件设置中授予辅助功能权限，然后配置自己的 Chat Completions 兼容 API 地址、模型与密钥。软件不提供翻译服务或免费额度。

**验证范围：** 发布工作流要求两种架构的前端测试/构建、Rust 测试/Clippy、DMG 构建、架构和 ad-hoc 签名检查、DMG 完整性及 8 秒启动烟测通过。此包仅有 ad-hoc 签名，尚无 Apple Developer ID 签名及公证。真实 PDF 取词、辅助功能授权全过程、剪贴板并发保护、浮窗焦点/全屏以及真实翻译 API 仍待交互式 Mac 桌面验收，不承诺所有阅读器兼容。扫描 PDF/OCR、云同步及手机端不在本版范围。

下载对应 DMG，并与 `SHA256SUMS.txt` 比对。Windows 的 `v0.1.0` 安装包仍然可用；两个平台的数据不会自动同步。

## English

The first macOS preview of PaperVocab, with Apple Silicon (`aarch64`) and Intel (`x64`) DMGs. Requires macOS 11 or later.

The word library, search, first-collection date filter, encounter history, five translation target languages, retries, and 1/3/7-day review logic are shared with Windows. Mac adaptations add Command+Shift+L selection capture, conditional clipboard restoration, Keychain storage, menu-bar residency, popup handling, and an Accessibility permission entry in Settings.

Drag the app from the DMG into Applications. The first launch may require allowing the app in Privacy & Security. Grant Accessibility access from the app's Settings and configure your own Chat Completions-compatible API URL, model, and key. No translation service or API credits are included.

**Validation scope:** the publishing workflow requires frontend tests/build, Rust tests/Clippy, native DMG builds, architecture checks, ad-hoc signature verification, DMG integrity checks, and an eight-second startup smoke test on both architectures. This preview has no Apple Developer ID signature or notarization. Real PDF capture, the full Accessibility permission flow, concurrent clipboard changes, popup focus/full-screen behavior, and a real translation API still await interactive Mac desktop testing. Compatibility with every reader is not guaranteed. OCR, cloud sync, and mobile apps are outside this release.

Verify your DMG against `SHA256SUMS.txt`. The existing Windows `v0.1.0` installer remains available. Data does not automatically sync between platforms.
