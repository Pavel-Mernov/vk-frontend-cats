import type { TabId } from "./types";

export const FAVORITES_STORAGE_KEY = "favorite-cats";
export const PAGE_SIZE = 10;

export const tabs: Array<{ id: TabId; label: string }> = [
  { id: "all", label: "Все котики" },
  { id: "favorites", label: "Любимые котики" }
];
