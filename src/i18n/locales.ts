// Lista de idiomas soportados: agregar uno nuevo es sumar su código acá +
// su diccionario en src/i18n/dictionaries/ (ver ese directorio).
export const SUPPORTED_LOCALES = ["es", "en"] as const;
export type Locale = (typeof SUPPORTED_LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "es";
export const LOCALE_STORAGE_KEY = "devsack-lang";

export function isLocale(value: string | null | undefined): value is Locale {
  return SUPPORTED_LOCALES.includes(value as Locale);
}
