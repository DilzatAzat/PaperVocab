import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";
import test from "node:test";

const source = readFileSync(new URL("../site/app.js", import.meta.url), "utf8");
const repository = "https://github.com/owner/repo";

function releaseFor(version = "0.2.0", url) {
  return {
    tag_name: `v${version}`,
    assets: [{
      name: `PaperVocab_${version}_x64-setup.exe`,
      browser_download_url: url || `${repository}/releases/download/v${version}/PaperVocab_${version}_x64-setup.exe`,
    }],
  };
}

async function loadWithRelease(response, fallback, macFallback, repoUrl = repository, branch = "master") {
  const status = { textContent: "" };
  const version = { textContent: "", hidden: true };
  const installer = { href: "", innerHTML: "" };
  const heroInstaller = { href: "", innerHTML: "" };
  const macStatus = { textContent: "" };
  const macVersion = { textContent: "", hidden: true };
  const macApple = { href: "", innerHTML: "" };
  const macIntel = { href: "", innerHTML: "" };
  const macNotes = { href: "" };
  const releaseNotes = { href: "" };
  const trustStatus = { textContent: "" };
  const fileMetadata = { textContent: "", hidden: true };
  const checksumRow = { hidden: true };
  const checksumText = { textContent: "" };
  const checksumLink = { href: "", hidden: true, dataset: { i18n: "windowsChecksums" } };
  const helpTitle = { innerHTML: "", dataset: { i18n: "windowsHelpTitle" } };
  const trustAdvice = { innerHTML: "", dataset: { i18n: "windowsTrustAdvice" } };
  const toggle = { setAttribute() {}, addEventListener(_, callback) { this.click = callback; } };
  const interactive = (dataset = {}) => ({ dataset, attributes: {}, hidden: false,
    setAttribute(name, value) { this.attributes[name] = value; },
    addEventListener(_, callback) { this.click = callback; },
    focus() { this.focused = true; },
  });
  const guide = { href: "" };
  const feedback = { href: "" };
  const visual = interactive();
  const card = interactive();
  const lookup = interactive();
  const review = interactive();
  const answer = interactive();
  const reveal = interactive();
  const reset = interactive();
  const close = interactive();
  const demoStatus = { textContent: "" };
  const steps = ["selection", "lookup", "review"].map((demoStep) => interactive({ demoStep }));
  const elements = new Map([
    ["[data-release-status]", status],
    ["[data-release-version]", version],
    ["[data-installer-link]", installer],
    ["[data-hero-installer-link]", heroInstaller],
    ["[data-language-toggle]", toggle],
    ["[data-mac-release-status]", macStatus],
    ["[data-mac-release-version]", macVersion],
    ['[data-mac-installer-link="aarch64"]', macApple],
    ['[data-mac-installer-link="x64"]', macIntel],
    ["[data-mac-release-page-link]", macNotes],
    ["[data-windows-trust-status]", trustStatus],
    ["[data-windows-file-meta]", fileMetadata],
    ["[data-windows-checksum-row]", checksumRow],
    ["[data-windows-sha256]", checksumText],
    ["[data-windows-checksum-link]", checksumLink],
    [".hero-visual", visual], [".lookup-card", card],
    ["[data-demo-lookup]", lookup], ["[data-demo-review]", review],
    ["[data-demo-answer]", answer], ["[data-demo-reveal]", reveal],
    ["[data-preview-reset]", reset], ["[data-demo-status]", demoStatus],
  ]);
  const document = {
    documentElement: {},
    querySelector(selector) { return elements.get(selector) || null; },
    querySelectorAll(selector) {
      if (selector === "[data-release-page-link]") return [releaseNotes];
      if (selector === "[data-i18n]") return [helpTitle, trustAdvice, checksumLink];
      if (selector === "[data-getting-started]") return [guide];
      if (selector === "[data-feedback-link]") return [feedback];
      if (selector === "[data-demo-step]") return steps;
      if (selector === "[data-preview-close]") return [close];
      return [];
    },
  };
  const context = {
    document,
    navigator: { language: "zh-CN" },
    URL,
    window: {
      PAPERVOCAB_REPO: repoUrl,
      PAPERVOCAB_BRANCH: branch,
      PAPERVOCAB_RELEASE: fallback,
      PAPERVOCAB_MAC_RELEASE: macFallback,
      localStorage: { getItem() { return null; }, setItem() {} },
    },
    fetch: async (url) => typeof response === "function" ? response(url) : response,
  };
  runInNewContext(source, context);
  const immediately = { href: installer.href, heroHref: heroInstaller.href, status: status.textContent, macHref: macApple.href, sha256: checksumText.textContent, trust: trustStatus.textContent };
  await new Promise(setImmediate);
  return { status, version, installer, heroInstaller, toggle, immediately, macStatus, macVersion, macApple, macIntel, macNotes, releaseNotes, trustStatus, fileMetadata, checksumRow, checksumText, checksumLink, helpTitle, trustAdvice, guide, feedback,
    demo: { visual, card, lookup, review, answer, reveal, reset, close, steps, status: demoStatus },
    translations: runInNewContext("({ zh: Object.keys(copy.zh), en: Object.keys(copy.en) })", context),
  };
}

