# Security Policy

## Reporting

请不要在公开 Issue 中粘贴 API 密钥、数据库文件或包含论文内容的日志。发现安全问题时，请通过 GitHub Security Advisories 私下报告；如果仓库尚未启用该功能，请先联系维护者。

Do not paste API keys, database files, or paper content into public issues. Use GitHub Security Advisories for private reports when available.

## Data handling

PaperVocab stores translation keys in Windows Credential Manager. Translation requests are sent to the Base URL configured by the user. The project does not provide an account system or cloud sync.
