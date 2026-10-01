import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import ts from "typescript";

const source = readFileSync(new URL("../src/date-picker.ts", import.meta.url), "utf8");
const compiled = ts.transpileModule(source, { compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext } }).outputText;
const { isCalendarDate, openNativeDatePicker } = await import(`data:text/javascript;base64,${Buffer.from(compiled).toString("base64")}`);

test("date picker falls back when WKWebView lacks showPicker", () => {
  assert.equal(openNativeDatePicker(null), false);
  assert.equal(openNativeDatePicker({}), false);
  assert.equal(openNativeDatePicker({ showPicker() { throw new DOMException("unsupported", "NotSupportedError"); } }), false);
  let opened = false;
  assert.equal(openNativeDatePicker({ showPicker() { opened = true; } }), true);
  assert.equal(opened, true);
  assert.throws(() => openNativeDatePicker({ showPicker() { throw new Error("unexpected"); } }), /unexpected/);
});

test("fallback dates validate calendar days without timezone conversion", () => {
  for (const date of ["2026-10-01", "2024-02-29", "2000-02-29", "0001-01-01"]) assert.equal(isCalendarDate(date), true, date);
  for (const date of ["2026-02-29", "1900-02-29", "2026-04-31", "2026-13-01", "2026-01-00", "0000-01-01", "2026-1-1", "2026-10-01T00:00:00Z"]) assert.equal(isCalendarDate(date), false, date);
});
