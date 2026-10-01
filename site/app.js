const copy = {
  zh: {
    pageTitle: "PaperVocab | 论文阅读伴侣", metaDescription: "PaperVocab 帮你在英文论文中快捷取词、收词与复习。原词保存在本地，选中文本会发送至你配置的翻译 API。", ogTitle: "PaperVocab | 让论文里的生词顺手留下", ogDescription: "选词、查看释义，再到收词汇总里搜索、按首次收录日期筛选和复习。",
    navWorkflow: "使用流程", navDownload: "下载",
    heroEyebrow: "ENGLISH PAPER READING", heroTitle: "Paper<em>Vocab</em>", heroTagline: "论文生词，顺手留下。", heroLede: "选中一个词，按下快捷键。释义出现在阅读边缘，单词留在本地词本里，不打断你正在读的内容。默认翻译成中文，也可以选择英语、德语、法语或日语。", heroPrimary: "下载 Windows 版 <span aria-hidden=\"true\">↗</span>", heroSecondary: "了解使用流程", heroNote: "Windows · macOS 测试版 · 本地词库",
    paperMeta: "RESEARCH NOTE 04", paperTitle: "Learning representations from limited supervision", paperCopyA: "A useful representation should remain", paperCopyB: "when the available labels are sparse.", lookupPos: "形容词", lookupMeaning: "稳健的；具有适应力的", lookupExplain: "在论文中常指方法面对噪声、数据变化或有限监督时仍能保持稳定。", lookupExampleLabel: "生成例句", lookupExample: "The robust model performs well on unseen data.", lookupClose: "关闭",
    signalOneTitle: "不离开阅读", signalOneBody: "浮窗贴近你的阅读流程，不要求切换到另一个网页。", signalTwoTitle: "先保存，再翻译", signalTwoBody: "网络失败时，原词仍在本地词本里等待重试。", signalThreeTitle: "按自己的节奏复习", signalThreeBody: "在收词汇总中找回单词，再用三个简单选项完成复习。",
    workflowEyebrow: "THE WORKFLOW", workflowTitle: "从选词到复习，只需三步。", workflowLede: "PaperVocab 在需要时出现，让查词、记录和复习自然衔接。", stepOneTitle: "选中", stepOneBody: "在可复制的 PDF 或浏览器里选中英文词或短语。", stepTwoTitle: "按快捷键", stepTwoBody: "原词立即保存，随后请求当前选择的目标语言释义。", stepThreeTitle: "回顾与复习", stepThreeBody: "在收词汇总中搜索或按首次收录日期筛选，再进入到期复习。", reviewDemoWord: "representation", reviewDemoStatus: "有点印象",
    libraryEyebrow: "YOUR WORDS, TOGETHER", libraryTitle: "收词汇总，随时找回。", libraryLede: "全部收词集中在一处。搜索单词或释义、按首次收录日期筛选，同时看到词库总数与重复遇见次数。", libraryNav: "收词汇总", libraryReview: "到期复习", librarySettings: "设置", libraryFiltered: "当前筛选结果", libraryTotal: "本地词库总数", librarySearch: "搜索单词或释义", libraryDate: "首次收录日期", libraryMeaningOne: "稳健的", libraryMeaningTwo: "表征；表示", libraryEncounter: "遇见 2 次", libraryEncounterOne: "遇见 1 次",
    featureEyebrow: "MADE FOR RESEARCH READING", featureTitle: "查词、翻译，继续读。", featureLede: "选词即查，释义和遇见记录随手留存。原文面向英文论文，目标语言可选择中文、英语、德语、法语或日语。", featureOneTitle: "自选翻译服务", featureOneBody: "目前只实现 OpenAI Chat Completions 兼容协议；兼容该协议的服务可以使用，密钥保存在 Windows 凭据管理器或 macOS 钥匙串。", featureTwoTitle: "选择目标语言", featureTwoBody: "当前可选中文、英语、德语、法语和日语；默认目标语言为中文。", featureThreeTitle: "统一收词与复习", featureThreeBody: "收词汇总支持搜索、首次收录日期筛选和总数查看；重复遇见不会被误算为复习。",
    downloadEyebrow: "READY WHEN YOU ARE", downloadTitle: "开始更顺畅的论文阅读。", downloadLede: "下载安装包 → 运行安装 → 配置自己的 Chat Completions 兼容 API，即可开始使用。首次翻译需要你自己的 API 地址、模型与密钥；软件不内置翻译服务。", downloadStatus: "最新公开版本", downloadChecking: "正在检查安装包", downloadPending: "安装包尚未发布", downloadUnknown: "请在 GitHub 查看发布状态", downloadButton: "下载 Windows 安装包 <span aria-hidden=\"true\">↗</span>", downloadFallback: "查看发布进度 <span aria-hidden=\"true\">↗</span>", downloadReleasePage: "查看 GitHub Release 页面", downloadMeta: "Windows 10/11 · x64 · NSIS installer",
    windowsHelpTitle: "下载说明与文件校验", windowsUnsignedNotice: "当前 {version} Windows 安装包未签名。Edge 可能提示“通常不会下载”，Windows 也可能显示 SmartScreen 提示。", windowsReleaseNotice: "此版本的签名状态和校验信息以对应发布说明为准。", windowsTrustAdvice: "请先确认下载来自本项目 GitHub Release，并核对 SHA-256；确认后由你决定是否打开。文件校验用于确认文件一致性，并不等于安全审查。", windowsChecksums: "下载 SHA256SUMS.txt", windowsBytes: "字节",
    heroMac: "macOS 测试版 <span aria-hidden=\"true\">↗</span>", macPreview: "测试版", macChecking: "正在检查 Mac 安装包", macAvailable: "Mac 测试版已发布", macPending: "Mac 安装包尚未发布", macUnknown: "请在 GitHub 查看 Mac 发布状态", macApple: "Apple Silicon · M 系列 <span aria-hidden=\"true\">↗</span>", macIntel: "Intel Mac <span aria-hidden=\"true\">↗</span>", macFallback: "查看 Mac 发布进度 <span aria-hidden=\"true\">↗</span>", macMeta: "macOS 11 及以上 · DMG", macInstall: "选择对应芯片的安装包，将应用拖入“应用程序”。首次打开可能需要在“隐私与安全性”中允许运行；取词前在软件设置中授权辅助功能。", macValidation: "测试版未获 Apple Developer ID 签名与公证；完整 PDF 取词、权限和浮窗行为仍待 Mac 桌面实测。", macReleasePage: "Mac 测试版发布说明",
    privacyPolicy: "隐私政策", footerText: "让论文阅读与翻译更顺畅。", footerRepo: "GitHub 仓库"
  },
  en: {
    pageTitle: "PaperVocab | A reading companion for papers", metaDescription: "PaperVocab helps you collect and review words from English papers on Windows and macOS. Words are saved locally; selected text is sent to your chosen translation API.", ogTitle: "PaperVocab | Keep the words that make a paper click", ogDescription: "Select a word, see its meaning, then search, filter by first collected date, and review it in one library.",
    navWorkflow: "Workflow", navDownload: "Download",
    heroEyebrow: "ENGLISH PAPER READING", heroTitle: "Paper<em>Vocab</em>", heroTagline: "Keep the words that make a paper click.", heroLede: "Select a word, press a shortcut, and get a compact explanation at the edge of your reading flow. Chinese is the default target language; English, German, French, and Japanese are also available.", heroPrimary: "Download for Windows <span aria-hidden=\"true\">↗</span>", heroSecondary: "Explore the workflow", heroNote: "Windows · macOS preview · Local word library",
    paperMeta: "RESEARCH NOTE 04", paperTitle: "Learning representations from limited supervision", paperCopyA: "A useful representation should remain", paperCopyB: "when the available labels are sparse.", lookupPos: "adjective", lookupMeaning: "stable under change; resilient", lookupExplain: "In a paper, often used for a method that stays stable under noise, data shift, or limited supervision.", lookupExampleLabel: "Generated example", lookupExample: "The robust model performs well on unseen data.", lookupClose: "Close",
    signalOneTitle: "Stay in the paper", signalOneBody: "A quiet popup keeps lookup close without sending you to another tab.", signalTwoTitle: "Save before translating", signalTwoBody: "When a request fails, the original word stays local and ready to retry.", signalThreeTitle: "Review at your pace", signalThreeBody: "Find words in one library, then review with three clear choices.",
    workflowEyebrow: "THE WORKFLOW", workflowTitle: "From selection to review in three steps.", workflowLede: "PaperVocab appears when needed and keeps lookup, capture, and review connected.", stepOneTitle: "Select", stepOneBody: "Select an English word or phrase in a copyable PDF or browser.", stepTwoTitle: "Use the shortcut", stepTwoBody: "The word is saved immediately, then an explanation in the selected target language is requested.", stepThreeTitle: "Revisit and review", stepThreeBody: "Search the word library or filter by first collection date, then open due reviews.", reviewDemoWord: "representation", reviewDemoStatus: "Somewhat familiar",
    libraryEyebrow: "YOUR WORDS, TOGETHER", libraryTitle: "One place for every word.", libraryLede: "See all collected words in one library. Search words or meanings, filter by first collection date, and see the total word count and repeat encounters.", libraryNav: "Word library", libraryReview: "Due reviews", librarySettings: "Settings", libraryFiltered: "Filtered results", libraryTotal: "Words in library", librarySearch: "Search words or meanings", libraryDate: "First collected date", libraryMeaningOne: "resilient; robust", libraryMeaningTwo: "representation", libraryEncounter: "Seen twice", libraryEncounterOne: "Seen once",
    featureEyebrow: "MADE FOR RESEARCH READING", featureTitle: "Look up. Translate. Keep reading.", featureLede: "Look up a selection and keep its explanation and encounter record close at hand. The source is English paper text, with Chinese, English, German, French, or Japanese as the target language.", featureOneTitle: "Choose your translation service", featureOneBody: "The current release implements the OpenAI Chat Completions compatible protocol. Services using that protocol can work; keys stay in Windows Credential Manager or macOS Keychain.", featureTwoTitle: "Choose a target language", featureTwoBody: "Chinese, English, German, French, and Japanese are available today; Chinese is the default.", featureThreeTitle: "One library, steady review", featureThreeBody: "Search, filter by first collection date, and see total words. Seeing a word again does not count as a review.",
    downloadEyebrow: "READY WHEN YOU ARE", downloadTitle: "Read your next paper with less friction.", downloadLede: "Download → run the installer → configure your own Chat Completions-compatible API. Translation requires your API URL, model, and key; no translation service is bundled.", downloadStatus: "Latest public release", downloadChecking: "Checking for an installer", downloadPending: "Installer not yet published", downloadUnknown: "Check release status on GitHub", downloadButton: "Download the Windows installer <span aria-hidden=\"true\">↗</span>", downloadFallback: "View release progress <span aria-hidden=\"true\">↗</span>", downloadReleasePage: "View the GitHub Release page", downloadMeta: "Windows 10/11 · x64 · NSIS installer",
    windowsHelpTitle: "Download notes & file verification", windowsUnsignedNotice: "The current {version} Windows installer is unsigned. Edge may flag it as not commonly downloaded, and Windows may show a SmartScreen prompt.", windowsReleaseNotice: "See this version's release notes for its signature status and checksum information.", windowsTrustAdvice: "Confirm the download comes from this project's GitHub Release and compare its SHA-256 before deciding whether to open it. A matching checksum confirms file integrity; it is not a security review.", windowsChecksums: "Download SHA256SUMS.txt", windowsBytes: "bytes",
    heroMac: "macOS preview <span aria-hidden=\"true\">↗</span>", macPreview: "Preview", macChecking: "Checking for Mac installers", macAvailable: "Mac preview available", macPending: "Mac installers not yet published", macUnknown: "Check Mac release status on GitHub", macApple: "Apple Silicon · M series <span aria-hidden=\"true\">↗</span>", macIntel: "Intel Mac <span aria-hidden=\"true\">↗</span>", macFallback: "View Mac release progress <span aria-hidden=\"true\">↗</span>", macMeta: "macOS 11 or later · DMG", macInstall: "Choose your Mac's chip, then drag the app into Applications. You may need to allow the first launch in Privacy & Security. Grant Accessibility access in the app's settings before capturing words.", macValidation: "This preview has no Apple Developer ID signature or notarization. PDF capture, permission flows, and popup behavior still await interactive Mac desktop testing.", macReleasePage: "Mac preview release notes",
    privacyPolicy: "Privacy policy", footerText: "Reading and translation, in one flow.", footerRepo: "GitHub repository"
  }
};

