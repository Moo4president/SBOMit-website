#!/usr/bin/env node
/**
 * Block-level DeepL translator for Hugo content.
 *
 * Usage: npm run translate
 *
 * - Reads English markdown under content/ (see SOURCE_FILES)
 * - Splits body into blocks (blank-line separated; fenced code left intact)
 * - Caches translations by SHA-256 of each source block in scripts/.translate-cache.json
 * - Writes content/<name>.<lang>.md for es, fr, zh, vi
 *
 * Env: DeepL_API_KEY or DEEPL_API_KEY (free keys end in :fx)
 */

import { createHash } from "node:crypto";
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { dirname, join, basename } from "node:path";
import { fileURLToPath } from "node:url";
import * as deepl from "deepl-node";
import dotenv from "dotenv";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
dotenv.config({ path: join(ROOT, ".env") });

const API_KEY =
  process.env.DeepL_API_KEY ||
  process.env.DEEPL_API_KEY ||
  process.env.deepl_api_key;

if (!API_KEY) {
  console.error(
    "Missing DeepL API key. Set DeepL_API_KEY (or DEEPL_API_KEY) in .env"
  );
  process.exit(1);
}

/** Hugo lang → DeepL target code */
const LOCALES = {
  es: "es",
  fr: "fr",
  zh: "zh-hans",
  vi: "vi",
};

/** English source files to translate (relative to content/). Skip CHARTER. */
const SOURCE_FILES = [
  "_index.md",
  "faq.md",
  "community.md",
  "documentation.md",
];

const CACHE_PATH = join(__dirname, ".translate-cache.json");
const CONTENT_DIR = join(ROOT, "content");

const translator = new deepl.Translator(API_KEY);

function sha256(text) {
  return createHash("sha256").update(text, "utf8").digest("hex");
}

function loadCache() {
  if (!existsSync(CACHE_PATH)) return {};
  try {
    return JSON.parse(readFileSync(CACHE_PATH, "utf8"));
  } catch {
    return {};
  }
}

function saveCache(cache) {
  writeFileSync(CACHE_PATH, JSON.stringify(cache, null, 2) + "\n", "utf8");
}

