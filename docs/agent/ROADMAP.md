# PaperVocab 路线

## README 与宣传主页更新

- [x] 双语 README、首次使用指南、产品示意与公开首次体验反馈表单
- [x] 宣传主页视觉与交互更新，保留双平台下载和文件校验
- [x] 推广执行手册：真实演示、首批试用、渠道文案与反馈指标
- [x] 本地 27 项测试、构建、三个视口双语浏览器验证和新鲜独立审查
- [ ] 本轮 master 推送、Pages/Windows CI 与正式站核验

验收：读者能看懂用途、找到对应平台安装包和 API 配置指南；示意与真实验收、免费软件与 API 收费、网页双语与中文桌面界面清楚区分。推广计划不得把目标人数当作实际用户，也不得未经授权发帖。

- [x] Harness：独立目录、状态入口、真实验证命令
- [x] M1 原型：单实例、托盘、全局快捷键、模拟复制、剪贴板序号和并发保护
- [x] M2 基础：SQLite 先保存、OpenAI 兼容翻译、密钥环、重试和竞态按记录写回
- [x] M3 工作台：收词汇总（全部词、可选日期筛选、搜索、删除）、复习、设置页面
- [x] M4 基础复习：三档评分和确定间隔
- [ ] M5：Windows 真机 PDF、安装包安装启动退出、mock 翻译服务和导入导出完整验收（代码门禁与 NSIS 构建已通过，桌面交互仍待人工执行；导入/导出 UI 尚未补齐）

## 发布主页

- [x] 独立双语宣传主页：`site/index.html`、`site/styles.css`、`site/app.js`
- [x] GitHub Pages 自动部署：`.github/workflows/pages.yml`
- [x] Release 下载入口、双语 README、发布/域名/宣传文档
- [x] 创建公开仓库 `DilzatAzat/PaperVocab`，推送 `master`，启用并验证 GitHub Pages
- [x] 品牌标记改为单枚艺术化 P；主页同步收词汇总、首次收录日期筛选和真实翻译 API 数据流
- [x] 发布首个 `v0.1.0` tag，公开 NSIS 安装包与 SHA-256 校验文件，真实下载并核对校验和
- [x] 正式宣传主页中英文按钮直接下载安装包，公开包安装/启动烟测通过；API 查询失败备用下载已验证
- [ ] 完成 `docs/WINDOWS_TEST.md` 中尚未验收的完整 Windows 系统交互，继续改进后续版本

## 后续方向（不属于当前桌面版）

- [ ] 支持更多翻译 API 协议；当前仅支持兼容 OpenAI Chat Completions 的服务。
- [ ] 支持更多目标语言或为同一单词保留多语言释义；当前可选中文、English、Deutsch、Français、日本語，单词只保留最近目标语言释义。
- [ ] 评估手机端复习和跨设备接续，先明确账号、同步和隐私模型。

## 第一版验收

配置 API 后，在可复制 PDF 中选中文本按 Ctrl+Shift+L，看到浮窗释义，重启仍能查看，并完成一次复习。


## macOS 版

- [x] 建立 Windows / macOS 平台分支，复用现有工作台和业务逻辑
- [x] 原生 Command+C/AX 焦点/pasteboard 保护、Keychain、辅助功能入口和浮窗适配
- [x] Apple Silicon 与 Intel CI：测试、Clippy、DMG、签名与启动烟测
- [x] 发布 macos-v0.1.0-beta.1，下载并核对两个 DMG 的 SHA-256
- [x] 宣传主页双语 Mac 下载和网络失败备用入口
- [ ] 交互式 Mac 桌面完成 docs/MACOS_TEST.md 的真实 PDF、权限、焦点、剪贴板、API 和安装卸载验收
- [ ] 取得 Apple Developer 签名凭据，完成 Developer ID 签名与 Apple 公证

## Windows 下载信誉与免费签名

- [x] 核查少下载提示、真实包哈希与未签名状态，比较免费及付费分发路线
- [x] 官网双语下载说明、精确版本元数据与校验入口，保留 Mac 两种下载
- [x] Windows 签名和真实 PDF/API/隔离卸载验收文档、只读检查脚本及 `(1)` 重名处理
- [x] SignPath 英文申请草稿、双语代码签名政策与隐私政策；本地验证和独立审查
- [x] 本轮官网正式部署与生产校验（Pages/Windows CI 成功，校验文件实际点击下载与真实安装包匹配）
- [ ] 本人核对联系人/MFA/团队角色/组件许可并补真实项目声誉，提交 SignPath 申请（未提交）
- [ ] 获批后接入可追溯 CI 与人工签名批准、验证 EXE/setup/实际卸载程序及时间戳，发布新版本（未获批、未签名）
- [ ] 如免费签名不可用，评估 Microsoft Store MSIX，完成数据迁移与桌面兼容验收

验收：签名及版本声明与实际文件相符，最终公开哈希可复核；签名不代替完整 Windows 功能验收，也不承诺新文件立即免 SmartScreen。
