import { atom } from "jotai";
import type { SerializableAliveTask } from "../../../../../../server/service/codex/types";

export const aliveTasksAtom = atom<SerializableAliveTask[]>([]);
