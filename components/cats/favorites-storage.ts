import { FAVORITES_STORAGE_KEY } from "./constants";
import type { Cat } from "./types";

export function readFavorites(): Record<string, Cat> {
  if (typeof window === "undefined") {
    return {};
  }

  try {
    const rawValue = window.localStorage.getItem(FAVORITES_STORAGE_KEY);
    return rawValue ? (JSON.parse(rawValue) as Record<string, Cat>) : {};
  } catch {
    return {};
  }
}

export function saveFavorites(favorites: Record<string, Cat>) {
  window.localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
}
