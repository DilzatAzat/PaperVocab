import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";
import test from "node:test";

const source = readFileSync(new URL("../site/app.js", import.meta.url), "utf8");
const repository = "https://github.com/owner/repo";

async function loadWithRelease(response) {
  const status = { textContent: "" };
  const version = { textContent: "", hidden: true };
  const installer = { href: "", innerHTML: "" };
  const toggle = { setAttribute() {}, addEventListener() {} };
  const elements = new Map([
    ["[data-release-status]", status],
    ["[data-release-version]", version],
    ["[data-installer-link]", installer],
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
      localStorage: { getItem() { return null; }, setItem() {} },
    },
    fetch: async () => response,
  };
  runInNewContext(source, context);
  await new Promise(setImmediate);
  return { status, version, installer };
}

test("unpublished release links to the Releases page", async () => {
  const { status, version, installer } = await loadWithRelease({ status: 404 });
  assert.equal(status.textContent, "安装包尚未发布");
  assert.equal(version.hidden, true);
  assert.equal(installer.href, `${repository}/releases`);
});

test("published NSIS asset becomes the direct download", async () => {
  const url = `${repository}/releases/download/v0.2.0/PaperVocab_0.2.0_x64-setup.exe`;
  const { status, version, installer } = await loadWithRelease({
    status: 200,
    ok: true,
    json: async () => ({ tag_name: "v0.2.0", assets: [{ name: "PaperVocab_0.2.0_x64-setup.exe", browser_download_url: url }] }),
  });
  assert.equal(status.textContent, "最新公开版本");
  assert.equal(version.textContent, "v0.2.0");
  assert.equal(version.hidden, false);
  assert.equal(installer.href, url);
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
