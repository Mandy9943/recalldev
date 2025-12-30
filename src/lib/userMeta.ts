import { QuestionReport, UserMeta } from "@/types";

const STORAGE_KEY_USER_META = "recall_dev_v2_user_meta";

function emptyUserMeta(): UserMeta {
  return {
    version: 1,
    myAnswerById: {},
    notesById: {},
    bookmarksById: {},
    reports: [],
  };
}

function looksLikeStringRecord(x: unknown): x is Record<string, string> {
  if (!x || typeof x !== "object" || Array.isArray(x)) return false;
  return Object.values(x).every((v) => typeof v === "string");
}

function looksLikeBoolRecord(x: unknown): x is Record<string, boolean> {
  if (!x || typeof x !== "object" || Array.isArray(x)) return false;
  return Object.values(x).every((v) => typeof v === "boolean");
}

function looksLikeReport(x: unknown): x is QuestionReport {
  if (!x || typeof x !== "object" || Array.isArray(x)) return false;
  const r = x as any;
  if (typeof r.questionId !== "string") return false;
  if (typeof r.ts !== "number" || !Number.isFinite(r.ts)) return false;
  if (r.reason !== undefined && typeof r.reason !== "string") return false;
  if (r.note !== undefined && typeof r.note !== "string") return false;
  return true;
}

export function readUserMeta(): UserMeta {
  if (typeof window === "undefined") return emptyUserMeta();
  try {
    const raw = localStorage.getItem(STORAGE_KEY_USER_META);
    if (!raw) return emptyUserMeta();
    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed))
      return emptyUserMeta();

    const p = parsed as any;
    const v = p.version;
    if (v !== 1) return emptyUserMeta();

    const out: UserMeta = emptyUserMeta();
    if (looksLikeStringRecord(p.myAnswerById)) out.myAnswerById = p.myAnswerById;
    if (looksLikeStringRecord(p.notesById)) out.notesById = p.notesById;
    if (looksLikeBoolRecord(p.bookmarksById))
      out.bookmarksById = p.bookmarksById;
    if (Array.isArray(p.reports)) {
      out.reports = p.reports.filter(looksLikeReport);
    }
    return out;
  } catch {
    return emptyUserMeta();
  }
}

export function writeUserMeta(next: UserMeta): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY_USER_META, JSON.stringify(next));
  } catch {
    // ignore
  }
}

export function getMyAnswer(questionId: string): string {
  const meta = readUserMeta();
  return meta.myAnswerById[questionId] ?? "";
}

export function setMyAnswer(questionId: string, text: string): void {
  const meta = readUserMeta();
  meta.myAnswerById[questionId] = text;
  writeUserMeta(meta);
}

export function getNotes(questionId: string): string {
  const meta = readUserMeta();
  return meta.notesById[questionId] ?? "";
}

export function setNotes(questionId: string, text: string): void {
  const meta = readUserMeta();
  meta.notesById[questionId] = text;
  writeUserMeta(meta);
}

export function isBookmarked(questionId: string): boolean {
  const meta = readUserMeta();
  return Boolean(meta.bookmarksById[questionId]);
}

export function toggleBookmark(questionId: string): boolean {
  const meta = readUserMeta();
  const next = !Boolean(meta.bookmarksById[questionId]);
  meta.bookmarksById[questionId] = next;
  writeUserMeta(meta);
  return next;
}

export function addReport(input: {
  questionId: string;
  reason?: string;
  note?: string;
}): QuestionReport {
  const meta = readUserMeta();
  const report: QuestionReport = {
    questionId: input.questionId,
    ts: Date.now(),
    reason: input.reason?.trim() ? input.reason.trim() : undefined,
    note: input.note?.trim() ? input.note.trim() : undefined,
  };
  meta.reports = [...(meta.reports || []), report].slice(-500);
  writeUserMeta(meta);
  return report;
}


