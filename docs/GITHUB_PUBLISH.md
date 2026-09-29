# GitHub 发布步骤

当前工程已经准备好双语 README、独立 `site/` 宣传主页、GitHub Pages 工作流、MIT License、Issue/PR 模板、Windows CI 和 tag 发布工作流。尚未自动推送，因为目标 GitHub 仓库地址和登录授权需要由维护者确认。

## 首次上传

在 GitHub 创建一个空仓库后，在本地执行：

    cd C:\Users\ROG\Desktop\paperVocab
    git remote add origin https://github.com/<你的用户名>/<仓库名>.git
    git push -u origin master

## 发布可下载版本

    git tag v0.1.0
    git push origin v0.1.0

release.yml 会在 Windows runner 上重新构建 NSIS 安装包，并自动附加到 GitHub Release。发布前请确认 README.md 中的截图路径和仓库地址已经正确。

## 发布宣传主页

仓库 `Settings -> Pages -> Build and deployment` 选择 `GitHub Actions`。之后每次推送 `master` 或 `main` 中的 `site/` 修改，`pages.yml` 会自动部署：

    https://<你的用户名>.github.io/<仓库名>/

主页的主按钮指向当前版本的 Windows NSIS 安装包，旁边保留 GitHub Release 页面入口。自定义域名的 DNS 与 Pages 设置见 [DOMAIN.md](DOMAIN.md)。

## 宣传素材

可复制 docs/LAUNCH.md 中的中英文介绍，用于 GitHub Release、知乎、掘金或社交媒体。宣传内容应明确第一版限制，不把未验证的 PDF/翻译兼容性写成保证。
