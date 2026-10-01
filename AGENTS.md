# PaperVocab 工程说明

PaperVocab 是独立的 Windows 桌面项目。不要修改旧博客，不要复制博客的 Jekyll 路由、部署配置或历史进度。

## 恢复入口

每次继续工作前先读本文件、docs/agent/STATE.md、docs/agent/ROADMAP.md，再检查 git status 和实际代码。保留用户已有修改。工作循环是 Understand -> Plan -> Implement -> Verify -> Review -> Repair -> Accept。

## 真实命令

- pnpm install
- pnpm test
- pnpm exec tsc --noEmit
- pnpm exec vite build
- cargo check --manifest-path src-tauri/Cargo.toml
- pnpm tauri dev
- pnpm tauri build

数据保存在 Windows 应用数据目录的 SQLite 中。翻译密钥只进入 Windows 凭据管理器。不要把密钥写入数据库、前端持久化、日志、导出或 Git。未在 Windows 实测的系统交互必须标为待实测。

## 发行签名与验收

当前 master 维护双平台宣传主页；应用开发使用对应平台分支。下载信誉方案见 docs/DOWNLOAD_TRUST.md，免费签名申请准备见 docs/SIGNPATH_APPLICATION.md，签名接入见 docs/WINDOWS_SIGNING.md；实际桌面验收见 docs/WINDOWS_TEST.md 和 docs/MACOS_TEST.md。

只读发行检查命令为 `./scripts/check-release.ps1 -Installer <实际安装包> -Checksums <同一Release的SHA256SUMS.txt>`。浏览器给文件名加了 `(1)` 时显式加 `-AssetName <Release原始文件名>`，仍核对实际下载文件的哈希。签名接入后加入 `-ApplicationExe <应用EXE> -RequireSigned`；当前未签名包必须被门禁拒绝。不要以 mock 签名测试、已保存的 API 配置或构建成功代替真实验收。签名服务审核、人工批准和真实发布证据缺一不可，不提前宣称已申请、获批或签名。
