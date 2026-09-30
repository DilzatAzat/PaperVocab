# 当前状态

更新时间：2026-09-30

## 已验证

- Windows 10/11、Node/npm/pnpm、Rust/MSVC、WebView2、SQLite CLI 可用。
- node_modules/.bin/tsc.cmd --noEmit 通过。
- node_modules/.bin/vite.cmd build 通过。
- cargo check --manifest-path src-tauri/Cargo.toml 通过。
- cargo test --locked --manifest-path src-tauri/Cargo.toml 通过（11 个测试，含目标语言规范化、旧设置迁移、语言切换 stale、翻译响应别名、翻译 generation 竞态、剪贴板旧内容/恢复条件判断和备份导入导出）。
- cargo fmt --all -- --check、node --test tests/*.test.mjs 通过。
- cargo clippy --locked --all-targets -- -D warnings 通过。
- Tauri NSIS 构建已通过，生成 x64 安装包；最新 release exe 的 PE Subsystem 为 2 (Windows GUI)。
- 当前本地安装包：`src-tauri/target/release/bundle/nsis/PaperVocab_0.1.0_x64-setup.exe`，SHA-256 为 `A0EFC7496B43C8E68347612178041AAB792C5C0DB09F15DB88ED28C40227ABAC`；本轮构建的 release exe PE Subsystem 为 2（Windows GUI）。
- 已用 Windows 桌面启动 release exe，进程存在且主窗口标题为 PaperVocab；此前已检查中文工作台显示正常。
- 已完成独立宣传主页 `site/`：中文默认、中英文切换、产品流程说明、GitHub 仓库入口和 Release 下载入口；新增 GitHub Pages 工作流，部署时自动写入真实仓库地址。
- 已补充 GitHub 发布、自定义域名和双语宣传文案文档；主页本地静态服务器首屏、桌面布局和移动断点已检查。
- 公开仓库 `https://github.com/DilzatAzat/PaperVocab` 已创建，`master` 已推送；GitHub Pages 已启用，第二次工作流运行成功，`https://dilzatazat.github.io/PaperVocab/` 返回 HTTP 200。
- 主页在浏览器中确认无 Release 时显示“安装包尚未发布”并链接 Releases；新增 4 项发布入口测试，总计 `pnpm test` 7 项通过。Release 工作流已加入 tag/package/Tauri/Cargo 版本校验。
- 首轮 GitHub Windows CI 运行 `36543891519` 成功，包含前端构建、Rust 检查、NSIS 构建；上传了 `PaperVocab-windows-x64` 临时工件（14 天保留，非公开 Release）。
- 390×844 移动视口和 1280×720 桌面视口的中英文首屏均显示下一段内容，页面无横向溢出，释义预览不遮挡正文。
- 宣传页文案已改为“使用流程”和阅读/翻译主线，移除导航和整段开源宣传；GitHub 仓库入口保留在页脚。API 协议和目标语言均按当前实现表述，手机复习、跨设备接续及更多 API 协议标为后续方向。
- 本轮本地验证：`pnpm test` 7/7、`node --check site/app.js`、`pnpm exec tsc --noEmit`、`pnpm exec vite build`、`cargo check`、`cargo test` 11/11、`cargo fmt --check`、`cargo clippy -D warnings`、`git diff --check` 通过；宣传页文案已更新为目标语言和 OpenAI Chat Completions 兼容协议说明。
- 本轮界面更新已将“今日收词”和“全部单词”合并为“收词汇总”，默认展示全部词，日期筛选可选并可清除，同时展示当前筛选结果和本地词库总数。
- 桌面主窗改为自绘无边框标题栏，侧栏、收词区、统计区、列表和设置页采用轻量玻璃材质；导航、搜索、日期、状态、删除和关闭操作改用 Lucide 图标。主窗关闭仍交由现有 Tauri close handler 驻留托盘。
- 浏览器视口复验：1280×720 和 390×844 无横向溢出，移动端手动收词输入高度正常；设置页在窄视口可滚动展示。
- 本轮修复标题栏权限和交互：主窗 capability 现在允许最小化、最大化/还原、关闭和拖动；标题栏改为标准三按钮，整条标题栏可拖动。浮窗单独使用隐藏/拖动权限，内容区支持滚动，关闭按钮固定在底部。
- 已将 PaperVocab 图标升级为论文书页与光标星芒标记，重新生成 `src-tauri/icons/icon.ico`，应用内品牌标记同步使用 `public/brand-mark.png`。

## 当前实现

Tauri 2 + React/TypeScript + Rust。后端实现托盘、单实例、全局快捷键、模拟复制、剪贴板序号判断、SQLite、Windows 凭据管理器、OpenAI Chat Completions 兼容请求和基础复习。捕获过程先保存原词，再异步翻译。

## 未验证/阻塞

- 真实 PDF 选区、快捷键冲突实际占用、托盘菜单、浮窗不抢焦点、翻译 API、剪贴板图片/并发保护和安装包安装/退出仍需人工验收。
- JSON 导入导出后端命令已实现，备份已保留目标语言字段；完整导入/导出 UI 仍待补齐。
- 未使用真实 API 做翻译验证；未在真实 PDF、托盘、浮窗和安装包安装流程上重复人工验收；后续代码提交的 GitHub CI 结果仍需核对。
- GitHub Release 尚未发布，`releases/latest` 返回 404；主页据此显示待发布状态，发布安装包后会自动链接到实际资产。
- UI 改动已提交为 `3311d8f` 并通过 `git -c http.proxy=http://127.0.0.1:9567 push origin master` 推送到 `origin/master`；本轮标题栏、浮窗和图标修复待提交，安装包仍保存在本机，尚未创建 GitHub Release。
- Playwright 生成的本地截图和会话目录不纳入版本控制。先前出现的根目录 `papervocab.exe` 与 `uninstall.exe` 没有纳入任何提交。

## 下一步

用户需在真实 PDF、托盘和安装包上执行 `docs/WINDOWS_TEST.md`，再按 `docs/GITHUB_PUBLISH.md` 推送版本 tag 并验证公开安装包下载。