function readStorage(key) {
  try { return window.localStorage?.getItem(key); } catch { return null; }
}

function writeStorage(key, value) {
  try { window.localStorage?.setItem(key, value); } catch { /* Storage can be unavailable in private contexts. */ }
}

let language = readStorage("papervocab-language") || (navigator.language.toLowerCase().startsWith("zh") ? "zh" : "en");
let releaseState = "checking";
let installerUrl = "";
let releaseVersion = "";
let checksumUrl = "";
let verifiedWindowsInstaller = null;
let verifiedWindowsMetadata = null;
let macState = "checking";
let macRelease = null;

function inferRepository() {
  if (window.PAPERVOCAB_REPO) return window.PAPERVOCAB_REPO;
  const host = window.location.hostname;
  const parts = window.location.pathname.split("/").filter(Boolean);
  if (host.endsWith(".github.io")) {
    const owner = host.split(".")[0];
    const repo = parts[0] || "PaperVocab";
    return `https://github.com/${owner}/${repo}`;
  }
  return "";
}

function applyLanguage() {
  document.documentElement.lang = language === "zh" ? "zh-CN" : "en";
  document.title = copy[language].pageTitle;
  document.querySelector('meta[name="description"]')?.setAttribute("content", copy[language].metaDescription);
  document.querySelector('meta[property="og:title"]')?.setAttribute("content", copy[language].ogTitle);
  document.querySelector('meta[property="og:description"]')?.setAttribute("content", copy[language].ogDescription);
  document.querySelector(".site-nav")?.setAttribute("aria-label", language === "zh" ? "主要导航" : "Primary navigation");
  document.querySelector(".brand")?.setAttribute("aria-label", language === "zh" ? "PaperVocab 首页" : "PaperVocab home");
  document.querySelector(".hero-visual")?.setAttribute("aria-label", language === "zh" ? "PaperVocab 产品预览" : "PaperVocab product preview");
  document.querySelector(".library-preview")?.setAttribute("aria-label", language === "zh" ? "PaperVocab 收词汇总预览" : "PaperVocab word library preview");
  document.querySelector(".lookup-top [data-preview-close]")?.setAttribute("aria-label", language === "zh" ? "关闭预览" : "Close preview");
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const value = copy[language][element.dataset.i18n];
    if (value !== undefined) element.innerHTML = value;
  });
  const toggle = document.querySelector("[data-language-toggle]");
  toggle.textContent = language === "zh" ? "EN" : "中";
  toggle.setAttribute("aria-label", language === "zh" ? "Switch to English" : "切换到中文");
  renderRelease();
  writeStorage("papervocab-language", language);
}

