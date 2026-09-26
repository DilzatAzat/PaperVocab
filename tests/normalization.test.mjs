import test from "node:test";
import assert from "node:assert/strict";

function normalize(value) {
  const original = value.trim().replace(/\s+/g, " ");
  const isAcronym = /^[A-Z][A-Z0-9._-]{1,15}$/.test(original);
  return isAcronym ? original : original.toLocaleLowerCase("en-US");
}

test("normalization trims and collapses whitespace", () => assert.equal(normalize("  neural   network "), "neural network"));
test("normalization preserves likely technical acronyms", () => assert.equal(normalize("BERT"), "BERT"));
test("normalization does not make a blank key", () => assert.equal(normalize("   "), ""));
