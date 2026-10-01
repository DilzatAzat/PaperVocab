# GitHub 发布步骤

公开仓库 [DilzatAzat/PaperVocab](https://github.com/DilzatAzat/PaperVocab) 与 [宣传主页](https://dilzat.com/PaperVocab/) 已上线。双语 README、MIT License、Issue/PR 模板、Windows CI 和 tag 发布工作流已配置。[v0.1.0](https://github.com/DilzatAzat/PaperVocab/releases/tag/v0.1.0) 已公开 NSIS 安装包与 SHA-256 文件，下载校验通过。

## 后续推送

后续推送执行：

    git push origin master

本机当前 Git 直连 GitHub 会超时；若系统代理仍是 `127.0.0.1:9567`，可用 `git -c http.proxy=http://127.0.0.1:9567 push origin master`。代理端口变化时按 Windows 当前代理设置调整。

## 发布可下载版本

首个 `v0.1.0` tag 已发布。后续版本先同步 package/Tauri/Cargo 版本和发布说明，再创建新的 tag，例如：

    git tag -a v0.1.1 -m "PaperVocab v0.1.1"
    git push origin v0.1.1

发布前准备与 tag 同名的双语说明，例如 `docs/releases/v0.1.0.md`，核对版本号、自动检查、安装烟测及已知限制。完整桌面验收按 `docs/WINDOWS_TEST.md` 执行，未执行项目必须如实列入发布说明。

`release.yml` 会在 Windows runner 上重新构建 NSIS 安装包，生成 `SHA256SUMS.txt`，并将两者附加到 GitHub Release。tag、package.json、Tauri 配置和 Cargo 的版本必须一致。

工作流成功后下载公开安装包和 `SHA256SUMS.txt`，比对 SHA-256；确认资产名称、版本及下载链接正确后，更新 `site/release.js` 的 `window.PAPERVOCAB_RELEASE`，采用 GitHub Release 的 `tag_name` 与 `assets` 字段格式。同时更新 `site/index.html` 中 `release.js?v=版本号` 的版本，避免浏览器继续使用旧缓存。只记录真实已发布且下载验证过的安装包。

## 发布宣传主页

仓库 Pages 已选择 GitHub Actions。之后每次推送 `master` 或 `main` 中的 `site/` 修改，`pages.yml` 会自动部署：

    https://dilzat.com/PaperVocab/

首屏和下载区的按钮均直达安装包。主页先使用 `site/release.js` 中已验证的公开版本，再查询 GitHub 的最新 Release；查询暂时失败时仍能下载已验证版本。无已验证版本且未查询到安装包时，按钮指向 Releases 页面并显示对应状态。自定义域名的 DNS 与 Pages 设置见 [DOMAIN.md](DOMAIN.md)。

## 宣传素材

可复制 docs/LAUNCH.md 中的中英文介绍，用于 GitHub Release、知乎、掘金或社交媒体。宣传内容应明确第一版限制，不把未验证的 PDF/翻译兼容性写成保证。