const repository = inferRepository();
const releasePageLink = repository ? `${repository}/releases` : "#download";

function renderRelease() {
  const stateKey = { checking: "downloadChecking", available: "downloadStatus", pending: "downloadPending", unknown: "downloadUnknown" }[releaseState];
  document.querySelector("[data-release-status]").textContent = copy[language][stateKey];
  const versionElement = document.querySelector("[data-release-version]");
  versionElement.textContent = releaseVersion;
  versionElement.hidden = !releaseVersion;
  const button = document.querySelector("[data-installer-link]");
  button.href = installerUrl || releasePageLink;
  button.innerHTML = copy[language][installerUrl ? "downloadButton" : "downloadFallback"];
  const heroButton = document.querySelector("[data-hero-installer-link]");
  heroButton.href = installerUrl || "#download";
  heroButton.innerHTML = copy[language].heroPrimary;
  document.querySelectorAll("[data-release-page-link]").forEach((link) => {
    link.href = installerUrl ? `${repository}/releases/tag/${releaseVersion}` : releasePageLink;
  });
  renderWindowsVerification();
  renderMacRelease();
}

function renderWindowsVerification() {
  const status = document.querySelector("[data-windows-trust-status]");
  if (!status) return;
  // Only locally recorded verification can describe a signature or digest.
  // A newer API release must never inherit an older installer's verification.
  const matchesVerified = verifiedWindowsInstaller?.url === installerUrl
    && verifiedWindowsInstaller?.version === releaseVersion;
  const verification = matchesVerified ? verifiedWindowsMetadata : null;
  status.textContent = verification?.signatureStatus === "unsigned"
    ? copy[language].windowsUnsignedNotice.replace("{version}", releaseVersion)
    : copy[language].windowsReleaseNotice;
  const metadata = document.querySelector("[data-windows-file-meta]");
  metadata.hidden = !verification;
  metadata.textContent = verification
    ? `${verifiedWindowsInstaller.name} · ${verification.size.toLocaleString(language === "zh" ? "zh-CN" : "en-US")} ${copy[language].windowsBytes}`
    : "";
  document.querySelector("[data-windows-checksum-row]").hidden = !verification;
  document.querySelector("[data-windows-sha256]").textContent = verification?.sha256 || "";
  const link = document.querySelector("[data-windows-checksum-link]");
  const availableChecksum = checksumUrl || (matchesVerified ? verifiedWindowsInstaller?.checksumUrl : "");
  link.hidden = !availableChecksum;
  link.href = availableChecksum || "#download";
}