test("setup guides follow language and repository while feedback stays on the configured project", async () => {
  const project = "https://github.com/example/papers";
  const state = await loadWithRelease(() => { throw new Error("offline"); }, undefined, undefined, project, "codex/preview");
  assert.equal(state.guide.href, `${project}/blob/codex%2Fpreview/docs/GETTING_STARTED.md`);
  assert.equal(state.feedback.href, `${project}/issues/new?template=onboarding_feedback.yml`);
  state.toggle.click();
  assert.equal(state.guide.href, `${project}/blob/codex%2Fpreview/docs/GETTING_STARTED.en.md`);
  assert.equal(state.feedback.href, `${project}/issues/new?template=onboarding_feedback.yml`);
});

test("illustration can be closed and restored, and review meaning is revealed only on request", async () => {
  const state = await loadWithRelease(() => { throw new Error("offline"); }, releaseFor());
  const { demo } = state;
  assert.equal(demo.card.hidden, false);
  assert.equal(demo.visual.dataset.demoStage, "lookup");
  demo.close.click();
  assert.equal(demo.card.hidden, true);
  assert.equal(demo.reset.focused, true);
  assert.match(demo.status.textContent, /已关闭/);
  state.toggle.click();
  assert.equal(demo.card.hidden, true);
  assert.match(demo.status.textContent, /Illustration closed/);
  demo.steps[2].click();
  assert.equal(demo.card.hidden, false);
  assert.equal(demo.lookup.hidden, true);
  assert.equal(demo.review.hidden, false);
  assert.equal(demo.answer.hidden, true);
  assert.equal(demo.reveal.attributes["aria-expanded"], "false");
  demo.reveal.click();
  assert.equal(demo.answer.hidden, false);
  assert.equal(demo.reveal.attributes["aria-expanded"], "true");
  state.toggle.click();
  assert.equal(demo.answer.hidden, false);
  assert.equal(demo.reveal.textContent, "收起释义");
  demo.reset.click();
  assert.equal(demo.visual.dataset.demoStage, "selection");
  assert.equal(demo.card.hidden, true);
  assert.equal(demo.answer.hidden, true);
  demo.steps[1].click();
  assert.equal(demo.card.hidden, false);
  assert.equal(demo.lookup.hidden, false);
  assert.equal(demo.steps[1].attributes["aria-pressed"], "true");
});

test("every landing page copy key has both Chinese and English text", async () => {
  const state = await loadWithRelease(() => { throw new Error("offline"); });
  const html = readFileSync(new URL("../site/index.html", import.meta.url), "utf8");
  for (const [, key] of html.matchAll(/data-i18n="([^"]+)"/g)) {
    assert.ok(state.translations.zh.includes(key), `Missing Chinese copy: ${key}`);
    assert.ok(state.translations.en.includes(key), `Missing English copy: ${key}`);
  }
});

const knownSha256 = "97556ea2fcba7f92618017ac8795beeaec43a2e72bd495de6c28a1ae163c4efe";

