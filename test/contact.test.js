import { test } from "node:test";
import assert from "node:assert/strict";
import { isValidEmail, handleSubmit } from "../src/contact.js";

test("accepts a valid email address", () => {
  assert.equal(isValidEmail("ana@northwind.example"), true);
});

test("refuses an address without an @ sign", () => {
  assert.equal(isValidEmail("ana.northwind.example"), false);
});

test("refuses an invalid email before sending", () => {
  let calls = 0;
  const result = handleSubmit({ email: "not-an-email", message: "Hi" }, () => { calls += 1; });
  assert.equal(result.sent, false);
  assert.equal(calls, 0);
});

test("sends a valid submission", () => {
  let sent = null;
  const result = handleSubmit({ email: " ana@northwind.example ", message: "Hi" }, (payload) => { sent = payload; });
  assert.equal(result.sent, true);
  assert.deepEqual(sent, { email: "ana@northwind.example", message: "Hi" });
});