function renderMacRelease() {
  const status = document.querySelector("[data-mac-release-status]");
  if (!status) return;
  const key = { checking: "macChecking", available: "macAvailable", pending: "macPending", unknown: "macUnknown" }[macState];
  status.textContent = copy[language][key];
  const version = document.querySelector("[data-mac-release-version]");
  version.textContent = macRelease?.version || "";
  version.hidden = !macRelease;
  for (const architecture of ["aarch64", "x64"]) {
    const button = document.querySelector(`[data-mac-installer-link="${architecture}"]`);
    button.href = macRelease?.urls[architecture] || releasePageLink;
    button.innerHTML = copy[language][macRelease ? (architecture === "aarch64" ? "macApple" : "macIntel") : "macFallback"];
  }
  document.querySelector("[data-mac-release-page-link]").href = macRelease ? `${repository}/releases/tag/${macRelease.version}` : releasePageLink;
}

function validatedMacRelease(release) {
  const tag = /^macos-v(\d+\.\d+\.\d+)-beta\.(\d+)$/.exec(release?.tag_name);
  if (!repository || !tag || !Array.isArray(release.assets)) return null;
  const urls = {};
  for (const architecture of ["aarch64", "x64"]) {
    const name = `PaperVocab_${tag[1]}_${architecture}.dmg`;
    const url = `${repository}/releases/download/${release.tag_name}/${name}`;
    if (!release.assets.some((asset) => asset?.name === name && asset.browser_download_url === url)) return null;
    urls[architecture] = url;
  }
  return { version: release.tag_name, numbers: [...tag[1].split(".").map(Number), Number(tag[2])], urls };
}

