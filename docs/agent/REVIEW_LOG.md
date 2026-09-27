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
