# 贡献指南 / Contributing

## 中文

1. Fork 仓库并创建独立分支。
2. 修改前阅读 AGENTS.md、docs/agent/STATE.md 和 docs/agent/ROADMAP.md。
3. 保持变更聚焦，不提交 API 密钥、SQLite 数据库或构建产物。
4. 本地运行 scripts/verify.ps1，桌面交互按 docs/WINDOWS_TEST.md 记录。
5. Pull Request 说明用户影响、验证命令和未验证项。

新增翻译服务适配时，必须明确请求协议、响应结构、超时和错误处理，并补充 mock 测试。

## English

1. Fork the repository and create a focused branch.
2. Read AGENTS.md, docs/agent/STATE.md, and docs/agent/ROADMAP.md first.
3. Do not commit API keys, SQLite databases, or build artifacts.
4. Run scripts/verify.ps1; record desktop checks from docs/WINDOWS_TEST.md.
5. Describe user impact, verification commands, and unverified items in the pull request.

New translation adapters must document their protocol, response shape, timeout, and error handling, with mock coverage.
