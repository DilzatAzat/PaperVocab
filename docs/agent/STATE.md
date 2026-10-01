# 当前状态

更新时间：2026-10-01

## 已验证

- Windows 10/11、Node/npm/pnpm、Rust/MSVC、WebView2、SQLite CLI 可用。
- node_modules/.bin/tsc.cmd --noEmit 通过。
- node_modules/.bin/vite.cmd build 通过。
- cargo check --manifest-path src-tauri/Cargo.toml 通过。
- cargo test --locked --manifest-path src-tauri/Cargo.toml 通过（11 个测试，含目标语言规范化、旧设置迁移、语言切换 stale、翻译响应别名、翻译 generation 竞态、剪贴板旧内容/恢复条件判断和备份导入导出）。
- cargo fmt --all -- --check、node --test tests/*.test.mjs 通过。
- cargo clippy --locked --all-targets -- -D warnings 通过。
- Tauri NSIS 构建已通过，生成 x64 安装包；最新 release exe 的 PE Subsystem 为 2 (Windows GUI)。
- 当前本地安装包：`src-tauri/target/release/bundle/nsis/PaperVocab_0.1.0_x64-setup.exe`，SHA-256 为 `FFF47C55EDA27DE7A9F27A6B6B875F0097551BCADABAC808B3F36F75A2F67FC7`；release exe PE Subsystem 为 2（Windows GUI）。
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
- 本轮将取词浮窗顶部改为从窗口上沿开始的 62px 有色拖动区，正文仍独立滚动。Windows 11 实测标题区中部拖动位移 `(+120,+64)`，靠近上沿 8px 拖动位移 `(-80,-40)`；实际浮窗顶部关闭按钮点击后隐藏。
- 品牌标记改为深色底纸页字母 P，已同步 SVG、ICO 和应用内 PNG。Cargo `build.rs` 现追踪 `icons/icon.ico`，避免图标变更时复用旧 Windows 资源库。重建并静默覆盖安装后，从 release exe 与已安装 exe 提取的 32px 图标逐像素一致，桌面快捷方式指向新 exe 且 Windows 快捷方式图标提取结果为新 P 标记。
- Windows 11 上使用无选区测试触发真实浮窗，提示“没有新的可复制文本”，未创建单词或遇见记录；两个临时测试窗口已关闭，测试时意外产生的一条收词已按精确时间和 ID 清理，数据库复核为 0 词、0 遇见。
- 2026-10-01 品牌图改为单枚 Berkshire Swash 装饰性 P，去掉横线和底部蓝色；SVG、ICO、应用内 PNG、宣传页标记同步。字体轮廓的 SIL OFL 许可文本已收入仓库。NSIS 重建成功，静默覆盖安装退出码 0；release 与已安装 exe 提取图标的 PNG SHA-256 一致。已安装程序可启动，进程和主窗口标题均为 PaperVocab。
- 宣传页新增与当前软件一致的收词汇总预览：搜索、首次收录日期筛选、词库总数、重复遇见次数；中英文文案同时更新，并明确选中文本会发送至自选翻译 API。Playwright 检查 1280px、390px 和 320px，词库预览完整、无横向溢出；320×700 首屏露出下一段。公开安装包仍未发布，主页正确显示待发布状态。
- 日期筛选已修复 WebView2 原生空值显示 `yyyy/mm/日` 的混合语言问题：可见空值统一为“年 / 月 / 日”，选中后显示“2026年10月01日”；内部仍用 `YYYY-MM-DD`，未增加时区转换。浏览器及已安装 Windows 桌面版实测日历打开、Enter/Space 选择、Escape 取消和清除均正常；筛选 10 月 2 日为 0 条，清除后恢复 4 条，现有数据保留。`pnpm test` 7/7、TypeScript、Vite、NSIS 构建通过，覆盖安装退出码 0；独立只读审查无阻断发现。
- `v0.1.0` 已公开发布：Release 工作流 `36815368756` 和提交 `d462035` 的 Windows CI `36815352581` 均成功。公开资产 `PaperVocab_0.1.0_x64-setup.exe` 为 3,976,305 字节，真实下载 SHA-256 `97556ea2fcba7f92618017ac8795beeaec43a2e72bd495de6c28a1ae163c4efe` 与 `SHA256SUMS.txt` 一致；与此前本机构建的哈希不同，公开版本以此值为准。
- 已用下载的公开安装包执行静默覆盖安装，退出码 0；安装前后已有 SQLite 文件 SHA-256 一致。安装版成功启动，进程窗口标题 PaperVocab，EXE Subsystem 为 2（Windows GUI），现有数据保持 4 词、4 遇见、2 复习。此为安装/启动烟测，不包含完整卸载和真实 PDF 验收。
- 首屏与下载区使用同一真实安装包地址；静态已验证版本可在 GitHub API 失败时保留下载。`site/release.js` 已填写上述真实版本，双语 README 已加入直接下载和首次配置步骤，12 项测试、JavaScript 语法和差异检查通过。
- Pages 部署 `36816148025` 成功，`https://dilzat.com/PaperVocab/` 返回 HTTP 200。Playwright 在正式主页点击中文首屏和英文下载区按钮，均取得 3,976,305 字节安装包，SHA-256 与公开校验文件一致；中英文切换保持同一下载 URL。用路由拦截模拟 GitHub API 网络失败后，静态 `v0.1.0` 下载仍可用（仅版本查询使用 mock，下载文件为真实公开安装包）。

## 当前实现

Tauri 2 + React/TypeScript + Rust。后端实现托盘、单实例、全局快捷键、模拟复制、剪贴板序号判断、SQLite、Windows 凭据管理器、OpenAI Chat Completions 兼容请求和基础复习。捕获过程先保存原词，再异步翻译。

## 未验证/阻塞

- 真实 PDF 选区、快捷键冲突实际占用、托盘菜单、浮窗不抢焦点、翻译 API、剪贴板图片/并发保护和完整安装/退出流程仍需人工验收；本轮只验证了浮窗拖动/关闭、无选区提示和覆盖安装后的图标。
- JSON 导入导出后端命令已实现，备份已保留目标语言字段；完整导入/导出 UI 仍待补齐。
- 未使用真实 API 做翻译验证；未在真实 PDF、托盘、浮窗和安装包完整退出流程上重复人工验收；后续代码提交的 GitHub CI 结果仍需核对。此轮只完成静默覆盖安装和启动烟测，未测试卸载。
- 当前直接下载安装任务已完成，无下载发布阻塞。尚未进行代码签名，Windows 可能显示未知发布者或 SmartScreen 提示。
- 当前提交和远端状态以实际 Git 状态为准。本机旧构建与公开 CI 构建的校验值不同，使用时应核对对应包的校验文件。
- Playwright 生成的本地截图和会话目录不纳入版本控制。先前出现的根目录 `papervocab.exe` 与 `uninstall.exe` 没有纳入任何提交。

## 下一步

本轮直接下载安装任务已完成：公开 Release、主页、双语 README、真实下载校验及公开包安装/启动烟测均有证据。下一条可执行动作是按 `docs/WINDOWS_TEST.md`，使用真实可复制 PDF 和用户自己的 API 验收取词→释义→重启持久化→一次复习；不要把此次下载/安装烟测视为完整桌面验收。


## 2026-10-01 macOS 版与双平台下载

- 已建立并推送 `codex/windows`（保留 Windows 基线 `293e33e`）与 `codex/macos`；`master` 维护宣传主页，Mac 开发先切换对应分支。
- Mac 版共用现有界面、词库、翻译、目标语言、遇见和复习逻辑；实现 Command+C 取词、AX 应用/窗口焦点检查、修饰键等待、pasteboard 变化/有条件恢复、原生 Keychain、辅助功能授权入口、不抢焦点浮窗、Mac 菜单与日期回退。最低目标 macOS 11，CI 系统为 macOS 15。
- 本地 TypeScript、Vite、Node 19/19、Windows Cargo check/test 13/13/fmt/Clippy 均通过；Windows CI `36818234016` 与首轮双架构 Mac CI `36818234145` 成功。
- 独立审查发现并修复 Mac 浮窗首次点击和 DMG 校验写死版本两项；第二轮复核无新增阻断。
- 最终发布流程 `36819037816` 全部成功；tag `macos-v0.1.0-beta.1` 对应 `6101609`。两种架构前端/Rust 检查、DMG 构建、lipo、ad-hoc 签名、DMG 完整性和 8 秒启动均通过。
- 公开 DMG 已真实下载校验：Apple Silicon 6,351,305 字节，SHA-256 `92843639bd31e39a7066d038c4d39feeb4f026691959f521b0a6c0c7945812d3`；Intel 6,689,310 字节，SHA-256 `6592fb026881e0a1834fd5459f71309fa603d952efd2147eb7388b682feec4d3`；均与 Mac Release 的 SHA256SUMS 一致。Windows v0.1.0 下载保留。
- 双语主页与 README 已增加两种 Mac 芯片下载和真实备用元数据；主页提交 `d934927` 已推送，Pages `36820540213` 成功；正式站中文 Apple Silicon 和英文 Intel 下载实点击得到的两个 DMG 哈希均匹配，双语 1280/390/320px 无横向溢出。模拟 GitHub 版本 API 失败后，Windows 与两个 Mac 的真实备用下载仍可用。
- Mac 测试版仅有 ad-hoc 签名，无 Developer ID/Apple 公证。完整 PDF、权限授权、剪贴板并发、浮窗焦点/全屏、真实 API、安装卸载继续按 docs/MACOS_TEST.md 标为待桌面实测，不能将 CI 启动等同全部实测。
- 并行 Windows 签名/验收文档的本地修改已保留，未混入 Mac 提交或发布包。

## 2026-10-01 Windows 下载信誉与免费签名准备

- 当前工作位于独立 worktree `C:/Users/ROG/.codex/worktrees/download-trust/paperVocab`、`codex/download-trust`，基于 master `8136a3a`。原 Desktop 项目的 Mac 分支及未提交签名准备修改保留；没有修改博客、全局配置或替换已发布安装包。
- 用户选择优先免费开源签名审批。官方资料确认：SignPath 需要项目声誉、许可条件、MFA、团队角色和逐次人工批准；免费 Store MSIX 可作备选，但需要重新打包及兼容验收。详见 `docs/DOWNLOAD_TRUST.md`。
- 再次核查公开 Windows v0.1.0：3,976,305 字节，SHA-256 `97556ea2fcba7f92618017ac8795beeaec43a2e72bd495de6c28a1ae163c4efe` 与同 Release 校验文件匹配，Authenticode `NotSigned`。截图的 Edge 提示是少下载信誉提示，不能据此说已检出病毒或已证明安全。
- 新增 SignPath 实际表单对应的英文申请草稿、双语 `CODE_SIGNING_POLICY.md` 和 `PRIVACY.md`。截至核查：仓库 1 star/0 fork、Windows 包 5 次下载（含开发者验证），没有已核实广泛使用或媒体证据。MFA、本人联系人、角色和完整组件许可审计未完成。**未提交申请、未获批、未接入签名。**
- 官网中英文 Windows 下载区新增可展开说明、对应版本 Release/校验文件入口、真实大小和完整 SHA-256；未知新版清除旧版本的哈希/签名结论，API verification 不作为签名证据。Windows/Mac 双架构入口保留。双语 README 已链接签名与隐私说明。
- 已引入此前准备的 Windows 签名/真实验收文档和只读检查脚本，增加显式 `-AssetName` 支持浏览器 `(1)` 重名，不自动模糊匹配；未签名包仍被 `-RequireSigned` 拒绝。
- 本轮实际验证：`pnpm test` 24/24、两份主页 JS 语法、TypeScript、Vite、`git diff --check` 通过。PowerShell 5.1/7 均完成真实公开包校验及 11 个正/负例（重命名成功；缺失/错误条目、篡改字节、重复/坏格式、路径资产名、缺应用、重复文件、真实未签名门禁拒绝）。临时回归脚本 `C:/Users/ROG/AppData/Local/Temp/papervocab-check-trust.ps1` 不纳入仓库。
- 浏览器本地 1280px、390px、320px 中英文无横向溢出，下载说明、哈希及 Mac 链接正确；980px 也检查无横向溢出并保存真实截图至忽略的 `output/playwright/`。独立只读审查无新增阻断，独立 Node 24/24 与真实包校验通过。
- 本轮不改桌面业务代码，未在本机重新跑 Rust/安装器构建或真实 PDF/API/卸载流程；以前的未验收项继续保留。提交 `4bffc68` 已正常推送 master；Pages `36826644245` 和 Windows Checks/Installer `36826644274` 成功。
- 正式站 `https://dilzat.com/PaperVocab/` 返回 HTTP 200。浏览器确认中英文版本说明、完整哈希、隐私/签名政策和双平台下载地址正确；实际点击校验文件链接得到 `C:/Users/ROG/Downloads/SHA256SUMS.txt`，内容与真实 v0.1.0 包再次 MATCH。一次辅助 `downloadMedia` 获取超时，改用实际点击和 download 事件后成功，不将超时记成通过。截图保存于 `output/playwright/download-trust-live.jpg`（不纳入 Git）。

本轮工程任务已完成并发布。下一条签名动作：维护者阅读 `docs/SIGNPATH_APPLICATION.md`，补联系人/MFA/角色/许可与真实声誉证据，本人阅读协议后提交；服务审核未完成前继续明确未签名。审批后再按真实服务配置接入签名及新版本验收；会话结束后不会自行等待审批或继续运行。
