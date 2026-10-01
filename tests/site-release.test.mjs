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

async function loadWithRelease(response, fallback) {
  const status = { textContent: "" };
  const version = { textContent: "", hidden: true };
  const installer = { href: "", innerHTML: "" };
  const heroInstaller = { href: "", innerHTML: "" };
  const toggle = { setAttribute() {}, addEventListener(_, callback) { this.click = callback; } };
  const elements = new Map([
    ["[data-release-status]", status],
    ["[data-release-version]", version],
    ["[data-installer-link]", installer],
    ["[data-hero-installer-link]", heroInstaller],
    ["[data-language-toggle]", toggle],
  ]);
  const document = {
    documentElement: {},
    querySelector(selector) { return elements.get(selector) || null; },
    querySelectorAll() { return []; },
  };
  const context = {
    document,
    navigator: { language: "zh-CN" },
    URL,
    window: {
      PAPERVOCAB_REPO: repository,
      PAPERVOCAB_BRANCH: "master",
      PAPERVOCAB_RELEASE: fallback,
      localStorage: { getItem() { return null; }, setItem() {} },
    },
    fetch: async () => typeof response === "function" ? response() : response,
  };
  runInNewContext(source, context);
  const immediately = { href: installer.href, heroHref: heroInstaller.href, status: status.textContent };
  await new Promise(setImmediate);
  return { status, version, installer, heroInstaller, toggle, immediately };
}

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
