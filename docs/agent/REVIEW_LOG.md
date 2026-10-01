# 审查记录

## 2026-10-01：下载信誉与免费签名准备

- 新鲜只读 Reviewer 检查全部本轮 diff 和新增文档/脚本，未发现新增阻断问题。独立 Node 24/24、差异检查、真实公开包 checksum MATCH/NotSigned 和缺应用的签名门禁拒绝通过。
- Boss 确认新版不继承旧 hash/size/unsigned、API verification 不冒充签名证据、校验链接对应真实版本，Windows/Mac下载和双语保留。主线程本地多视口无横向溢出；PowerShell 5.1/7 11项正负例通过。
- 申请材料明确声誉、组件许可、MFA、联系人和本人协议提交缺口；没有发送申请或假造资助鸣谢。SignPath/Store 与 Microsoft 官方文档限制已核查。
- 没有修改原 Desktop 的未提交工作，没有签名/覆盖公开 v0.1.0。真实 API/PDF/卸载仍待验收。提交 `4bffc68` 的 Pages `36826644245`、Windows CI `36826644274` 成功；正式站双语说明和政策链接正确，校验文件实际点击下载后再次与真实包匹配。辅助下载方法超时改为实际点击并成功，未掩盖失败或宣称信誉提示已消除。

## 2026-09-27

- 旧博客 harness 已只读检查；确认其流程文档和 Jekyll 命令不适用于本项目。
- TypeScript、Vite、Rust cargo check 已通过。
- 修复 Tauri NSIS installMode 配置、Windows 输入 API 类型和缺失图标资源。
- 第一轮独立审查发现并修复：密钥参数映射、浮窗权限、修饰键释放等待、翻译失败落库、缓存优先、翻译并发释放、主窗关闭驻留、失败浮窗提示、复习推进、托盘图标。
- 第二轮构建门禁：cargo clippy --all-targets -- -D warnings 通过；NSIS 重新生成成功。
- 最新只读审查发现并修复：release GUI 子系统属性位置、启动快捷键冲突降级、同键重试、翻译失败重复事件、手动翻译事件刷新、旧取词实现重复、图片/文字剪贴板条件恢复、浮窗横向滚动和长内容裁切风险。
- 最新验证：pnpm test、TypeScript、Vite、cargo fmt、cargo test（5）、clippy、NSIS 构建均通过；PE Subsystem 2 已确认。
- 待 Windows 实测：真实 PDF、快捷键冲突占用、托盘/浮窗焦点、剪贴板自定义格式与并发复制、真实 API、安装/卸载和 CI runner。

## 2026-09-29

- 审查宣传主页改动：确认独立 `site/` 不依赖博客，页面提供中英文切换、Release/仓库入口和响应式布局。
- 已验证：`node --check site/app.js`、`pnpm test`、`pnpm exec tsc --noEmit`、`pnpm exec vite build`、`cargo check --manifest-path src-tauri/Cargo.toml`、`scripts/verify.ps1`、`git diff --check`。
- 浏览器验证：本地静态服务器首屏和移动断点可渲染；键盘触发语言按钮后页面语言状态切换。坐标点击在当前浏览器自动化适配层未稳定触发，属于测试工具限制，不影响标准浏览器按钮实现。
- 待验证：真实 GitHub Pages 部署、Release 资产下载、域名 DNS/HTTPS、自定义域名和 GitHub Actions runner。

### 复核修复

- 修复版本号长期硬编码：Pages 工作流从 `package.json` 注入版本，主页据此生成安装包直链。
- 修复页脚文档入口，改为指向仓库 `docs/`；补充 Release 页面入口。
- 语言切换现在同步 `<title>`、description、Open Graph 元信息和关键 ARIA 文本。
- Pages 工作流同时监听 `master` 与 `main`；预览浮窗关闭按钮已绑定实际行为，存储不可用时语言切换仍可工作。

## 2026-09-29 公开仓库与 Pages

