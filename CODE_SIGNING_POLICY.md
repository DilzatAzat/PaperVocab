# Code signing policy / 代码签名政策

Updated / 更新：2026-10-01。

## Current status / 当前状态

Windows `v0.1.0` is unsigned. SignPath Foundation is a proposed free open-source signing route; no application has been submitted, no approval has been received, and no SignPath-signed release exists. The macOS preview uses ad-hoc signing, without Apple Developer ID signing or notarization.

Windows `v0.1.0` 未签名。项目拟优先申请 SignPath 免费开源签名；尚未提交、获批或发布 SignPath 签名版本。macOS 测试版仅有 ad-hoc 签名，没有 Apple Developer ID 签名或公证。

The public repository is [DilzatAzat/PaperVocab](https://github.com/DilzatAzat/PaperVocab). Published checksums identify release bytes; they are not a publisher signature or a security audit. See [download notes and options](docs/DOWNLOAD_TRUST.md).

公开校验和只能核对发布文件是否一致，不能代替发布者签名或安全审查。详见[下载说明和方案](docs/DOWNLOAD_TRUST.md)。

## Roles and planned signing process / 角色与拟定流程

- Public repository owner / 公开仓库所有者：[DilzatAzat](https://github.com/DilzatAzat)。
- Proposed author, reviewer and signing approver / 拟定作者、审查者和签名批准者：该维护者本人；服务接入前需本人确认角色、GitHub/SignPath MFA 和授权。没有其他已核实的签名成员。AI 工具仅辅助开发与审查，不能替代人工签名批准。
- Proposed release rules / 拟定发布规则：仅签署来自本项目可追溯源代码和 CI 的产物；审查外部贡献；限制产品名和版本；每次发布人工批准；签名与时间戳验证通过后生成哈希；已发布版本不原地替换。

These are preparation requirements, not a claim that a signing service is configured. After approval, this policy and the homepage/download page will identify the actual service, confirmed team roles and signed versions. If SignPath is approved, the required acknowledgement will read “Free code signing provided by SignPath.io, certificate by SignPath Foundation.” That acknowledgement is conditional, not a statement of present sponsorship.

上述为准备要求，签名服务尚未配置。获批后公开实际服务、确认的团队角色和已签名版本，再添加服务要求的鸣谢。不能提前宣称获得 SignPath 支持。

## Privacy and reporting / 隐私与反馈

Translation requests go to the API service selected by the user; the project does not receive a central copy of vocabulary or keys. The application and download site have distinct network behavior; see the bilingual [Privacy policy](PRIVACY.md) for provider, GitHub and WebView2 details.

翻译发往用户选择的 API，项目没有集中收取词库或密钥。软件和下载网站的网络行为不同，API 服务商、GitHub 和 WebView2 的相关说明见双语[隐私政策](PRIVACY.md)。安全问题按 [SECURITY.md](SECURITY.md) 私下报告，不附密钥或私人词库。
