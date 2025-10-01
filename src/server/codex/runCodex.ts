import { spawn } from "node:child_process";
import path from "path";
import { canonicalizeWinCwd } from "@/lib/winpath";

export type ExecOpts = {
  cwd: string;
  prompt: string;
  resume?: string;
  sandbox?: string;
  extraArgs?: string[];
};

function codexBin(): string {
  if (process.platform === "win32") {
    const appdata = process.env["APPDATA"] ?? "";
    return path.win32.join(
      appdata,
      "npm",
      "node_modules",
      "@openai",
      "codex",
      "bin",
      "codex-x86_64-pc-windows-msvc.exe",
    );
  }
  return "codex";
}

export function buildArgs(o: ExecOpts): string[] {
  const safeCwd = canonicalizeWinCwd(o.cwd);
  const sandbox = process.env["CODEX_SANDBOX"] ?? o.sandbox ?? "workspace-write";
  const a = ["exec", "--skip-git-repo-check", "--json", "--sandbox", sandbox, "--cd", safeCwd];
  if (o.resume) a.push("resume", o.resume);
  a.push(o.prompt);
  if (o.extraArgs?.length) a.push(...o.extraArgs);
  return a;
}

export function runCodex(o: ExecOpts) {
  const bin = codexBin();
  const args = buildArgs(o);
  return spawn(bin, args, {
    shell: false,
    windowsVerbatimArguments: false,
    cwd: canonicalizeWinCwd(o.cwd),
    env: process.env,
    stdio: ["ignore", "pipe", "pipe"],
  });
}