function useMacRelease(candidate) {
  if (!candidate) return false;
  if (macRelease) {
    const changed = candidate.numbers.findIndex((part, index) => part !== macRelease.numbers[index]);
    if (changed !== -1 && candidate.numbers[changed] < macRelease.numbers[changed]) return false;
  }
  macRelease = candidate;
  macState = "available";
  return true;
}

async function checkMacRelease() {
  if (!document.querySelector("[data-mac-release-status]")) return;
  if (!repository) { macState = "unknown"; renderMacRelease(); return; }
  try {
    const path = new URL(repository).pathname;
    const response = await fetch(`https://api.github.com/repos${path}/releases?per_page=20`, { headers: { Accept: "application/vnd.github+json" } });
    if (!response.ok) throw new Error(`Mac release lookup failed: ${response.status}`);
    const releases = await response.json();
    let found = false;
    if (Array.isArray(releases)) {
      for (const release of releases) {
        if (!release.draft && useMacRelease(validatedMacRelease(release))) found = true;
      }
    }
    if (!found && !macRelease) macState = "pending";
  } catch {
    if (!macRelease) macState = "unknown";
  } finally { renderMacRelease(); }
}

function validatedInstaller(release) {
  if (!repository || !/^v\d+\.\d+\.\d+$/.test(release?.tag_name) || !Array.isArray(release.assets)) return null;
  const asset = release.assets.find((item) => {
    const match = /^PaperVocab_(\d+\.\d+\.\d+)_x64-setup\.exe$/.exec(item?.name);
    return match && release.tag_name === `v${match[1]}`
      && item.browser_download_url === `${repository}/releases/download/${release.tag_name}/${item.name}`;
  });
  if (!asset) return null;
  const checksumAsset = release.assets.find((item) => item?.name === "SHA256SUMS.txt"
    && item.browser_download_url === `${repository}/releases/download/${release.tag_name}/SHA256SUMS.txt`);
  return { url: asset.browser_download_url, version: release.tag_name, name: asset.name, checksumUrl: checksumAsset?.browser_download_url || "" };
}

