# SignPath 免费开源签名申请草稿

日期：2026-10-01。**未提交、未获批、未配置签名。** 这是按实际申请表准备的材料，不是服务背书。表单：[signpath.org/apply](https://signpath.org/apply)。

## 资格与缺口

- 项目已公开、MIT、已发布 Windows NSIS；GitHub Actions 有可追溯构建。这些可核查，但不等于所有条件均满足。
- 最大缺口是可验证的项目声誉：仓库 2026-09-29 创建；2026-10-01 查询显示 1 star、0 fork、Windows 安装包下载 5 次，其中包括开发者验证下载。没有已核实媒体、第三方评测或用户规模。不能把这些计数写成广泛使用，也不买 star 或刷下载。维护者可补充真实用户反馈、公开演示和独立介绍链接。
- 所有参与维护/签名的人需确认 GitHub 与 SignPath MFA。当前没有核查账号的 MFA 状态。
- 需要本人确认团队角色。当前公开仓库 owner 是 [DilzatAzat](https://github.com/DilzatAzat)，下文建议由该维护者承担作者、审查者、发布批准者；AI 代理不是服务账号或可承担批准责任的人员。
- 需审计包括打包工具、字体和运行时在内的组件许可及 SignPath 的 System Libraries 例外；当前只确认项目 MIT、图标字体 OFL，未完成完整依赖资格审计。
- [Code signing policy](../CODE_SIGNING_POLICY.md) 与 [Privacy policy](../PRIVACY.md) 已准备。申请表要求下载页声明使用 SignPath；当前尚未获得服务，因此主页只能链接准备中的政策，不能写成已获资助。提交时说明该差别，请 SignPath 明确审核前应如何表述；获批后按要求加服务鸣谢。

## 实际表单填写内容

以下英文可以复制，提交前由维护者核对。

| 表单字段 | 建议内容 |
| --- | --- |
| Project Name | PaperVocab |
| Repository URL | https://github.com/DilzatAzat/PaperVocab |
| Homepage URL | https://dilzat.com/PaperVocab/ |
| Download URL | https://dilzat.com/PaperVocab/#download |
| Privacy Policy URL | https://github.com/DilzatAzat/PaperVocab/blob/master/PRIVACY.md |
| Wikipedia URL | 留空，没有已核实的条目 |
| Maintainer Type | 选择实际符合本人情况的个人/独立维护者；不要虚构公司 |
| Build System | GitHub Actions（按表单实际选项选择） |
| First Name / Last Name / Email | **由本人填写**，用于 SignPath 账户及申请通知；不要从 Git 提交推断姓名或邮箱 |
| Company Name | 仅有真实机构时填写，否则留空 |
| Primary Discovery Channel | 按实际来源选择 AI assistant / other 等实际选项 |
| Exact source (optional) | Codex-assisted research, verified against SignPath Foundation's official website. |

**Tagline**

```text
A local vocabulary companion for readers of English research papers.
```

**Description**

```text
PaperVocab helps readers collect vocabulary from English research papers without leaving their reading workflow. Users select text in a PDF reader or browser and invoke a global shortcut to save the word locally and request an explanation from their own configured translation API. A local word library and simple spaced review help users revisit what they have learned. The project is openly developed under the MIT License and provides publicly downloadable desktop releases.
```

**Reputation — 诚实的初期项目说明，需补充真实独立证据**

```text
PaperVocab is a newly released project, not yet widely used. Its public repository was created on September 29, 2026. As of October 1, 2026, the repository had 1 star and 0 forks, and the Windows v0.1.0 installer had 5 GitHub asset downloads, including maintainer validation downloads. We do not have verified independent media coverage or a large user base to claim.

Public repository and history: https://github.com/DilzatAzat/PaperVocab
Windows release: https://github.com/DilzatAzat/PaperVocab/releases/tag/v0.1.0
Build workflow: https://github.com/DilzatAzat/PaperVocab/actions/workflows/release.yml
Homepage and download: https://dilzat.com/PaperVocab/
Code signing policy (preparation status): https://github.com/DilzatAzat/PaperVocab/blob/master/CODE_SIGNING_POLICY.md

We understand that verifiable project reputation is required and that this early-stage application may not qualify yet. We would appreciate guidance on the additional evidence required. No SignPath sponsorship or signed release is currently claimed; the required acknowledgement will be added after approval and signing integration.
```

## 本人提交时必须确认

申请表要求本人姓名和邮箱，并要求同意 Code of Conduct（证书以 SignPath Foundation 名义签发且可撤销）及个人信息处理；另有可选营销通信，非必选。本人阅读条款后提交及处理 CAPTCHA，不在仓库保存私人联系人、账号凭据或证件。没有替本人勾选协议或发送表单。

提交后仅在确实收到提交/受理证据时记录“已提交”；不把“已提交”写成“已获批”。如果因声誉不足被拒绝，保存原因、继续公开维护和真实反馈，或转 Store MSIX 路线；不反复提交相同材料。

## 获批后工程工作

先根据真实获批的 organization/project/policy/artifact configuration 配置 GitHub Actions。未经获批不放假凭据或不可执行的签名工作流。签署本项目应用及最终安装包、限制产品名与版本、启用时间戳、每次人工批准、最终签名门禁及签后哈希，详见 [WINDOWS_SIGNING.md](WINDOWS_SIGNING.md)。公开策略中再加入准确的服务鸣谢、已确认角色和真实签名版本；按 [WINDOWS_TEST.md](WINDOWS_TEST.md) 补齐真实安装/卸载/取词验收后发布新版本。
