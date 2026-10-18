import assert from "node:assert/strict";
import { test } from "node:test";
import { qualifyArchitecture, qualifyExample, qualifyPacket, step1Reading } from "./qualify.ts";

test("a shaped document packet qualifies and is not lodged", () => {
  const report = qualifyPacket(qualifyExample);
  assert.equal(report.verdict, "qualified");
  assert.equal(report.lodged, false);
  assert.equal(report.verifiesBytes, false);
});

test("the Step 1 vault is held because it stores bytes", () => {
  const report = qualifyArchitecture(step1Reading);
  assert.equal(report.verdict, "held");
  assert.equal(report.lodged, false);
  assert.equal(report.document.find((check) => check.id === "bytes")?.pass, false);
  assert.equal(report.document.find((check) => check.id === "public-release")?.pass, true);
});

test("a design that publishes is rejected", () => {
  const report = qualifyArchitecture({ ...step1Reading, publicRelease: true, storesBytes: false });
  assert.equal(report.verdict, "rejected");
  assert.equal(report.lodged, false);
});
