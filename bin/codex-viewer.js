#!/usr/bin/env node

import { env } from "node:process";

const DEFAULT_PORT = Number(env.PORT ?? "3400");
const TARGET_ORIGIN = `http://localhost:${DEFAULT_PORT}`;
const DISABLE_AUTO_OPEN = [
  env.CC_VIEWER_NO_AUTO_OPEN,
  env.NO_AUTO_OPEN,
  env.NO_AUTO_BROWSER,
]
  .filter((value) => value !== undefined)
  .map((value) => value?.toLowerCase())
  .some((value) => value === "1" || value === "true" || value === "yes");

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const isServerReady = async (url) => {
  try {
    const response = await fetch(url, { method: "GET" });
    return response.ok || response.status === 200;
  } catch (error) {
    if (
      error?.code === "ECONNREFUSED" ||
      error?.code === "ECONNRESET" ||
      error?.name === "FetchError"
    ) {
      return false;
    }
    throw error;
  }
};

const waitForServer = async (url, attempts = 40, interval = 250) => {
  for (let attempt = 0; attempt < attempts; attempt += 1) {
    const ready = await isServerReady(url).catch(() => false);
    if (ready) {
      return true;
    }
    await sleep(interval);
  }
  return false;
};

const openBrowser = async (url) => {
  if (DISABLE_AUTO_OPEN) {
    return;
  }

  const ready = await waitForServer(url).catch(() => false);
  if (!ready) {
    console.warn(
      `[codex-viewer] サーバー起動を確認できなかったためブラウザ自動起動をスキップします (${url})`,
    );
    return;
  }

  try {
    const { default: open } = await import("open");
    await open(url, { wait: false });
    console.log(`[codex-viewer] ブラウザを自動起動しました: ${url}`);
  } catch (error) {
    console.warn(`ブラウザ自動起動に失敗しました: ${error}`);
  }
};

(async () => {
  await import(new URL("../dist/standalone/server.js", import.meta.url)).catch(
    (error) => {
      console.error(error);
      process.exit(1);
    },
  );

  void openBrowser(TARGET_ORIGIN);
})();
