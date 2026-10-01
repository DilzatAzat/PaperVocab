# Windows 安装包签名

当前公开的 `v0.1.0` 安装包与应用 EXE 未签名；Release 工作流尚未接入签名服务。本文件和检查脚本是准备工作，不代表已经取得证书、签名或通过 SmartScreen。不要替换现有 `v0.1.0` 的公开资产；签名接入后发布新版本。

## 选择签名方式

Windows 需要受信任的 **Authenticode 代码签名**，用于验证发布者及文件是否被修改。SHA-256 校验文件不能替代发布者签名；Tauri 自动更新所用的签名也不是 Authenticode。自签证书适合内部测试，不能解决普通用户电脑上的公众信任问题。

对这个开源项目，可先申请 [SignPath Foundation](https://signpath.org/terms) 的免费开源签名服务。它需要审核项目及可验证的信誉、启用双重认证、明确团队角色，并由授权人员批准每次发布；新项目不保证立即获批。应先完成申请与审核，再按照获批的服务配置接入 CI，不能把申请中写成已签名。

如果希望更快获得可用于公开分发的签名，可以评估付费云签名（如 Microsoft Azure Artifact Signing）或受信任 CA 的代码签名证书。云服务有地区及身份资格限制，购买前需核对本人或组织是否符合要求；传统证书通常涉及身份审核，以及硬件令牌或合规云硬件保护。不要根据旧教程假定新证书可以导出为任意 PFX 文件。Tauri 官方 PFX 示例注明主要适用于 2023 年 6 月前颁发的 OV 证书。

**取得受信任签名不保证立即消除 SmartScreen 提示。** 应用及发布者还需要信誉积累，EV 证书也不保证首次下载无提示。不要在宣传页承诺“已签名即可彻底免提示”。

## 接入 Tauri 与发布流程

1. 确定服务、完成身份审核，并获得签名权限。云签名优先使用服务支持的短期身份或受控凭据；私钥应由硬件或服务保管，不进入仓库、日志、安装包。
2. 配置 Tauri 在打包期间签署应用 EXE，再签署包含该应用的最终 NSIS 安装包。只给已经生成的 setup EXE 签名，不会自动签署其内部应用。
3. 使用 SHA-256 摘要与 RFC 3161 时间戳，使签名可在签署证书过期后依据签署时间继续验证。时间戳服务器依服务选择；时间戳失败应使签名发布失败。
4. 对最终应用和安装包执行下述签名检查，再在干净 Windows 环境验收。检查实际安装目录中的应用 EXE 签名，确保安装包内确实是已签版本；另用 `Get-AuthenticodeSignature -LiteralPath <实际卸载程序路径>` 核对安装后的 `uninstall.exe`，不能根据应用和 setup 的签名推断卸载程序也已签名。
5. **签名之后**生成 `SHA256SUMS.txt`；签名会改变文件哈希。发布新版本安装包及其校验文件，重新下载公开文件核对，再更新主页备用下载版本。

如果证书已经由提供商安装在 Windows 证书存储区且其私钥允许签名，可用本地覆盖配置。下面只是配置示例，不是已安装证书：

```json
{
  "bundle": {
    "windows": {
      "certificateThumbprint": "替换为自己的证书指纹",
      "digestAlgorithm": "sha256",
      "timestampUrl": "http://timestamp.digicert.com",
      "tsp": true
    }
  }
}
```

将实际配置保存在已忽略的 `src-tauri/tauri.signing.local.json`，在已配置证书访问的 Windows 构建机运行：

```powershell
pnpm exec tauri build --bundles nsis --config src-tauri/tauri.signing.local.json
```

硬件令牌、云签名或其他提供商可能需要 Tauri 的 `signCommand` 适配其工具，而不是使用证书指纹；按照提供商的获批流程接入。当前 `.github/workflows/release.yml` 尚未配置这些内容，直接推送 tag 仍会生成未签名包。取得服务后再实现相应步骤和签名失败门禁，不提前放入未经验证的账号或私钥占位配置。

## 只读校验

`scripts/check-release.ps1` 兼容 Windows PowerShell 5.1 和 PowerShell 7，不读取 API 密钥，不安装、卸载或修改文件。`-Checksums` 默认按安装包的精确文件名查找唯一校验条目，哈希不符、条目缺失、重复或格式错误均失败。浏览器重命名文件时，可用 `-AssetName` 显式指定原发布资产名；不自动模糊匹配，仍计算 `-Installer` 指定的真实文件。没有 `-RequireSigned` 时报告签名状态，但允许当前未签名版本。

下载公开安装包及同一 Release 的 `SHA256SUMS.txt` 后：

```powershell
.\scripts\check-release.ps1 `
  -Installer "$env:USERPROFILE\Downloads\PaperVocab_0.1.0_x64-setup.exe" `
  -Checksums "$env:USERPROFILE\Downloads\SHA256SUMS.txt"
```

如果浏览器保存为带 `(1)` 的文件，使用：

```powershell
.\scripts\check-release.ps1 `
  -Installer "$env:USERPROFILE\Downloads\PaperVocab_0.1.0_x64-setup (1).exe" `
  -Checksums "$env:USERPROFILE\Downloads\SHA256SUMS.txt" `
  -AssetName "PaperVocab_0.1.0_x64-setup.exe"
```

免费申请准备和其他分发路线见 [SIGNPATH_APPLICATION.md](SIGNPATH_APPLICATION.md) 与 [DOWNLOAD_TRUST.md](DOWNLOAD_TRUST.md)。

接入签名后，门禁还要求同时传入应用 EXE。以下命令对当前未签名 `v0.1.0` **应当失败**：

```powershell
.\scripts\check-release.ps1 `
  -Installer .\src-tauri\target\release\bundle\nsis\PaperVocab_0.1.0_x64-setup.exe `
  -ApplicationExe .\src-tauri\target\release\papervocab.exe `
  -RequireSigned
```

新版本需替换文件名，并增加对应的 `-Checksums`。门禁要求两份文件的 Authenticode 状态均为 `Valid`，且均存在时间戳证书；这不是 SmartScreen 信誉验收。若安装了 Windows SDK，也应运行 `signtool verify /pa /all /v <文件路径>`，复核签名策略及时间戳详细结果。

## 官方依据

核查日期：2026-10-01。

- [Tauri 2：Windows 代码签名](https://v2.tauri.app/distribute/sign/windows/)：证书存储、时间戳、`signCommand` 及旧 PFX 方案的适用范围。
- [Microsoft：SmartScreen 信誉](https://learn.microsoft.com/en-us/windows/apps/package-and-deploy/smartscreen-reputation)：受信任签名与应用信誉的区别，自签及 EV 的限制。
- [SignPath Foundation 条款](https://signpath.org/terms)：免费开源服务的资格、安全与人工发布批准要求。
- [Microsoft Azure Artifact Signing](https://learn.microsoft.com/en-us/azure/artifact-signing/overview)：云签名服务；需进一步核对当前地区、身份资格及定价。
