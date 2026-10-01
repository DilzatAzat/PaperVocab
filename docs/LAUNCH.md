# PaperVocab 推广执行手册

更新：2026-10-01。当前阶段：早期版本，先找愿意真实使用的论文读者，再扩大传播。本文件是计划与可用文案；没有替维护者发帖、联系他人、投广告或提交榜单。以下人数是目标，不是现有用户或效果保证。

## 核心定位

**面向英文论文读者的桌面词汇伴侣：选词、查释义、留在本地、稍后复习。**

优先人群：每周读英文论文、有可用翻译 API 的研究生、科研人员和工程师。首批不要泛投所有英语学习者：目前需要 API 配置、界面是中文、Windows 未签名、Mac 为未公证测试版，这些会直接影响下载后的成功率。

软件免费 ≠ 翻译免费；本地词库 ≠ 翻译文本不联网；OpenAI 兼容协议 ≠ 只能用 OpenAI 或所有 API 都已兼容。这三点每次发布都说清楚。

## 已准备的传播入口

- [产品主页](https://dilzat.com/PaperVocab/)：双语、产品流程示意、平台下载、首次配置和FAQ。
- [中文 README](../README.md) / [English README](../README.en.md)：下载、首次成功、功能和范围。
- [中文上手指南](GETTING_STARTED.md) / [English guide](GETTING_STARTED.en.md)：API 字段、失败排查和第一个词。
- [首次体验反馈](https://github.com/DilzatAzat/PaperVocab/issues/new?template=onboarding_feedback.yml)：记录完成到哪一步、系统/阅读器和可选发现渠道，不索取密钥。
- `site/media/social-card.png`：1200×630 的分享图；README SVG 为可编辑流程示意，不能称作真实软件截图。
- [真实验收](WINDOWS_TEST.md)、[Mac 验收](MACOS_TEST.md)与[签名申请](SIGNPATH_APPLICATION.md)：持续减少实际使用门槛。

GitHub 仓库 About 建议填下面的中性英文，并将 Website 设为官网。Topics 建议：`vocabulary`、`research-tools`、`pdf`、`language-learning`、`tauri`、`windows`、`macos`。这是待维护者设置的建议，不是已经改好的远端属性。

> A desktop vocabulary companion for English research papers. Capture a selection, translate with your own API, save locally, and review later.

仓库 Social preview 可手动上传上述分享图。GitHub 不会因为仓库中存在图片就自动将它设置为 Social preview；主页的 Open Graph 图片已在代码中配置。

## 第一阶段：找到 20 位试用者

建议按顺序推进，而不是按日期强行完成。

| 时段 | 行动 | 可交付结果 |
| --- | --- | --- |
| 第 1–2 天 | 用公开、可复制的论文和真实 API 执行取词→释义→重启→复习；邀请 3–5 位不同阅读器用户复核 | 一份不含密钥的验收记录、可复现问题清单 |
| 第 3 天 | 录制 30–45 秒真实演示，含首次配置说明和实际 PDF 操作 | 一条可重复发布的横屏视频、竖屏剪辑和 8–12 秒 GIF |
| 第 4–7 天 | 在自己已有的学术/实验室渠道邀请试用；发布一条 B站演示与一篇知乎或小红书使用笔记 | 首批真实反馈；目标找到 20 位愿意尝试的人 |
| 第 8–10 天 | 整理最常见的 3 个失败点，修复或改指南；公布真实更新记录 | 一个确实解决问题的后续版本或指引更新 |
| 第 11–14 天 | 用改进后的视频和反馈再发 V2EX/技术社区；再考虑英文开发者社区 | 针对渠道的原创介绍，而不是重复广告 |

要补真实演示前，当前页只能称“产品示意”。Mac 若没有真机演示，明确是测试版，优先推广已有真实验收证据的平台。广泛国际推广应在英文桌面界面和 Mac 实测补齐后推进。

## 视频如何拍

1. **0–5 秒：** “读英文论文，查过的词总是忘？”屏幕显示公开论文中的选区。
2. **5–15 秒：** 按实际快捷键，真实浮窗显示释义。可用放大的按键提示，但不替换 API 返回内容。
3. **15–25 秒：** 打开收词汇总，展示该词确实存在，重复遇见与日期筛选。
4. **25–35 秒：** 从托盘退出并重启，再找到该词，完成一次真实复习。
5. **35–45 秒：** 官网和下载入口。“软件免费，翻译用自己的兼容 API；Windows 早期版 / Mac 测试版。”

画面只用公开文本和专用测试配置；不录密钥、不剪辑失败来冒充全流程一次通过。保留无选区失败示例可以增强可信度。中文字幕版优先，英文版再加字幕。不要写“3秒安装”“100%无提示”“所有PDF都能翻译”。

## 各渠道怎么发

| 渠道 | 适合的内容 | 发帖后的动作 |
| --- | --- | --- |
| 实验室/研究生/论文阅读群 | 30秒真实演示＋具体邀请：“帮我测试你的阅读器，告诉我第一个词是否成功” | 征得管理员允许；回答配置问题并收集可复现步骤 |
| B站 | 45秒演示＋2分钟首次配置教程，标题直接说用途 | 置顶官网、指南、API费用与测试版说明；回复首批问题 |
| 小红书/知乎 | 真实阅读场景、使用前后步骤、平台要求和限制 | 以研究者日常流程写，避免泛泛“AI神器”；按平台规则放链接 |
| V2EX / 掘金等技术社区 | 开发者身份、具体痛点、真实演示、Tauri/本地数据取舍 | 遵守版面规则，公开回应缺陷，不群发同一稿 |
| GitHub | 清楚的README、更新记录、反馈模板、测试贡献入口 | 首先修复安装/配置失败；后续将有证据的问题标为适合贡献 |
| 英文社区 / Show HN / Product Hunt | 自然英文故事＋已完成的实机演示 | 先确认社区允许自荐，直接说明中文界面/BYOK/早期限制；更适合后续发布 |

每次只选 1–2 个渠道认真回答。不要自动群发、刷 Star、买评论、买下载或伪造评价。没有实际留存前不建议付费投流；下载提示和 API 配置会浪费广告预算。

## 可直接改用的中文文案

**标题 A（学术人群）**

> 读英文论文时，把查过的生词顺手留进词本：PaperVocab

**标题 B（技术社区）**

> 我做了一个论文阅读取词工具：快捷键查词、本地保存、稍后复习

**正文**

> 读论文时，生词查完就忘，来回复制也会打断思路。我做了 PaperVocab：在可复制的 PDF 或浏览器中选词，按快捷键，原词先保存到本地，再通过自己配置的 API 获取释义；读完可以搜索、按日期查看和做基础复习。
>
> 软件免费、MIT 开源，无需 PaperVocab 账号；翻译需要自己的 OpenAI Chat Completions 兼容 API，服务商可能收费。当前桌面界面是中文，Windows 为早期版且未签名，Mac 为未公证测试版；不支持扫描 PDF 的 OCR 和云同步。
>
> 主页：https://dilzat.com/PaperVocab/
> 源码：https://github.com/DilzatAzat/PaperVocab
>
> 想邀请经常读英文论文的朋友试用：你用哪个阅读器？第一个词能否成功翻译？哪些步骤最困惑？反馈可以直接提交 GitHub Issue。真实演示视频请在录好并验收后补到这里。

## English launch draft

**Title**

> PaperVocab — collect vocabulary while reading English research papers

**Post**

> I built PaperVocab for a small frustration in paper reading: looking up a word, returning to the paper, and forgetting it later. Select copyable text in a PDF reader or browser and press a shortcut. PaperVocab saves the original locally, requests an explanation from your own configured API, and keeps it available for search and simple review.
>
> The app is free and MIT licensed. It needs no PaperVocab account, but translation requires your own OpenAI Chat Completions-compatible API and may incur provider charges. The desktop UI is currently Chinese. Windows is an unsigned early release; macOS is an unnotarized preview. OCR and cloud sync are not included.
>
> Site: https://dilzat.com/PaperVocab/
> Source: https://github.com/DilzatAzat/PaperVocab
>
> I would appreciate feedback from readers of English papers: which reader do you use, did your first translation work, and where did you get stuck? Add a verified real desktop video before publishing this as a demo post.

## 用什么判断是否有效

第一轮目标：20位愿意尝试者中，争取至少10位完成第一词、5位一周后再次使用。数字只是目标；每位独立用户同意后人工汇总，不需要加账号或行为追踪。

维护一张本地汇总表：渠道、实际访问/咨询数（知道才填）、自愿反馈人数、成功完成第一词人数、下载/安装/API/快捷键各自失败人数、愿意继续使用的人数和主要原因。**GitHub Release下载次数不等于用户数或留存，且包含重复及开发验证下载。** Pages没配置分析就不要编访问量、转化率。

先改善“第一个词成功”的比例，再扩大曝光。阅读器问题优先修复；API配置失败优先改上手说明和软件设置体验。真实评价需征得作者同意并保留来源后才能展示在首页。

## 下一轮产品优先级

1. 免费签名审批和完整安装/卸载验收，减少下载信任阻力。
2. API配置可验证、明确错误和服务商指引，减少不会配置的流失。
3. 英文桌面界面、Mac真机测试，扩大人群。
4. 根据真实反馈评估离线词典或更容易获得的翻译入口；当前不要宣传这些能力已存在。

README和主页可以改善理解与上手；长期传播更依赖真实演示、可靠安装、持续修复和读者愿意回来使用。