function verifiedWindowsRelease() {
  const release = releaseFor("0.1.0");
  release.verification = { sha256: knownSha256, size: 3976305, signatureStatus: "unsigned" };
  release.assets.push({ name: "SHA256SUMS.txt", browser_download_url: `${repository}/releases/download/v0.1.0/SHA256SUMS.txt` });
  return release;
}

test("published Windows verification is accurate in both languages without changing Mac downloads", async () => {
  const published = { window: {} };
  runInNewContext(readFileSync(new URL("../site/release.js", import.meta.url), "utf8"), published);
  const repoUrl = "https://github.com/DilzatAzat/PaperVocab";
  const state = await loadWithRelease(() => { throw new Error("offline"); }, published.window.PAPERVOCAB_RELEASE, published.window.PAPERVOCAB_MAC_RELEASE, repoUrl);
  assert.match(state.helpTitle.innerHTML, /下载说明与文件校验/);
  assert.match(state.trustStatus.textContent, /v0\.1\.0.*未签名/);
  assert.match(state.trustStatus.textContent, /Edge.*通常不会下载.*SmartScreen/);
  assert.equal(state.checksumRow.hidden, false);
  assert.equal(state.checksumText.textContent, knownSha256);
  assert.match(state.fileMetadata.textContent, /PaperVocab_0\.1\.0_x64-setup\.exe · 3,976,305 字节/);
  assert.equal(state.checksumLink.hidden, false);
  assert.equal(state.checksumLink.href, `${repoUrl}/releases/download/v0.1.0/SHA256SUMS.txt`);
  assert.equal(state.releaseNotes.href, `${repoUrl}/releases/tag/v0.1.0`);
  const macUrl = state.macApple.href;
  state.toggle.click();
  assert.match(state.helpTitle.innerHTML, /Download notes & file verification/);
  assert.match(state.trustStatus.textContent, /v0\.1\.0.*unsigned/);
  assert.match(state.trustAdvice.innerHTML, /not a security review/);
  assert.match(state.fileMetadata.textContent, /3,976,305 bytes/);
  assert.match(state.checksumLink.innerHTML, /Download SHA256SUMS\.txt/);
  assert.equal(state.checksumText.textContent, knownSha256);
  assert.equal(state.macApple.href, macUrl);
});

test("API failures and older releases retain pinned Windows verification", async () => {
  for (const response of [() => { throw new Error("offline"); }, { status: 403, ok: false }, { status: 404 }, { status: 200, ok: true, json: async () => releaseFor("0.0.9") }]) {
    const state = await loadWithRelease(response, verifiedWindowsRelease());
    assert.equal(state.immediately.sha256, knownSha256);
    assert.match(state.immediately.trust, /未签名/);
    assert.equal(state.checksumText.textContent, knownSha256);
    assert.equal(state.checksumRow.hidden, false);
    assert.equal(state.checksumLink.hidden, false);
  }
});

test("same-version API metadata cannot change the locally verified signature or hash", async () => {
  const apiRelease = releaseFor("0.1.0");
  apiRelease.verification = { sha256: "b".repeat(64), size: 9000, signatureStatus: "signed" };
  const state = await loadWithRelease({ status: 200, ok: true, json: async () => apiRelease }, verifiedWindowsRelease());
  assert.match(state.trustStatus.textContent, /未签名/);
  assert.equal(state.checksumText.textContent, knownSha256);
  assert.equal(state.checksumLink.href, `${repository}/releases/download/v0.1.0/SHA256SUMS.txt`);
});