- `DilzatAzat/PaperVocab` 公开仓库已创建；通过一次性 Git 代理设置推送 `master`。未修改旧博客或全局 Git/Codex 配置。
- GitHub Pages 首次运行在启用 Pages 前失败于 Configure Pages；启用后重新运行成功，站点和 `config.js` 均返回 HTTP 200。
- 发布检查发现仓库无 Release，旧主页安装包直链返回 404；改为查询真实 Release 资产，有安装包才提供直链，其余状态指向 Releases 页面。
- 独立审查发现 tag、包版本与安装包资产可能不一致；Release 工作流增加三处版本一致性校验，主页拒绝与 tag 不一致的资产。
- `pnpm test` 7/7、`node --check site/app.js`、JSON/Cargo 版本核对、Ruby YAML 解析和 `git diff --check` 均通过；真实 Release 资产仍待首次发布后验证。
- GitHub Windows CI 首次运行成功，NSIS 安装包作为 Actions 工件上传；中英文首屏经 390×844 移动视口和 1280×720 桌面视口检查，下一段内容可见，未见横向溢出或正文遮挡。

## 2026-09-29 宣传页文案调整

- 独立只读审查发现移动端隐藏“使用流程”导航，以及安装包发布后的固定文案与动态下载状态可能矛盾；均已修复。
- 英文复习示例改为与“有点印象”对应的 “Somewhat familiar”。320px 视口发现的 15px 横向溢出由 `body` 最小宽度导致，移除后中英文导航均完整显示。
- 修复后 `pnpm test` 7/7、`node --check site/app.js`、`git diff --check` 通过；浏览器验证中英文内容及桌面/窄视口布局。

## 2026-09-30 目标语言与协议复核

- 独立审查发现：备份未携带目标语言、语言切换状态误用 `failed`、在途旧语言请求可能覆盖新设置、宣传页仍使用中文释义和固定领域表述。已分别修复为备份字段兼容迁移、`stale` 状态、写回前核对当前目标语言，以及目标语言/协议双语文案。
- 新增 Rust 测试覆盖目标语言规范化、真实旧 `domain` 设置迁移、语言切换 stale、旧翻译响应字段别名、旧备份兼容和目标语言备份回环；翻译写回增加 generation 条件，避免同词并发结果互相覆盖。
- 已验证：`cargo test` 11/11、`cargo check`、`cargo fmt --check`、`cargo clippy --all-targets -- -D warnings`、`pnpm test` 7/7、TypeScript、Vite、`node --check site/app.js`、`git diff --check`。
- 待 Windows 实测：真实 PDF、托盘/浮窗交互、快捷键冲突、剪贴板保护、真实 API 和安装包安装卸载；未宣称这些系统交互已通过。

## 2026-09-30 收词汇总与桌面 UI 复核

- 已复核页面合并逻辑：前端只保留 `library/review/settings`，日期默认为空，列表查询与本地词库总数查询分开，清除日期后回到全量结果。
- 已复核自绘标题栏只在主窗渲染，按钮带有中文 `aria-label` 和 `title`；浮窗关闭按钮改为 Lucide `X`，列表删除和重试操作改为图标并保留可读标签。
- 浏览器验证发现无 Tauri 环境下缺少标题栏会使 CSS Grid 主内容行高异常、移动端 flex 基准会拉伸手动输入区；已分别通过始终渲染预览标题栏、固定桌面 shell 高度并将手动输入 flex 基准改为自动修复。
- 已验证：`pnpm exec tsc --noEmit`、`pnpm exec vite build`、`pnpm test` 7/7、`cargo check`、`cargo test --locked` 11/11、`git diff --check`；1280×720 和 390×844 页面无横向溢出。
- 待 Windows 实测：无边框标题栏按钮、主窗关闭驻留托盘、真实 PDF 取词、浮窗焦点和安装包安装/退出。

## 2026-09-30 标题栏、浮窗滚动与图标修复

