# Windows 桌面验收

本文件是人工验收步骤，不是通过记录。下面所有系统交互项目初始状态均为 **待 Windows 实测**。浏览器预览、构建成功和单元测试不能代替桌面验收。

## 准备

- 在 Windows 10 或 11 x64 上记录系统版本、阅读器名称及版本、PaperVocab 版本或提交。
- 准备可复制英文文本的真实 PDF 和扫描 PDF。可复制样本建议同时含普通词、短语及 `RNA`、`AI` 等缩写。
- 在 PowerShell 运行 `./scripts/verify.ps1`；加 `-Bundle` 时生成 NSIS 安装包。任一命令失败即停止。
- `pnpm-workspace.yaml` 的 `allowBuilds` 只明确批准 esbuild 所需安装脚本。不要为了通过检查批准所有依赖脚本。
- 用 `pnpm tauri dev` 启动桌面程序，或运行 `src-tauri/target/release/bundle/nsis/` 中实际生成的 `*-setup.exe`。
- 在设置中填入自己的 Chat Completions 兼容 API Base URL、模型和密钥。API 返回成功前，不记录“真实 API 已验证”。mock 服务仅记录为 mock。

## 检查表

每项记录时间、结果及必要的截图或日志。截图不得出现密钥。失败项目保留复现步骤，并更新 `docs/agent/STATE.md`。

| 项目 | 操作和验收标准 | 当前状态 |
| --- | --- | --- |
| 真实 PDF 取词 | 源阅读器保持焦点，选中英文后按配置快捷键。原词先进入单词本，浮窗展示加载状态，成功后展示中文释义；所收文本与选区一致。 | 待 Windows 实测 |
| 无选区与旧剪贴板 | 先复制一个辨识度高的旧词，取消 PDF 选区再按快捷键。提示没有新文本，单词与遇见记录数均不增加。 | 待 Windows 实测 |
| 扫描 PDF | 对扫描内容尝试取词。提示无法复制或需要 OCR，不收录旧剪贴板。 | 待 Windows 实测 |
| 修饰键与重复触发 | 按住快捷键，再快速重复触发。等待修饰键释放后应复制所选文本；不触发源程序的其他快捷键，不并发串词，不留下卡住的 Ctrl/Shift 状态。 | 待 Windows 实测 |
| 托盘与退出 | 关闭主窗口后检查托盘仍在且可重新打开。托盘退出后进程终止、图标消失、快捷键不再被占用。 | 待 Windows 实测 |
| 单实例 | 程序运行时再次启动同一程序。仅有一个有效实例，不重复创建托盘或重复写入遇见记录。 | 待 Windows 实测 |
| 浮窗不抢焦点 | 取词前后继续在阅读器用方向键或输入。浮窗出现后焦点仍在源阅读器；关闭浮窗不会激活其他窗口。 | 待 Windows 实测 |
| 图片与新复制内容保护 | 先复制图片，无选区取词失败后，在画图中仍可粘贴图片。取词过程中由用户另行复制内容，程序不得稍后把旧内容或纯文本恢复覆盖新内容。成功模拟复制本身会更新系统剪贴板，应记录此行为。 | 待 Windows 实测 |
| 快捷键冲突 | 用另一应用占用目标快捷键再保存。必须明确报告注册失败；重新选择可用快捷键后能取词。原可用快捷键及设置应保持一致。 | 待 Windows 实测 |
| 翻译失败与重试 | 分别验证错误密钥、网络断开、限流或 mock 格式错误。原词始终保留，错误可理解；恢复服务重试后写回同一单词，不误加遇见记录。 | 待 Windows 实测 |
| 快速连续取词 | 依次取 A、B，令 A 的请求后返回（可用明确标记的 mock）。各释义写回对应记录；浮窗不显示其他词的异步结果。 | 待 Windows 实测 |
| 缓存与重复遇见 | 再取同一个词，优先显示缓存释义，遇见数增加；没有产生复习事件。缩写及大小写不同的专业符号不得错误合并。 | 待 Windows 实测 |
| 重启持久化 | 收录成功后从托盘退出并重启。原词、释义、遇见时间和复习进度仍在；密钥不出现在 SQLite 或 JSON 导出中。 | 待 Windows 实测 |
| 本地日期与复习 | 检查今日和日期筛选以本地时区归组，尤其跨午夜记录。先仅显示英文，主动揭示释义后逐一测试三档评分；复习事件和下次到期时间符合实现规则，重复遇见不改变复习计划。 | 待 Windows 实测 |
| 安装与卸载 | 在用户账户运行实际 NSIS 包，记录包路径及 SHA-256。安装后启动，重复上述主要流程；托盘退出后确认进程结束，再卸载。记录应用数据和凭据实际保留或删除行为，不假定卸载会清理数据。 | 待 Windows 实测 |

## 结果记录

- 系统 / 阅读器 / 程序版本：未填写
- 安装包路径及 SHA-256：未填写
- 真实 API 协议与模型：未填写（不得填密钥）
- 通过项目与证据：未填写
- 失败 / 未运行项目：未填写
- 下一步：先运行本地检查，再按表执行真实 PDF、无选区、重启和一次复习演示。

## 官方配置依据

2026-09-27 只读核查 Tauri 2 官方页面：

- [Windows Installer](https://v2.tauri.app/distribute/windows-installer/)：Windows 上 `tauri build` 生成安装包，NSIS 是 setup exe；WebView2 是运行时要求。
- [Configuration Reference](https://v2.tauri.app/reference/config/)：`bundle.windows.nsis.installMode` 默认 `currentUser`，支持 `currentUser`、`perMachine`、`both`；构建目标包含 `nsis`。配置错误应由构建失败报告。
- [GitHub Pipeline](https://v2.tauri.app/distribute/pipelines/github/)：官方示例使用 `windows-latest` 和 Rust stable。项目 CI 直接运行 CLI、仅上传 Actions artifact，不创建 Release 或自动公开发布。

CI 上传位置为 `src-tauri/target/release/bundle/nsis/*.exe`。未显式指定 Rust target 时使用宿主 Windows x64 路径；显式使用 `--target x86_64-pc-windows-msvc` 会新增 target 子目录，需同步修改 artifact 路径。
