# Windows 下载提示与分发方案

核查日期：2026-10-01。当前状态：Windows `v0.1.0` 未签名；没有提交 SignPath 申请，没有获得其服务。用户选择优先免费开源签名审批。

## 截图说明

Edge 的“通常不会下载”是下载信誉提示。它与未知发布者、运行时 SmartScreen 拦截、Defender 检测出具体威胁是不同情况。截图没有病毒检测结果，也不能据此证明程序安全。

当前公开安装包为 `PaperVocab_0.1.0_x64-setup.exe`，3,976,305 字节。SHA-256：

```text
97556ea2fcba7f92618017ac8795beeaec43a2e72bd495de6c28a1ae163c4efe
```

来源：[v0.1.0 Release](https://github.com/DilzatAzat/PaperVocab/releases/tag/v0.1.0)、同页 `SHA256SUMS.txt` 和实际下载文件。Authenticode 为 `NotSigned`。哈希只用于核对文件是否与公开资产一致，不代替签名、恶意软件检查或桌面验收。每个新版必须重新验证，不能沿用此哈希或签名结论。

## 可行路线

| 路线 | 费用/条件 | 实际效果与限制 | 本项目要做的事 |
| --- | --- | --- | --- |
| SignPath Foundation | 免费；开源、持续维护、已发布、可验证声誉；需审核 | 受信任签名及可追溯构建；签名后新文件仍可能提示。证书发布者是 SignPath Foundation，不是个人姓名 | 准备申请、角色/MFA/公开政策；获批后接入 CI、逐次人工批准。新项目不保证获批 |
| Microsoft Store MSIX | 当前新注册入口免费，官方标注 Worldwide；本人证件及自拍核验 | Store 重新签署 MSIX；官方说明从 Store 安装没有 SmartScreen 下载警告 | 单独打包 MSIX、真机兼容/迁移测试、素材和审核；现有 NSIS 包不能直接冒充 MSIX |
| Microsoft Store EXE/MSI | 免费账号，但需要自己的受信任 CA 签名 | Store 不为 EXE/MSI 重新签名 | 安装器及所有 PE 文件签名、离线安装、静默安装和固定版本 URL；现有 WebView2 按需下载不满足离线要求 |
| Azure Artifact Signing | $9.99/月起；公共信任个人仅美国/加拿大，组织另有地区范围，当前无中国 | 易于 CI 自动签名，初期仍可能提示 | 先核实地区、身份和计费资格；不能默认中国个人可用 |
| 商业 CA 硬件/云签名 | 付费、身份和国家资格审核；令牌或云 HSM | 验证发布者和文件完整性，不能保证首次免提示 | 比较总价、续费、地区和 CI 接入；不要为消除首次提示单独加钱购买 EV |
| 继续未签名公开测试版 | 免费 | 透明分发；不消除信誉提示 | 保留固定官方链接、真实版本/哈希、明确限制；审批期间的过渡方式 |

付费开源优惠可以作为后备：Certum OSS SimplySign 页面当前 €49 起但显示缺货，期限、税费、个人资格与禁止商业分发条款需确认；云签可能仍需手机 OTP。价格不是报价承诺，也不能假设可直接无人值守接入 GitHub Actions。

自签证书只适合受控内部环境。换域名、套 ZIP、改文件名、CDN/镜像、winget 不会替代受信任签名或消除执行信誉检查。不要关闭 SmartScreen/Defender、移除来源标记或刷下载次数。若将来出现具体恶意软件检出，再按 Microsoft 的误报渠道处理；当前少下载提示不属于这类申诉。

## 推荐执行顺序

1. **已实施的过渡措施**：主页中英文下载说明、对应 Release 的校验文件入口、已核实版本的大小/哈希/未签名状态；未知新版不继承旧版本的结论。检查脚本支持浏览器给文件名加 `(1)`，仍核对实际文件。双语 README 链接此说明。
2. **准备 SignPath 申请**：见 [SIGNPATH_APPLICATION.md](SIGNPATH_APPLICATION.md)。联系人、MFA、项目声誉、依赖许可和团队确认仍待补齐；本人提交协议和隐私同意。现在没有发送任何申请或接受协议。
3. **获批后实施**：应用 EXE → NSIS 安装包 → 时间戳/签名门禁 → 最终 SHA-256 → 干净 Windows 验收 → 新版本 Release → 更新主页。实际卸载程序也独立核查。不要替换已有 v0.1.0 资产。
4. **免费备选 MSIX**：若免费签名未获批、等待时间不可接受，或希望商店安装体验，启动 Store 适配；账号审核和发布仍需本人完成。

MSIX 的明确验收项：现有 SQLite 数据迁移及 AppData 重定向、Credential Manager 身份与访问、WebView2 依赖、普通用户安装/升级/卸载、托盘退出、全局快捷键、SendInput 跨应用取词、单实例。Tauri 原生 NSIS 构建成功不代表 MSIX 兼容。当前尚未生成或验收 MSIX。

完整真实 PDF、真实 API、卸载与重装步骤见 [WINDOWS_TEST.md](WINDOWS_TEST.md)；当前安装烟测不能替代这些项目。SignPath 签名也不是这些功能验收的替代品。

## English quick reference

Edge's "not commonly downloaded" message is a reputation warning, not evidence of a specific malware detection. The current Windows v0.1.0 installer is unsigned. A matching SHA-256 confirms consistency with the published file, not publisher identity or a security audit.

The preferred route is a free SignPath Foundation application, subject to eligibility and reputation review. No application has been sent or approved. Microsoft Store MSIX is a free alternative with identity verification, a new package format and desktop compatibility testing. Store EXE/MSI still requires the developer's own trusted signing certificate. Paid cloud/CA signing has identity, region and cost constraints; a new trusted signature does not guarantee immediate SmartScreen reputation. Self-signing, ZIP files, mirrors and renaming cannot replace trusted public signing.

The site now exposes version-specific notes and checksums. The [application draft](SIGNPATH_APPLICATION.md) identifies outstanding requirements; see the bilingual [code signing policy](../CODE_SIGNING_POLICY.md) and [privacy policy](../PRIVACY.md). Signing approval, MFA confirmation, actual signatures and full Windows acceptance remain outstanding. Do not disable protection to suppress a warning.

## Official sources / 官方依据

- [Microsoft SmartScreen 信誉](https://learn.microsoft.com/en-us/windows/apps/package-and-deploy/smartscreen-reputation)：发布者/文件信誉、自签及 EV 的限制；不承诺具体多少下载或多少天会消失。
- [Microsoft 签名方案比较](https://learn.microsoft.com/en-us/windows/apps/package-and-deploy/code-signing-options)：Store MSIX 与 EXE/MSI 的差别。
- [Store 注册类型、地区与费用](https://learn.microsoft.com/en-us/windows/apps/publish/partner-center/account-types-locations-and-fees)：使用新的 [注册入口](https://storedeveloper.microsoft.com/)，旧入口可能仍显示旧收费流程。具体证件/账号通过与否以本人审核为准。
- [Store EXE/MSI 要求](https://learn.microsoft.com/en-us/windows/apps/publish/publish-your-app/msi/app-package-requirements)、[MSIX 包装准备](https://learn.microsoft.com/en-us/windows/msix/desktop/desktop-to-uwp-prepare)。
- [SignPath 条款](https://signpath.org/terms)、[申请表](https://signpath.org/apply)。
- [Azure Artifact Signing FAQ](https://learn.microsoft.com/en-us/azure/artifact-signing/faq)、[资格与设置](https://learn.microsoft.com/en-us/azure/artifact-signing/quickstart)。
- [Tauri Windows 签名](https://v2.tauri.app/distribute/sign/windows/)、[Microsoft Store](https://v2.tauri.app/distribute/microsoft-store/)。
- [Certum OSS SimplySign](https://shop.certum.eu/open-source-code-signing-on-simplysign.html)、[申请材料与限制](https://support.certum.eu/en/code-signing-required-documents/)。
