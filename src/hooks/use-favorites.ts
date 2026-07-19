"use client";

import { useCallback, useSyncExternalStore } from "react";

const STORAGE_KEY = "devsack-hub:favorites";
const listeners = new Set<() => void>();

let cachedRaw: string | null = null;
let cachedValue: string[] = [];

function readFavorites(): string[] {
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (raw !== cachedRaw) {
    cachedRaw = raw;
    try {
      cachedValue = raw ? JSON.parse(raw) : [];
    } catch {
      cachedValue = [];
    }
  }
  return cachedValue;
}

function writeFavorites(next: string[]) {
  cachedValue = next;
  cachedRaw = JSON.stringify(next);
  window.localStorage.setItem(STORAGE_KEY, cachedRaw);
  listeners.forEach((listener) => listener());
}

function subscribe(callback: () => void) {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

function getServerSnapshot(): string[] {
  return [];
}

// Favoritos del visitante público, guardados en localStorage (no hay cuentas
// de usuario público, solo el admin autenticado).
export function useFavorites() {
  const favoriteIds = useSyncExternalStore(subscribe, readFavorites, getServerSnapshot);

  const toggleFavorite = useCallback((toolId: string) => {
    const current = readFavorites();
    const next = current.includes(toolId)
      ? current.filter((id) => id !== toolId)
      : [...current, toolId];
    writeFavorites(next);
  }, []);

  return { favoriteIds, toggleFavorite };
}
