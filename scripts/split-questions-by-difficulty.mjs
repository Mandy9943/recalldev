import fs from "node:fs";
import path from "node:path";

/**
 * Generic splitter for files shaped like:
 *   export const <EXPORT_NAME>: Question[] = [ { ... }, ... ];
 *
 * It splits the top-level array objects by `difficulty: "Junior"|"Mid"|"Senior"|"Staff"`
 * and writes 4 files into OUT_DIR:
 *   - junior.ts, mid.ts, senior.ts, staff.ts
 *
 * Usage:
 *   node scripts/split-questions-by-difficulty.mjs \
 *     --input src/data/questions/typescript.ts \
 *     --export TS_QUESTIONS \
 *     --outDir src/data/questions/typescript \
 *     --outPrefix TS_QUESTIONS
 */

function getArg(flag) {
  const idx = process.argv.indexOf(flag);
  if (idx === -1) return null;
  return process.argv[idx + 1] ?? null;
}

const ROOT = process.cwd();
const inputRel = getArg("--input");
const exportName = getArg("--export");
const outDirRel = getArg("--outDir");
const outPrefix = getArg("--outPrefix");

if (!inputRel || !exportName || !outDirRel || !outPrefix) {
  throw new Error(
    "Missing args. Required: --input <path> --export <EXPORT_NAME> --outDir <dir> --outPrefix <PREFIX>"
  );
}

const INPUT = path.join(ROOT, inputRel);
const OUT_DIR = path.join(ROOT, outDirRel);

function extractArrayBlock(source) {
  const startToken = `export const ${exportName}`;
  const startIdx = source.indexOf(startToken);
  if (startIdx === -1) throw new Error(`Could not find '${startToken}' in ${INPUT}`);

  const eqIdx = source.indexOf("=", startIdx);
  if (eqIdx === -1) throw new Error(`Could not find '=' for ${exportName} assignment`);

  const arrayStart = source.indexOf("[", eqIdx);
  if (arrayStart === -1) throw new Error(`Could not find start '[' for ${exportName} array literal`);

  let i = arrayStart;
  let inSingle = false;
  let inDouble = false;
  let inBacktick = false;
  let escaped = false;
  let bracketDepth = 0;

  for (; i < source.length; i++) {
    const ch = source[i];

    if (escaped) {
      escaped = false;
      continue;
    }

    if (inSingle) {
      if (ch === "\\\\") escaped = true;
      else if (ch === "'") inSingle = false;
      continue;
    }
    if (inDouble) {
      if (ch === "\\\\") escaped = true;
      else if (ch === '"') inDouble = false;
      continue;
    }
    if (inBacktick) {
      if (ch === "\\\\") escaped = true;
      else if (ch === "`") inBacktick = false;
      continue;
    }

    if (ch === "'") inSingle = true;
    else if (ch === '"') inDouble = true;
    else if (ch === "`") inBacktick = true;
    else if (ch === "[") bracketDepth++;
    else if (ch === "]") {
      bracketDepth--;
      if (bracketDepth === 0) break;
    }
  }

  if (i >= source.length) throw new Error(`Could not find end of ${exportName} array`);
  return source.slice(arrayStart + 1, i);
}

function splitTopLevelObjects(arrayBody) {
  const objs = [];
  let inSingle = false;
  let inDouble = false;
  let inBacktick = false;
  let escaped = false;
  let depth = 0;
  let start = -1;

  for (let i = 0; i < arrayBody.length; i++) {
    const ch = arrayBody[i];

    if (escaped) {
      escaped = false;
      continue;
    }

    if (inSingle) {
      if (ch === "\\\\") escaped = true;
      else if (ch === "'") inSingle = false;
      continue;
    }
    if (inDouble) {
      if (ch === "\\\\") escaped = true;
      else if (ch === '"') inDouble = false;
      continue;
    }
    if (inBacktick) {
      if (ch === "\\\\") escaped = true;
      else if (ch === "`") inBacktick = false;
      continue;
    }

    if (ch === "'") inSingle = true;
    else if (ch === '"') inDouble = true;
    else if (ch === "`") inBacktick = true;
    else if (ch === "{") {
      if (depth === 0) start = i;
      depth++;
    } else if (ch === "}") {
      depth--;
      if (depth === 0 && start !== -1) {
        const obj = arrayBody.slice(start, i + 1).trim();
        if (obj) objs.push(obj);
        start = -1;
      }
    }
  }

  return objs;
}

function getDifficulty(objText) {
  const m = objText.match(/difficulty:\s*\"(Junior|Mid|Senior|Staff)\"/);
  return m?.[1] ?? null;
}

function writeQuestionsFile(filePath, exportConstName, objects) {
  const header = `import { Question } from \"@/types\";\n\nexport const ${exportConstName}: Question[] = [\n`;
  const body =
    objects
      .map((o) => "  " + o.replace(/^\s*/, "").replace(/\n/g, "\n  "))
      .join(",\n") + (objects.length ? ",\n" : "");
  const footer = "];\n";
  fs.writeFileSync(filePath, header + body + footer, "utf8");
}

const source = fs.readFileSync(INPUT, "utf8");
const arrayBody = extractArrayBlock(source);
const objects = splitTopLevelObjects(arrayBody);
if (!objects.length) throw new Error(`No objects found in ${exportName} array`);

const buckets = { Junior: [], Mid: [], Senior: [], Staff: [] };
const unknown = [];

for (const obj of objects) {
  const d = getDifficulty(obj);
  if (!d) unknown.push(obj);
  else buckets[d].push(obj);
}

if (unknown.length) {
  throw new Error(`Found ${unknown.length} questions with no recognized difficulty in ${inputRel}`);
}

fs.mkdirSync(OUT_DIR, { recursive: true });

writeQuestionsFile(path.join(OUT_DIR, "junior.ts"), `${outPrefix}_JUNIOR`, buckets.Junior);
writeQuestionsFile(path.join(OUT_DIR, "mid.ts"), `${outPrefix}_MID`, buckets.Mid);
writeQuestionsFile(path.join(OUT_DIR, "senior.ts"), `${outPrefix}_SENIOR`, buckets.Senior);
writeQuestionsFile(path.join(OUT_DIR, "staff.ts"), `${outPrefix}_STAFF`, buckets.Staff);

// eslint-disable-next-line no-console
console.log(
  JSON.stringify(
    {
      exportName,
      total: objects.length,
      junior: buckets.Junior.length,
      mid: buckets.Mid.length,
      senior: buckets.Senior.length,
      staff: buckets.Staff.length,
      outDir: outDirRel,
    },
    null,
    2
  )
);