- 根因：capability 只允许主窗 show/hide，没有允许 `close`、`minimize`、`toggle-maximize`、`is-maximized` 和 `start-dragging`，导致自绘窗口控制和拖动无效；已补充主窗权限并为浮窗建立独立 capability。
- 标题栏改为最小化、最大化/还原、关闭三按钮，整条标题栏通过 `startDragging` 移动；关闭继续进入现有 `CloseRequested -> prevent_close + hide` 托盘路径。
- 浮窗由固定滚动外壳改为固定头部、可滚动内容区和固定底部关闭按钮，窗口高度调整为 300px，长释义不会把关闭操作推出视口。
- 使用统一 PaperVocab 书页/星芒图标重新生成 Windows `icon.ico`，应用内品牌图和浏览器 favicon 同步替换。
- `pnpm exec tsc --noEmit`、`pnpm exec vite build`、`cargo check`、`pnpm test` 7/7、`pnpm tauri build` 均通过；新 NSIS 包待提交后更新哈希。
- 最后复核发现标题栏组件每次渲染都新建窗口句柄，可能重复注册 resize 监听；已改为稳定句柄并处理监听注册期间卸载的清理竞态。重建 NSIS 成功，最终包 SHA-256 为 `BF1582256BBDC6557B4E04264A8423A527ACD89C0D7C8202881E80D917812A44`。

## 2026-09-30 浮窗拖动区域与品牌图标复核

- 用户截图对应的拖动热区只有 `.popup-top` 的 32px，其下同色留白不响应拖动；现改为从上沿开始、以底色和分界线明确标示的 62px 标题区。Windows 11 鼠标事件实测中部和距上沿 8px 均能拖动，窗口位移与鼠标位移一致。
- 独立只读审查发现新 `icon.ico` 虽已生成，但新构建的 exe 仍嵌入旧书页图标。根因是 Cargo 构建脚本未追踪 ICO 变化；在 `build.rs` 声明 `cargo:rerun-if-changed=icons/icon.ico` 后重建，release 与覆盖安装后的 exe 图标均变为新 P 标记，快捷方式图标也提取为新标记。
- 浮窗按钮在鼠标按下时直接执行隐藏，并保留 `click` 供键盘操作；Windows 11 真实无选区浮窗上的顶部关闭按钮点击后窗口变为不可见。无选区提示正确显示，数据库未增加记录。长释义和真实 PDF 场景仍待人工验收。
- 最终独立只读审查未发现高置信度正确性或回归问题；复核了拖动热区、关闭事件、ICO 重建依赖和安装包图标路径。视觉偏好仍需用户确认。

## 2026-10-01 单枚 P 图标与宣传页同步

- 独立只读审查发现英文元描述中的 “Words stay local” 可能误导用户，以为选中文本不会发往翻译 API；已在中英文描述中明确本地保存与外发翻译的边界。
- 审查发现中文模式的预览关闭按钮仍保留英文无障碍标签；已与品牌首页标签一并本地化。
- Playwright 在 320、390、1280px 检查页面，无横向溢出；320px 英文首屏原本未露出下一段，已压缩窄屏预览后复验。中文和英文词库预览内容完整。GitHub API 对未发布 Release 返回 404，页面按预期显示待发布。
- `pnpm test` 7/7、TypeScript、Vite、`node --check site/app.js`、`cargo check`、`pnpm tauri build` 通过；重建安装包 SHA-256 为 `FAE4876100E7D77061DD4AECEBC1AB7E6191833CEAA4B8116909B49C6A8EA59A`。静默覆盖安装退出码 0，已安装和 release EXE 图标提取结果相同，安装后启动烟测通过。

## 2026-10-01 日期占位符修复

- 根因：原生 `input[type=date]` 的分段占位符由 WebView2/系统区域设置生成，HTML 的中文语言标记无法保证统一显示；现由按钮显示中文日期文本并打开原生日历，日期值继续原样传递为 `YYYY-MM-DD`。
- 独立只读审查复核按钮用户激活、Enter/Space 操作、固定尺寸、焦点样式和日期值未引入时区转换，未发现阻断问题。
- 浏览器回归验证空值、选定日期、清除和窄视口。真实 Windows WebView2 实测原生日历可打开；选择 10 月 1 日显示完整中文，Space 打开后选 10 月 2 日，筛选结果为 0；Escape 保留日期，清除恢复 4 条，未修改词库数据。
- `pnpm test` 7/7、`pnpm exec tsc --noEmit`、`pnpm exec vite build`、`pnpm tauri build` 通过。确认原设置已保存且密钥输入框为空后覆盖安装，退出码 0；新安装包 SHA-256 为 `FFF47C55EDA27DE7A9F27A6B6B875F0097551BCADABAC808B3F36F75A2F67FC7`。

