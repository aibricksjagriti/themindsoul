import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import vm from "node:vm";
import { transformSync } from "esbuild";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { checkCounsellorSession } from "../src/api/counsellorSession.js";

test("expired counsellor session permits login instead of trusting local role", async (t) => {
  const original = globalThis.fetch;
  t.after(() => { globalThis.fetch = original; });
  globalThis.fetch = async () => ({ ok: false, status: 401, json: async () => ({ message: "Expired" }) });
  assert.equal(await checkCounsellorSession(), null);
});

test("session outages remain retryable errors and are not treated as logout", async (t) => {
  const original = globalThis.fetch;
  t.after(() => { globalThis.fetch = original; });
  globalThis.fetch = async () => ({ ok: false, status: 500, json: async () => ({ message: "Database unavailable" }) });
  await assert.rejects(checkCounsellorSession(), /Database unavailable/);
  globalThis.fetch = async (_url, options) => {
    assert.equal(options.credentials, "include");
    return { ok: true, json: async () => ({ role: "counsellor", counsellorId: "c" }) };
  };
  assert.equal((await checkCounsellorSession()).counsellorId, "c");
});

async function loadComponent(relative, mocks) {
  const code = transformSync(await readFile(new URL(relative, import.meta.url), "utf8"), { loader: "jsx", format: "cjs", jsx: "transform" }).code;
  const context = { React, module: { exports: {} }, require: (name) => {
    if (!(name in mocks)) throw new Error(`Unexpected dependency ${name}`);
    return mocks[name];
  } };
  vm.runInNewContext(code, context);
  return context.module.exports.default;
}

test("appointment confirmation renders nullable counsellor names", async () => {
  const DialogPortal = await loadComponent("../src/components/ui/DialogPortal.jsx", {
    react: React, "react-dom": { createPortal: (children) => children },
  });
  const Confirmation = await loadComponent("../src/components/Profile/AppointmentConfirmationModal.jsx", {
    "../ui/DialogPortal": DialogPortal,
    "../../utils/sessionDisplay": { downloadSessionCalendar: () => {} },
    react: React,
    "react-icons/fi": Object.fromEntries(["FiX", "FiCalendar", "FiClock", "FiMapPin", "FiVideo"].map((name) => [name, () => null])),
  });
  const html = renderToStaticMarkup(React.createElement(Confirmation, {
    isOpen: true, onClose: () => {}, appointment: { counsellorProfileSnapshot: { firstName: "Test", lastName: null }, date: "2030-01-01", timeSlot: "09:00-09:30" },
  }));
  assert.equal(html.includes("Appointment Confirmed"), true);
});

test("counsellor guard checks actual session and offers login after expiry", async () => {
  const Protected = await loadComponent("../src/routes/ProtectedCounsellorRoute.jsx", {
    "react-router-dom": { Navigate: ({ to }) => React.createElement("a", { href: to }, "Login") },
    "../hooks/useCounsellorSession": { useCounsellorSession: () => ({ loading: false, session: null, error: "", retry: () => {} }) },
  });
  const html = renderToStaticMarkup(React.createElement(Protected, null, "Protected content"));
  assert.equal(html.includes('href="/counsellor-login"'), true);
  assert.equal(html.includes("Protected content"), false);
});