test("new API versions never inherit old verification or trust API signature metadata", async () => {
  const release = releaseFor("0.2.0");
  release.verification = { sha256: "b".repeat(64), size: 9999, signatureStatus: "unsigned" };
  const state = await loadWithRelease({ status: 200, ok: true, json: async () => release }, verifiedWindowsRelease());
  assert.equal(state.installer.href, release.assets[0].browser_download_url);
  assert.equal(state.releaseNotes.href, `${repository}/releases/tag/v0.2.0`);
  assert.match(state.trustStatus.textContent, /对应发布说明/);
  assert.equal(state.checksumRow.hidden, true);
  assert.equal(state.checksumText.textContent, "");
  assert.equal(state.fileMetadata.hidden, true);
  assert.equal(state.checksumLink.hidden, true);
  state.toggle.click();
  assert.match(state.trustStatus.textContent, /this version's release notes/);
  assert.doesNotMatch(state.trustStatus.textContent, /unsigned/);
  assert.equal(state.checksumText.textContent, "");
});

test("a new version exposes only its exact published checksum asset", async () => {
  const release = releaseFor("0.2.0");
  const checksumUrl = `${repository}/releases/download/v0.2.0/SHA256SUMS.txt`;
  release.assets.push({ name: "SHA256SUMS.txt", browser_download_url: checksumUrl });
  const state = await loadWithRelease({ status: 200, ok: true, json: async () => release }, verifiedWindowsRelease());
  assert.equal(state.checksumLink.hidden, false);
  assert.equal(state.checksumLink.href, checksumUrl);
  assert.equal(state.checksumRow.hidden, true);
  assert.equal(state.checksumText.textContent, "");
});

test("missing and noncanonical checksum assets are hidden instead of fabricated", async () => {
  const canonical = `${repository}/releases/download/v0.2.0/SHA256SUMS.txt`;
  const invalidUrls = [canonical + "?download=1", canonical.replace("/v0.2.0/", "/v0.1.0/"), canonical.replace("github.com", "github.com.evil.example"), "https://example.com/SHA256SUMS.txt"];
  for (const url of invalidUrls) {
    const release = releaseFor("0.2.0");
    release.assets.push({ name: "SHA256SUMS.txt", browser_download_url: url });
    const state = await loadWithRelease({ status: 200, ok: true, json: async () => release }, verifiedWindowsRelease());
    assert.equal(state.checksumLink.hidden, true, url);
    assert.equal(state.checksumLink.href, "#download", url);
  }
  const release = releaseFor("0.2.0");
  release.assets.push({ name: "other-checksums.txt", browser_download_url: canonical });
  const state = await loadWithRelease({ status: 200, ok: true, json: async () => release });
  assert.equal(state.checksumLink.hidden, true);
});

test("malformed local verification is not shown as verified data", async () => {
  for (const invalid of [{ sha256: "<script>alert(1)</script>" }, { size: -1 }, { size: 1.5 }, { signatureStatus: "signed" }]) {
    const fallback = verifiedWindowsRelease();
    Object.assign(fallback.verification, invalid);
    const state = await loadWithRelease(() => { throw new Error("offline"); }, fallback);
    assert.equal(state.checksumRow.hidden, true);
    assert.equal(state.checksumText.textContent, "");
    assert.match(state.trustStatus.textContent, /对应发布说明/);
  }
});

function macReleaseFor(version = "0.1.0", beta = 1) {
  const tag = `macos-v${version}-beta.${beta}`;
  return { tag_name: tag, prerelease: true, assets: ["aarch64", "x64"].map((architecture) => ({
    name: `PaperVocab_${version}_${architecture}.dmg`,
    browser_download_url: `${repository}/releases/download/${tag}/PaperVocab_${version}_${architecture}.dmg`,
  })) };
}

test("Mac preview exposes both chips independently of the Windows release", async () => {
  const mac = macReleaseFor();
  const windows = releaseFor();
  const state = await loadWithRelease((url) => ({ status: 200, ok: true, json: async () => url.endsWith('/latest') ? windows : [mac] }));
  assert.equal(state.installer.href, windows.assets[0].browser_download_url);
  assert.equal(state.macApple.href, mac.assets[0].browser_download_url);
  assert.equal(state.macIntel.href, mac.assets[1].browser_download_url);
  assert.equal(state.macStatus.textContent, "Mac 测试版已发布");
  assert.equal(state.macVersion.hidden, false);
  assert.equal(state.macNotes.href, `${repository}/releases/tag/${mac.tag_name}`);
  state.toggle.click();
  assert.match(state.macApple.innerHTML, /Apple Silicon/);
  assert.match(state.macIntel.innerHTML, /Intel Mac/);
  assert.equal(state.macApple.href, mac.assets[0].browser_download_url);
  assert.equal(state.installer.href, windows.assets[0].browser_download_url);
});

test("verified Mac links render immediately and survive API failure", async () => {
  const mac = macReleaseFor();
  const state = await loadWithRelease(() => { throw new Error('offline'); }, releaseFor(), mac);
  assert.equal(state.immediately.macHref, mac.assets[0].browser_download_url);
  assert.equal(state.macApple.href, mac.assets[0].browser_download_url);
  assert.equal(state.macIntel.href, mac.assets[1].browser_download_url);
  assert.equal(state.macStatus.textContent, "Mac 测试版已发布");
});

test("incomplete or noncanonical Mac assets never become installer links", async () => {
  const candidates = [macReleaseFor(), macReleaseFor(), macReleaseFor(), macReleaseFor()];
  candidates[0].assets.pop();
  candidates[1].assets[0].browser_download_url += '?redirect=evil';
  candidates[2].assets[1].browser_download_url = candidates[2].assets[1].browser_download_url.replace('github.com', 'github.com.evil.example');
  candidates[3].tag_name = 'macos-v0.2.0-beta.1';
  for (const candidate of candidates) {
    const state = await loadWithRelease({ status: 200, ok: true, json: async () => [candidate] }, releaseFor(), candidate);
    assert.equal(state.macApple.href, `${repository}/releases`);
    assert.equal(state.macIntel.href, `${repository}/releases`);
    assert.equal(state.macVersion.hidden, true);
    assert.equal(state.installer.href, releaseFor().assets[0].browser_download_url);
  }
});

test("older Mac previews and drafts cannot replace verified downloads", async () => {
  const fallback = macReleaseFor('0.2.0', 2);
  const draft = { ...macReleaseFor('0.3.0', 1), draft: true };
  const state = await loadWithRelease({ status: 200, ok: true, json: async () => [macReleaseFor('0.1.0', 9), macReleaseFor('0.2.0', 1), draft] }, releaseFor(), fallback);
  assert.equal(state.macVersion.textContent, fallback.tag_name);
  assert.equal(state.macApple.href, fallback.assets[0].browser_download_url);
});

test("newer Mac preview replaces fallback without replacing Windows", async () => {
  const next = macReleaseFor('0.1.0', 2);
  const state = await loadWithRelease({ status: 200, ok: true, json: async () => [next, macReleaseFor()] }, releaseFor(), macReleaseFor());
  assert.equal(state.macVersion.textContent, next.tag_name);
  assert.equal(state.macIntel.href, next.assets[1].browser_download_url);
  assert.equal(state.installer.href, releaseFor().assets[0].browser_download_url);
});

test("unpublished release links to the Releases page", async () => {
  const { status, version, installer, heroInstaller } = await loadWithRelease({ status: 404 });
  assert.equal(status.textContent, "安装包尚未发布");
  assert.equal(version.hidden, true);
  assert.equal(installer.href, `${repository}/releases`);
  assert.equal(heroInstaller.href, "#download");
});

test("published NSIS asset becomes the direct download", async () => {
  const url = `${repository}/releases/download/v0.2.0/PaperVocab_0.2.0_x64-setup.exe`;
  const { status, version, installer, heroInstaller, toggle } = await loadWithRelease({
    status: 200,
    ok: true,
    json: async () => ({ tag_name: "v0.2.0", assets: [{ name: "PaperVocab_0.2.0_x64-setup.exe", browser_download_url: url }] }),
  });
  assert.equal(status.textContent, "最新公开版本");
  assert.equal(version.textContent, "v0.2.0");
  assert.equal(version.hidden, false);
  assert.equal(installer.href, url);
  assert.equal(heroInstaller.href, url);
  toggle.click();
  assert.equal(installer.href, url);
  assert.equal(heroInstaller.href, url);
  assert.match(heroInstaller.innerHTML, /Download for Windows/);
  assert.match(installer.innerHTML, /Download the Windows installer/);
  toggle.click();
  assert.equal(heroInstaller.href, url);
  assert.match(heroInstaller.innerHTML, /下载 Windows 版/);
});

test("verified release renders immediately and survives API failures", async () => {
  for (const response of [() => { throw new Error("offline"); }, { status: 403, ok: false }, { status: 404 }]) {
    const fallback = releaseFor();
    const url = fallback.assets[0].browser_download_url;
    const { status, version, installer, heroInstaller, immediately } = await loadWithRelease(response, fallback);
    assert.equal(immediately.href, url);
    assert.equal(immediately.heroHref, url);
    assert.equal(immediately.status, "最新公开版本");
    assert.equal(status.textContent, "最新公开版本");
    assert.equal(version.textContent, "v0.2.0");
    assert.equal(installer.href, url);
    assert.equal(heroInstaller.href, url);
  }
});

test("newer API release replaces the verified fallback", async () => {
  const release = releaseFor("0.3.0");
  const { version, installer, heroInstaller } = await loadWithRelease({
    status: 200, ok: true, json: async () => release,
  }, releaseFor());
  assert.equal(version.textContent, "v0.3.0");
  assert.equal(installer.href, release.assets[0].browser_download_url);
  assert.equal(heroInstaller.href, installer.href);
});

test("older or invalid API release cannot replace a verified fallback", async () => {
  for (const release of [releaseFor("0.1.0"), { assets: [] }, null]) {
    const fallback = releaseFor();
    const { status, installer } = await loadWithRelease({ status: 200, ok: true, json: async () => release }, fallback);
    assert.equal(status.textContent, "最新公开版本");
    assert.equal(installer.href, fallback.assets[0].browser_download_url);
  }
});

test("invalid fallback is not exposed when GitHub is unreachable", async () => {
  const invalid = releaseFor("0.2.0");
  invalid.tag_name = "v0.3.0";
  const { status, version, installer, heroInstaller, immediately } = await loadWithRelease(
    () => { throw new Error("offline"); }, invalid,
  );
  assert.equal(immediately.href, `${repository}/releases`);
  assert.equal(status.textContent, "请在 GitHub 查看发布状态");
  assert.equal(version.hidden, true);
  assert.equal(installer.href, `${repository}/releases`);
  assert.equal(heroInstaller.href, "#download");
});

test("installer URL must exactly match its repository, tag and filename", async () => {
  const canonical = releaseFor().assets[0].browser_download_url;
  const invalidUrls = [
    `${canonical}.malicious.exe`,
    `${canonical}?redirect=https://example.com`,
    canonical.replace("github.com", "github.com.evil.example"),
    canonical.replace("owner/repo/", "owner/repo-malicious/"),
    canonical.replace("/v0.2.0/", "/v0.1.0/"),
    canonical.replace("PaperVocab_0.2.0_x64-setup.exe", "unrelated.exe"),
    `${repository}/releases/download/v0.2.0/../other.exe`,
  ];
  for (const url of invalidUrls) {
    const release = releaseFor("0.2.0", url);
    const { status, installer, heroInstaller } = await loadWithRelease({ status: 200, ok: true, json: async () => release }, release);
    assert.equal(status.textContent, "安装包尚未发布", url);
    assert.equal(installer.href, `${repository}/releases`, url);
    assert.equal(heroInstaller.href, "#download", url);
  }
});

test("unexpected asset destination does not become a download link", async () => {
  const { status, installer } = await loadWithRelease({
    status: 200,
    ok: true,
    json: async () => ({ tag_name: "v0.2.0", assets: [{ name: "PaperVocab_0.2.0_x64-setup.exe", browser_download_url: "https://example.com/installer.exe" }] }),
  });
  assert.equal(status.textContent, "安装包尚未发布");
  assert.equal(installer.href, `${repository}/releases`);
});

test("asset version must match the release tag", async () => {
  const { status, version, installer } = await loadWithRelease({
    status: 200,
    ok: true,
    json: async () => ({
      tag_name: "v0.2.0",
      assets: [{
        name: "PaperVocab_0.1.0_x64-setup.exe",
        browser_download_url: `${repository}/releases/download/v0.2.0/PaperVocab_0.1.0_x64-setup.exe`,
      }],
    }),
  });
  assert.equal(status.textContent, "安装包尚未发布");
  assert.equal(version.hidden, true);
  assert.equal(installer.href, `${repository}/releases`);
});
