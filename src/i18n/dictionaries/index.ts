import es from "@/i18n/dictionaries/es.json";
import en from "@/i18n/dictionaries/en.json";
import type { Locale } from "@/i18n/locales";

// es.json es la fuente de verdad: si en.json no tiene exactamente las
// mismas claves, esta asignación falla en build (no hace falta un test aparte).
export type Dictionary = typeof es;

export const dictionaries: Record<Locale, Dictionary> = { es, en };
