import fs from "node:fs";
import path from "node:path";

/**
 * Splits src/data/questions/javascript.ts into per-difficulty files:
 * - src/data/questions/javascript/junior.ts
 * - src/data/questions/javascript/mid.ts
 * - src/data/questions/javascript/senior.ts
 * - src/data/questions/javascript/staff.ts
 *
 * It does a lightweight brace-depth parse that ignores braces inside strings
 * (single/double/backtick), so code fences inside question strings won't break it.
 */

const ROOT = process.cwd();
const INPUT = path.join(ROOT, "src/data/questions/javascript.ts");
const OUT_DIR = path.join(ROOT, "src/data/questions/javascript");

function extractArrayBlock(source) {
  const startToken = "export const JS_QUESTIONS";
  const startIdx = source.indexOf(startToken);
  if (startIdx === -1) throw new Error(`Could not find '${startToken}' in ${INPUT}`);

  const arrayStart = source.indexOf("[", startIdx);
  if (arrayStart === -1) throw new Error("Could not find start '[' for JS_QUESTIONS array");

  // Find the matching closing '];' for the array, respecting strings.
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

  if (i >= source.length) throw new Error("Could not find end of JS_QUESTIONS array");
  const arrayEnd = i; // position of matching ']'
  return source.slice(arrayStart + 1, arrayEnd); // inside the brackets
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
  const m = objText.match(/difficulty:\\s*\"(Junior|Mid|Senior|Staff)\"/);
  return m?.[1] ?? null;
}

function writeQuestionsFile(filePath, exportName, objects) {
  const header = `import { Question } from \"@/types\";\n\nexport const ${exportName}: Question[] = [\n`;
  const body = objects.map((o) => "  " + o.replace(/^\\s*/, "").replace(/\\n/g, "\n  ")).join(",\n") + (objects.length ? ",\n" : "");
  const footer = "];\n";
  fs.writeFileSync(filePath, header + body + footer, "utf8");
}

function main() {
  const source = fs.readFileSync(INPUT, "utf8");
  const arrayBody = extractArrayBlock(source);
  const objects = splitTopLevelObjects(arrayBody);
  if (!objects.length) throw new Error("No objects found in JS_QUESTIONS array");

  const buckets = { Junior: [], Mid: [], Senior: [], Staff: [] };
  const unknown = [];

  for (const obj of objects) {
    const d = getDifficulty(obj);
    if (!d) unknown.push(obj);
    else buckets[d].push(obj);
  }

  if (unknown.length) {
    throw new Error(`Found ${unknown.length} questions with no recognized difficulty`);
  }

  fs.mkdirSync(OUT_DIR, { recursive: true });

  writeQuestionsFile(path.join(OUT_DIR, "junior.ts"), "JS_QUESTIONS_JUNIOR", buckets.Junior);
  writeQuestionsFile(path.join(OUT_DIR, "mid.ts"), "JS_QUESTIONS_MID", buckets.Mid);
  writeQuestionsFile(path.join(OUT_DIR, "senior.ts"), "JS_QUESTIONS_SENIOR", buckets.Senior);
  writeQuestionsFile(path.join(OUT_DIR, "staff.ts"), "JS_QUESTIONS_STAFF", buckets.Staff);

  // Print a quick summary for humans/CI logs.
  // eslint-disable-next-line no-console
  console.log(
    JSON.stringify(
      {
        total: objects.length,
        junior: buckets.Junior.length,
        mid: buckets.Mid.length,
        senior: buckets.Senior.length,
        staff: buckets.Staff.length,
      },
      null,
      2
    )
  );
}

main();


