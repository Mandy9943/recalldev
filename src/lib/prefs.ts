import { Difficulty, ProgrammingLanguage } from "@/types";

export type SessionMode = "mix" | "due";

export type RecallDevPrefs = {
  lang?: ProgrammingLanguage;
  diff?: Difficulty;
  tags?: string[];
  len?: number;
  mode?: SessionMode;
};

const PREFS_KEY = "recall_dev_v2_prefs";

export function readPrefs(): RecallDevPrefs | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(PREFS_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== "object") return null;
    const p = parsed as any;
    const out: RecallDevPrefs = {};
    if (typeof p.lang === "string") out.lang = p.lang as ProgrammingLanguage;
    if (typeof p.diff === "string") out.diff = p.diff as Difficulty;
    if (Array.isArray(p.tags) && p.tags.every((t: unknown) => typeof t === "string")) {
      out.tags = p.tags as string[];
    }
    if (typeof p.len === "number" && Number.isFinite(p.len)) out.len = p.len as number;
    if (p.mode === "due" || p.mode === "mix") out.mode = p.mode as SessionMode;
    return out;
  } catch {
    return null;
  }
}

export function writePrefs(prefs: RecallDevPrefs) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(PREFS_KEY, JSON.stringify(prefs));
  } catch {
    // ignore
  }
}



