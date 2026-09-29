# PaperVocab 路线

- [x] Harness：独立目录、状态入口、真实验证命令
- [x] M1 原型：单实例、托盘、全局快捷键、模拟复制、剪贴板序号和并发保护
- [x] M2 基础：SQLite 先保存、OpenAI 兼容翻译、密钥环、重试和竞态按记录写回
- [x] M3 工作台：今日/全部/日期/搜索/删除/复习/设置页面
- [x] M4 基础复习：三档评分和确定间隔
- [ ] M5：Windows 真机 PDF、安装包安装启动退出、mock 翻译服务和导入导出完整验收（代码门禁与 NSIS 构建已通过，桌面交互仍待人工执行；导入/导出 UI 尚未补齐）

## 发布主页

- [x] 独立双语宣传主页：`site/index.html`、`site/styles.css`、`site/app.js`
- [x] GitHub Pages 自动部署：`.github/workflows/pages.yml`
- [x] Release 下载入口、双语 README、发布/域名/宣传文档
- [x] 创建公开仓库 `DilzatAzat/PaperVocab`，推送 `master`，启用并验证 GitHub Pages
- [ ] 完成 Windows 真机验收后推送首个 tag，验证 Release 安装包公开下载链接

## 后续方向（不属于当前桌面版）

- [ ] 支持更多翻译 API 协议；当前仅支持兼容 OpenAI Chat Completions 的服务。
- [ ] 支持更多目标语言或为同一单词保留多语言释义；当前可选中文、English、Deutsch、Français、日本語，单词只保留最近目标语言释义。
- [ ] 评估手机端复习和跨设备接续，先明确账号、同步和隐私模型。

## 第一版验收

配置 API 后，在可复制 PDF 中选中文本按 Ctrl+Shift+L，看到浮窗释义，重启仍能查看，并完成一次复习。
