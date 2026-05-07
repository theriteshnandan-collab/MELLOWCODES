/**
 * Cloudflare Pages Direct Upload Script
 * Deploys the `out/` directory to Cloudflare Pages via REST API.
 * Run: CLOUDFLARE_API_TOKEN=... node deploy-cf.mjs
 */

import { createHash } from "crypto";
import { readFileSync, readdirSync, statSync } from "fs";
import { join, relative } from "path";

const API_TOKEN = process.env.CLOUDFLARE_API_TOKEN;
const ACCOUNT_ID = "808b34d10808f1875bd874cd2cd04195";
const PROJECT_NAME = "mellowcode-company-website";
const OUT_DIR = "./out";
const API_BASE = `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}`;

function getMimeType(filePath) {
  const ext = filePath.split(".").pop()?.toLowerCase() ?? "";
  return ({
    html: "text/html; charset=utf-8",
    css: "text/css",
    js: "application/javascript",
    mjs: "application/javascript",
    json: "application/json",
    png: "image/png",
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    gif: "image/gif",
    svg: "image/svg+xml",
    ico: "image/x-icon",
    webp: "image/webp",
    woff: "font/woff",
    woff2: "font/woff2",
    ttf: "font/ttf",
    txt: "text/plain",
    xml: "application/xml",
    webmanifest: "application/manifest+json",
    map: "application/json",
  })[ext] ?? "application/octet-stream";
}

function walkDir(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    statSync(full).isDirectory() ? out.push(...walkDir(full)) : out.push(full);
  }
  return out;
}

async function apiRequest(path, opts = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    ...opts,
    headers: { Authorization: `Bearer ${API_TOKEN}`, ...opts.headers },
  });
  const json = await res.json();
  if (!json.success) throw new Error(JSON.stringify(json.errors ?? json, null, 2));
  return json.result;
}

async function ensureProject() {
  try {
    await apiRequest(`/pages/projects/${PROJECT_NAME}`);
    console.log(`✓ Project "${PROJECT_NAME}" found`);
  } catch {
    console.log(`Creating project "${PROJECT_NAME}"...`);
    await apiRequest(`/pages/projects`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: PROJECT_NAME, production_branch: "main" }),
    });
    console.log(`✓ Project created`);
  }
}

async function deploy() {
  if (!API_TOKEN) {
    console.error("Set CLOUDFLARE_API_TOKEN env var first");
    process.exit(1);
  }

  console.log("🚀 Mellowcode — Cloudflare Pages Deployer\n");
  await ensureProject();

  // Hash all files in `out/`
  console.log("\nHashing files...");
  const fileEntries = walkDir(OUT_DIR).map((fp) => {
    const content = readFileSync(fp);
    const hash = createHash("sha256").update(content).digest("hex");
    const route = "/" + relative(OUT_DIR, fp).replace(/\\/g, "/");
    return { route, hash, content, mime: getMimeType(fp) };
  });

  console.log(`Found ${fileEntries.length} files\n`);

  // Build manifest: route → hash
  const manifest = Object.fromEntries(fileEntries.map(({ route, hash }) => [route, hash]));

  // Build FormData with manifest + all files keyed by hash
  console.log("Building upload payload...");
  const form = new FormData();
  form.append("branch", "main");
  form.append("manifest", JSON.stringify(manifest));

  for (const { hash, content, mime } of fileEntries) {
    form.append(hash, new Blob([content], { type: mime }), hash);
  }

  // Create deployment — all files included in this single request
  console.log("Uploading and deploying...");
  const deployment = await apiRequest(
    `/pages/projects/${PROJECT_NAME}/deployments`,
    { method: "POST", body: form }
  );

  console.log(`\n✅ Deployed!`);
  console.log(`   URL:    ${deployment.url}`);
  console.log(`   ID:     ${deployment.id}`);
  console.log(`   Status: ${deployment.latest_stage?.status ?? "queued"}`);
  console.log(`\n⚠️  Revoke this API token at dash.cloudflare.com → My Profile → API Tokens`);
}

deploy().catch((err) => {
  console.error("\n❌ Deploy failed:\n", err.message);
  process.exit(1);
});
