# 审查记录

## 2026-09-27

- 旧博客 harness 已只读检查；确认其流程文档和 Jekyll 命令不适用于本项目。
- TypeScript、Vite、Rust cargo check 已通过。
- 修复 Tauri NSIS installMode 配置、Windows 输入 API 类型和缺失图标资源。
- 第一轮独立审查发现并修复：密钥参数映射、浮窗权限、修饰键释放等待、翻译失败落库、缓存优先、翻译并发释放、主窗关闭驻留、失败浮窗提示、复习推进、托盘图标。
- 第二轮构建门禁：cargo clippy --all-targets -- -D warnings 通过；NSIS 重新生成成功。
- 待审：真实 PDF 系统交互、快捷键冲突、安装包安装/卸载、mock 翻译协议和完整导入 UI。
