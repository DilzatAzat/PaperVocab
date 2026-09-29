# GitHub 发布步骤

公开仓库 [DilzatAzat/PaperVocab](https://github.com/DilzatAzat/PaperVocab) 已创建，`master` 已推送；[宣传主页](https://dilzatazat.github.io/PaperVocab/) 已通过 GitHub Pages 部署。双语 README、MIT License、Issue/PR 模板、Windows CI 和 tag 发布工作流已配置。Windows 安装包尚未发布。

## 后续推送

后续推送执行：

    git push origin master

本机当前 Git 直连 GitHub 会超时；若系统代理仍是 `127.0.0.1:9567`，可用 `git -c http.proxy=http://127.0.0.1:9567 push origin master`。代理端口变化时按 Windows 当前代理设置调整。

## 发布可下载版本

    git tag v0.1.0
    git push origin v0.1.0

`release.yml` 会在 Windows runner 上重新构建 NSIS 安装包，并自动附加到 GitHub Release。发布前完成 `docs/WINDOWS_TEST.md` 中的真实安装和取词验收。

## 发布宣传主页

仓库 Pages 已选择 GitHub Actions。之后每次推送 `master` 或 `main` 中的 `site/` 修改，`pages.yml` 会自动部署：

    https://dilzatazat.github.io/PaperVocab/

主页会检查 GitHub 最新 Release：存在 NSIS 安装包时主按钮直达该资产；尚未发布或检查失败时，主按钮指向 Releases 页面并显示对应状态。自定义域名的 DNS 与 Pages 设置见 [DOMAIN.md](DOMAIN.md)。

## 宣传素材

可复制 docs/LAUNCH.md 中的中英文介绍，用于 GitHub Release、知乎、掘金或社交媒体。宣传内容应明确第一版限制，不把未验证的 PDF/翻译兼容性写成保证。
