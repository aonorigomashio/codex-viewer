import { existsSync, type FSWatcher, watch } from "node:fs";
import { join } from "node:path";

import {
  getCachedSessionRecord,
  readSessionHeader,
} from "../codex/sessionFiles";
import { codexSessionsRootPath } from "../paths";
import { encodeProjectId } from "../project/id";
import { encodeSessionId } from "../session/id";
import { type EventBus, getEventBus } from "./EventBus";

export class FileWatcherService {
  private watcher: FSWatcher | null = null;
  private projectWatchers: Map<string, FSWatcher> = new Map();
  private eventBus: EventBus;

  constructor() {
    this.eventBus = getEventBus();
  }

  public startWatching(): void {
    try {
      console.log("Starting file watcher on:", codexSessionsRootPath);
      // Codex セッションディレクトリを監視
      this.watcher = watch(
        codexSessionsRootPath,
        { persistent: false, recursive: true },
        async (eventType, filename) => {
          if (!filename || !filename.endsWith(".jsonl")) return;

          const absolutePath = join(codexSessionsRootPath, filename);
          let projectId: string | null = null;

          if (existsSync(absolutePath)) {
            const header = await readSessionHeader(absolutePath);
            if (header?.workspacePath) {
              projectId = encodeProjectId(header.workspacePath);
            }
          }

          if (!projectId) {
            const cached = getCachedSessionRecord(absolutePath);
            if (cached?.workspacePath) {
              projectId = encodeProjectId(cached.workspacePath);
            }
          }

          const sessionId = encodeSessionId(absolutePath);

          this.eventBus.emit("project_changed", {
            type: "project_changed",
            data: {
              fileEventType: eventType,
              projectId,
            },
          });

          this.eventBus.emit("session_changed", {
            type: "session_changed",
            data: {
              projectId,
              sessionId,
              fileEventType: eventType,
            },
          });
        },
      );
      console.log("File watcher initialization completed");
    } catch (error) {
      console.error("Failed to start file watching:", error);
    }
  }

  public stop(): void {
    if (this.watcher) {
      this.watcher.close();
      this.watcher = null;
    }

    for (const [, watcher] of this.projectWatchers) {
      watcher.close();
    }
    this.projectWatchers.clear();
  }
}

// シングルトンインスタンス
let watcherInstance: FileWatcherService | null = null;

export const getFileWatcher = (): FileWatcherService => {
  if (!watcherInstance) {
    console.log("Creating new FileWatcher instance");
    watcherInstance = new FileWatcherService();
  }
  return watcherInstance;
};
