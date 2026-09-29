# 自定义域名 / Custom domain

GitHub Pages 项目站点可以先使用：

`https://<用户名>.github.io/<仓库名>/`

这不需要购买域名，适合先验证主页和下载流程。

## 购买域名后

1. 在域名注册商添加 DNS 记录。`www` 使用 CNAME 指向 `<用户名>.github.io`；根域名按 GitHub Pages 文档添加四条 A 记录。
2. 在仓库 `Settings -> Pages` 的 Custom domain 填写域名并保存。
3. 等待 DNS 生效后勾选 Enforce HTTPS。
4. 将真实域名写入 `site/CNAME`，提交后由 Pages 工作流继续发布。

当前没有写入占位 CNAME，避免把未购买的域名发布到 Pages。域名购买、DNS 修改和 GitHub 设置需要维护者本人操作；本项目已准备好静态站点和自动部署工作流。

## 下载链接

主页的主下载按钮指向当前版本的 GitHub Release 安装包，安装包由 `.github/workflows/release.yml` 在推送 `v*.*.*` tag 后构建并附加；旁边的 Release 页面入口用于查看更新说明。安装包不进入 Git 仓库，也不由 Pages 托管。