## 2026-10-01 公开安装包与主页直达下载

- 独立只读审查无阻断发现：Release 版本校验、NSIS 文件名与 SHA-256 生成一致；安装包资源不包含本地数据库或 Windows 凭据。
- 首屏与下载区使用同一精确资产地址，中英文切换保留下载入口；静态已验证版本在 API 失败时仍可下载，较旧或无效 API 版本无法覆盖它。
- `pnpm test` 12/12、JavaScript 语法与 workflow/版本检查通过；Reviewer 单独运行下载入口测试 9/9 和差异检查通过。
- Release 工作流 `36815368756` 成功，下载公开安装包并与发布的 SHA-256 文件比对一致（`97556ea2fcba7f92618017ac8795beeaec43a2e72bd495de6c28a1ae163c4efe`）。公开包静默覆盖安装退出码 0，已有数据库文件校验值不变；启动后窗口标题正确，Windows GUI 子系统确认无需控制台。尚未执行的完整系统验收继续保留在 Windows 清单中。
- Pages 部署 `36816148025` 成功。正式域名的中文首屏和英文下载区均实点击下载，两个文件的校验值与 Release 一致；语言切换不改变资产地址。模拟版本 API 网络失败后仍可下载真实公开文件，mock 范围仅限版本查询。
- Boss 最终复核：代码变化限定于下载链接与发布流程，安装包不含本机词库/密钥，双语说明如实保留 API 配置、未签名与完整系统验收限制。首次发布及下载验收完成。


## 2026-10-01 macOS 适配与发布审查

- 只读 Explorer/Planner 明确平台 API、Keychain target feature、非激活浮窗与独立 Mac Release；一个 Coder 负责 app，Boss 负责独立的主页/CI/发布文件。
- 新鲜独立 Reviewer 核查原生 API/CF 所有权、焦点/剪贴板防旧内容、权限动作、共享 UI、日期回退、资产 URL/版本/备用入口、图标和发布工作流。发现 Mac 非激活浮窗需 acceptFirstMouse，以及 DMG 验证不能写死 0.1.0；已修复并复核无新增阻断。
- 本地 19 项 Node、13 项 Rust、TS、Vite、fmt、Clippy 通过；最终双架构 Mac CI `36819037816` 成功，验证架构/ad-hoc 签名/DMG/8 秒启动。公开两个 DMG 真实下载 SHA-256 均与校验文件一致；Pages `36820540213` 成功，正式站中文 Apple Silicon / 英文 Intel 实点击下载后再次比对一致，双语三个视口与版本 API 失败备用入口通过。
- 浏览器已验证中英文 1280/390/320px 主页无溢出；模拟缺失 showPicker 的日期回退拒绝无效日期、接受闰日、可清除，Escape 恢复焦点。上述模拟仅限浏览器兼容回退，不等于 Mac 桌面实测。
- 接受实现与测试版发布范围；真实取词/权限/焦点/全屏/API 及完整安装卸载仍按 Mac 验收表待实测。无 Apple 签名凭据，未宣称正式签名、公证或全阅读器兼容。

## 2026-10-01 README 与宣传主页独立审查

- 新鲜只读 Reviewer 核对双语 README/上手指南/推广手册、反馈表单、视觉资源、主页交互和版本下载逻辑；无高置信度正确性、安全、回归或不实宣传发现。
- 独立 `pnpm test` 27/27、主页两份 JS 语法、相对链接、SVG XML、`git diff --check` 通过。Boss 本地 TypeScript/Vite 通过，并在浏览器复验 1280/390/320px 双语无溢出、示意关闭/恢复和主动揭示、指南链接与精确下载哈希。
- 实现限定于公开介绍、静态主页、指南、资源与对应行为测试。演示明确是示意，未声称真实 API/PDF/完整卸载或签名通过；没有伪造用户数、评价、推广效果或已发帖子。
- 本地验收接受，公开部署结果待核查；已有安装包不替换，Desktop 工作区修改保留。