/** Split markdown body into blocks; keep fenced code as single blocks. */
function splitBlocks(body) {
  const lines = body.replace(/\r\n/g, "\n").split("\n");
  const blocks = [];
  let buf = [];
  let inFence = false;

  const flush = () => {
    const text = buf.join("\n");
    buf = [];
    if (text.trim() === "" && text === "") return;
    // Preserve intentional blank-only blocks? Skip empty.
    if (text.trim() === "") return;
    blocks.push(text);
  };

  for (const line of lines) {
    if (/^```/.test(line)) {
      if (!inFence) {
        if (buf.length) flush();
        inFence = true;
        buf = [line];
      } else {
        buf.push(line);
        inFence = false;
        flush();
      }
      continue;
    }
    if (inFence) {
      buf.push(line);
      continue;
    }
    if (line.trim() === "") {
      if (buf.length) flush();
      continue;
    }
    buf.push(line);
  }
  if (buf.length) flush();
  return blocks;
}

function parseFrontMatter(raw) {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!m) return { fm: {}, fmRaw: "", body: raw };
  const fmRaw = m[1];
  const body = m[2];
  const fm = {};
  for (const line of fmRaw.split("\n")) {
    const kv = line.match(/^([A-Za-z0-9_]+):\s*(.*)$/);
    if (!kv) continue;
    let val = kv[2].trim();
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    fm[kv[1]] = val;
  }
  return { fm, fmRaw, body };
}

function isCodeBlock(block) {
  return /^```/.test(block.trimStart());
}

function slugFromFilename(name) {
  // _index.md → home; faq.md → faq
  const base = basename(name, ".md");
  return base === "_index" ? "home" : base;
}

function buildFrontMatter(fm, lang, translationKey) {
  const title = fm.title ?? "";
  const author = fm.author ?? "SBOMit Maintainers";
  const showToc = fm.ShowToc;
  const lines = [
    "---",
    `author: "${author}"`,
    `title: "${title.replace(/"/g, '\\"')}"`,
    `translationKey: "${translationKey}"`,
  ];
  if (showToc !== undefined) {
    lines.push(`ShowToc: ${showToc}`);
  }
  lines.push("---", "");
  return lines.join("\n");
}

async function translateTexts(texts, targetLang) {
  if (texts.length === 0) return [];
  // DeepL accepts string | string[]; preserve order
  const result = await translator.translateText(texts, "en", targetLang, {
    tagHandling: "html",
    preserveFormatting: true,
  });
  const arr = Array.isArray(result) ? result : [result];
  return arr.map((r) => r.text);
}

async function translateFile(relPath, cache, stats) {
  const abs = join(CONTENT_DIR, relPath);
  if (!existsSync(abs)) {
    console.warn(`Skip missing: ${relPath}`);
    return;
  }
  const raw = readFileSync(abs, "utf8");
  const { fm, body } = parseFrontMatter(raw);
  const translationKey = slugFromFilename(relPath);
  const blocks = splitBlocks(body);

  // Title is a separately cached string
  const titleEn = fm.title || "";

  for (const [hugoLang, deeplLang] of Object.entries(LOCALES)) {
    const outBlocks = [];
    const toTranslate = []; // { index in outBlocks placeholder | 'title', text, hash }
    const jobs = [];

    // Title
    if (titleEn) {
      const hash = sha256(`title:${titleEn}`);
      const cached = cache[hash]?.[hugoLang];
      if (cached) {
        stats.hits++;
        jobs.push({ kind: "title", text: cached, hash });
      } else {
        stats.misses++;
        jobs.push({ kind: "title", text: null, hash, source: titleEn });
        toTranslate.push({ jobIdx: jobs.length - 1, source: titleEn });
      }
    } else {
      jobs.push({ kind: "title", text: titleEn, hash: null });
    }

    for (const block of blocks) {
      if (isCodeBlock(block)) {
        outBlocks.push(block);
        jobs.push({ kind: "block", text: block, hash: null, skip: true });
        continue;
      }
      const hash = sha256(block);
      const cached = cache[hash]?.[hugoLang];
      if (cached) {
        stats.hits++;
        outBlocks.push(cached);
        jobs.push({ kind: "block", text: cached, hash, skip: true });
      } else {
        stats.misses++;
        const placeholderIdx = outBlocks.length;
        outBlocks.push(null);
        jobs.push({
          kind: "block",
          text: null,
          hash,
          source: block,
          outIdx: placeholderIdx,
        });
        toTranslate.push({
          jobIdx: jobs.length - 1,
          source: block,
          outIdx: placeholderIdx,
        });
      }
    }

    if (toTranslate.length) {
      const sources = toTranslate.map((t) => t.source);
      console.log(
        `  DeepL ${hugoLang}: ${sources.length} block(s) for ${relPath}`
      );
      const translated = await translateTexts(sources, deeplLang);
      for (let i = 0; i < toTranslate.length; i++) {
        const t = toTranslate[i];
        const text = translated[i];
        const job = jobs[t.jobIdx];
        job.text = text;
        if (!cache[job.hash]) cache[job.hash] = {};
        cache[job.hash][hugoLang] = text;
        if (job.kind === "block" && t.outIdx !== undefined) {
          outBlocks[t.outIdx] = text;
        }
      }
    }

    const titleTranslated =
      jobs.find((j) => j.kind === "title")?.text ?? titleEn;
    const fmOut = {
      ...fm,
      title: titleTranslated,
    };
    // Rebuild outBlocks from jobs that aren't skip-filled... we already filled outBlocks
    const bodyOut = outBlocks.join("\n\n") + "\n";
    const header = buildFrontMatter(fmOut, hugoLang, translationKey);
    const outName =
      relPath === "_index.md"
        ? `_index.${hugoLang}.md`
        : `${basename(relPath, ".md")}.${hugoLang}.md`;
    const outPath = join(CONTENT_DIR, outName);
    writeFileSync(outPath, header + bodyOut, "utf8");
    console.log(`  wrote content/${outName}`);
  }
}

async function main() {
  console.log("SBOMit translate — block-level DeepL cache\n");
  const cache = loadCache();
  const stats = { hits: 0, misses: 0 };

  for (const file of SOURCE_FILES) {
    console.log(`Source: content/${file}`);
    await translateFile(file, cache, stats);
  }

  saveCache(cache);
  console.log(
    `\nDone. cache hits=${stats.hits} misses=${stats.misses} → ${CACHE_PATH}`
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