function validatedWindowsVerification(verification) {
  if (!verification || !/^[a-f0-9]{64}$/.test(verification.sha256)
    || !Number.isSafeInteger(verification.size) || verification.size <= 0
    || verification.signatureStatus !== "unsigned") return null;
  return { sha256: verification.sha256, size: verification.size, signatureStatus: verification.signatureStatus };
}

function useRelease(candidate) {
  if (!candidate) return false;
  const next = candidate.version.slice(1).split(".").map(Number);
  const current = releaseVersion.slice(1).split(".").map(Number);
  const changedPart = next.findIndex((part, index) => part !== current[index]);
  if (releaseVersion && changedPart !== -1 && next[changedPart] < current[changedPart]) return false;
  installerUrl = candidate.url;
  releaseVersion = candidate.version;
  checksumUrl = candidate.checksumUrl;
  releaseState = "available";
  return true;
}

async function checkRelease() {
  if (!repository) { releaseState = "unknown"; renderRelease(); return; }
  try {
    const path = new URL(repository).pathname;
    const response = await fetch(`https://api.github.com/repos${path}/releases/latest`, { headers: { Accept: "application/vnd.github+json" } });
    if (response.status === 404) { if (!installerUrl) releaseState = "pending"; return; }
    if (!response.ok) throw new Error(`Release lookup failed: ${response.status}`);
    const release = await response.json();
    if (!useRelease(validatedInstaller(release)) && !installerUrl) releaseState = "pending";
  } catch {
    if (!installerUrl) releaseState = "unknown";
  } finally {
    renderRelease();
  }
}

document.querySelectorAll("[data-release-page-link]").forEach((link) => { link.href = releasePageLink; });
document.querySelectorAll("[data-repo-link]").forEach((link) => { link.href = repository || "#top"; });
document.querySelectorAll("[data-project-document]").forEach((link) => {
  const name = link.dataset.projectDocument;
  if (["PRIVACY.md", "CODE_SIGNING_POLICY.md"].includes(name) && repository) {
    link.href = `${repository}/blob/${encodeURIComponent(window.PAPERVOCAB_BRANCH || "master")}/${name}`;
  }
});
document.querySelector("[data-language-toggle]").addEventListener("click", () => { language = language === "zh" ? "en" : "zh"; applyLanguage(); });
document.querySelectorAll("[data-preview-close]").forEach((button) => { button.addEventListener("click", () => document.querySelector(".lookup-card")?.classList.add("is-closed")); });
verifiedWindowsInstaller = validatedInstaller(window.PAPERVOCAB_RELEASE);
verifiedWindowsMetadata = verifiedWindowsInstaller ? validatedWindowsVerification(window.PAPERVOCAB_RELEASE?.verification) : null;
useRelease(verifiedWindowsInstaller);
useMacRelease(validatedMacRelease(window.PAPERVOCAB_MAC_RELEASE));
applyLanguage();
checkRelease();
checkMacRelease();
