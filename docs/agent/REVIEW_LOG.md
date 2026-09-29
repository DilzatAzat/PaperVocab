# 审查记录

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
