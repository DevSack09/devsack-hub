"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { DEFAULT_LOCALE, LOCALE_STORAGE_KEY, SUPPORTED_LOCALES, isLocale, type Locale } from "@/i18n/locales";
import { dictionaries, type Dictionary } from "@/i18n/dictionaries";

type LanguageContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  locales: readonly Locale[];
  t: Dictionary;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);

  // La preferencia guardada vive solo en localStorage (no hay lectura en el
  // server): se aplica en un microtask post-montaje, mismo patrón que ya usa
  // el resto de los controles persistidos del proyecto (ver useHasMounted),
  // para no disparar un setState síncrono dentro del efecto de montaje ni
  // producir un mismatch de hidratación (SSR y primer render de cliente
  // coinciden siempre en DEFAULT_LOCALE).
  useEffect(() => {
    queueMicrotask(() => {
      const stored = window.localStorage.getItem(LOCALE_STORAGE_KEY);
      if (isLocale(stored)) setLocaleState(stored);
    });
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = (next: Locale) => {
    setLocaleState(next);
    window.localStorage.setItem(LOCALE_STORAGE_KEY, next);
  };

  return (
    <LanguageContext.Provider
      value={{ locale, setLocale, locales: SUPPORTED_LOCALES, t: dictionaries[locale] }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage debe usarse dentro de <LanguageProvider>");
  }
  return context;
}
