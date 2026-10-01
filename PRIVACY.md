# Privacy policy / 隐私政策

Updated / 更新：2026-10-01。适用范围：PaperVocab 桌面软件及 [下载主页](https://dilzat.com/PaperVocab/)。

## 中文

**本地数据。** 单词、释义、遇见记录、复习记录和非密钥设置保存在本机 SQLite。API 密钥使用 Windows 凭据管理器或 macOS Keychain 保存，不写入数据库、前端持久化、日志、JSON 导出或 Git。程序没有账号、云同步或项目自建的词库收集服务。

**取词与翻译。** 按全局快捷键时，程序通过模拟复制读取本次选区，临时读取剪贴板并尝试有条件恢复可支持的内容；不会持续监听或上传剪贴板历史。手动输入也可收词。发起翻译时，所收文本、所选模型和目标语言及释义提示发送至用户配置的 API 地址，API 密钥作为认证发送给该服务。当前默认地址是 OpenAI，但用户可更改；未配置密钥不能完成翻译。服务商会收到请求内容及通常的网络信息（如 IP），其保存、训练和收费政策由所选服务商决定。不要发送无权外传的论文内容；确认使用 HTTPS 和所信任的服务。

**其他服务。** Windows 安装时若缺少 WebView2，安装器可能从 Microsoft 下载运行时；Microsoft Edge WebView2 的网络/诊断行为由 Microsoft 的产品及隐私政策约束。桌面程序没有额外接入项目分析统计或广告 SDK。主页由 GitHub Pages 提供，查询 GitHub API 的公开版本信息，下载文件来自 GitHub Releases；GitHub 会收到页面/API/下载请求的网络信息。主页仅在浏览器本地存储语言选择，没有加入项目自建分析或广告追踪。相关第三方政策：[GitHub](https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement)、[Microsoft](https://privacy.microsoft.com/privacystatement)、[OpenAI（仅使用该服务时）](https://openai.com/policies/privacy-policy/)。其他翻译服务请查其官网政策。

**导出与删除。** JSON 备份不包含 API 密钥，但词汇和原句等内容可能属于私人数据，请自行妥善保存。不把私人备份、密钥或论文全文上传至公开 Issue。卸载应用不保证删除本地词库或系统凭据；删除前先备份，并按系统凭据管理器/Keychain 的正常流程处理。实际卸载保留行为仍需按 [Windows](docs/WINDOWS_TEST.md) / [Mac](docs/MACOS_TEST.md) 清单验证。

**联系。** 一般问题可在 [仓库 Issues](https://github.com/DilzatAzat/PaperVocab/issues) 提出；安全问题按 [SECURITY.md](SECURITY.md) 私下报告。不要在公开反馈中提交个人秘密。功能或数据流改变时更新本文件。

## English

**Local data.** Vocabulary, explanations, encounters, review events and non-secret settings stay in local SQLite. API keys use Windows Credential Manager or macOS Keychain and are excluded from the database, frontend persistent storage, logs, JSON exports and Git. There are no accounts, cloud sync or project-operated vocabulary collection services.

**Capture and translation.** A global shortcut triggers a simulated copy of the current selection, a temporary clipboard read and conditional restoration of supported content. PaperVocab does not continuously monitor or upload clipboard history. Manual input is also available. Translation sends the collected text, model, target language and explanation prompt to the API URL configured by the user, with the API key sent for authentication. OpenAI is the default URL, but users can change it; translation requires a key. The chosen provider receives request content and normal network information such as IP addresses. Its own retention, training and billing policies apply. Use trusted HTTPS endpoints and do not send paper content you are not allowed to disclose.

**Other services.** If WebView2 is missing, the Windows installer may download it from Microsoft. Microsoft Edge WebView2's network and diagnostic behavior is governed by Microsoft's policies. The desktop app adds no project analytics or advertising SDK. GitHub Pages serves the website, GitHub's API supplies public release information, and GitHub Releases serves downloads; GitHub receives the associated network requests. The site stores only the chosen language in browser local storage and adds no project analytics or advertising tracking. Relevant policies: [GitHub](https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement), [Microsoft](https://privacy.microsoft.com/privacystatement), and [OpenAI, if selected](https://openai.com/policies/privacy-policy/). Consult other translation providers' own policies when using them.

**Export and removal.** JSON backups omit API keys but may contain private vocabulary and sentences. Keep them private. Do not upload keys, private backups or entire papers to public issues. Uninstalling the app does not guarantee deletion of the local library or system credentials; back up before deleting data and use the platform's credential manager for key removal. Retention after uninstall still needs the [Windows](docs/WINDOWS_TEST.md) / [Mac](docs/MACOS_TEST.md) acceptance checks.

**Contact.** Use [repository issues](https://github.com/DilzatAzat/PaperVocab/issues) for general questions and [SECURITY.md](SECURITY.md) for private security reporting. Keep secrets out of public reports. This document will be updated when features or data flows change.
