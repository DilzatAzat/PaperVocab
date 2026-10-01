// Updated only after a public installer asset has been downloaded and verified.
window.PAPERVOCAB_RELEASE = {
  tag_name: "v0.1.0",
  verification: {
    sha256: "97556ea2fcba7f92618017ac8795beeaec43a2e72bd495de6c28a1ae163c4efe",
    size: 3976305,
    signatureStatus: "unsigned"
  },
  assets: [{
    name: "PaperVocab_0.1.0_x64-setup.exe",
    browser_download_url: "https://github.com/DilzatAzat/PaperVocab/releases/download/v0.1.0/PaperVocab_0.1.0_x64-setup.exe"
  }, {
    name: "SHA256SUMS.txt",
    browser_download_url: "https://github.com/DilzatAzat/PaperVocab/releases/download/v0.1.0/SHA256SUMS.txt"
  }]
};

// Set only after both public DMGs have been downloaded and their SHA-256 verified.
window.PAPERVOCAB_MAC_RELEASE = {
  "tag_name": "macos-v0.1.0-beta.1",
  "assets": [
    {
      "name": "PaperVocab_0.1.0_aarch64.dmg",
      "browser_download_url": "https://github.com/DilzatAzat/PaperVocab/releases/download/macos-v0.1.0-beta.1/PaperVocab_0.1.0_aarch64.dmg"
    },
    {
      "name": "PaperVocab_0.1.0_x64.dmg",
      "browser_download_url": "https://github.com/DilzatAzat/PaperVocab/releases/download/macos-v0.1.0-beta.1/PaperVocab_0.1.0_x64.dmg"
    }
  ]
};
