import path from "path";

/** \\?\ 接頭辞を除去し、Win32正規化＋ドライブ大文字化 */
export function canonicalizeWinCwd(raw: string): string {
  if (!raw) return raw;
  const stripped = raw.replace(/^\\\\\?\\/, "");
  const norm = path.win32.normalize(stripped);
  return norm.replace(/^([a-z]):/, (_m, d: string) => d.toUpperCase() + ":");
}
