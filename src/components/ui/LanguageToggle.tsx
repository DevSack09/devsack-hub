"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Languages } from "lucide-react";
import { useHasMounted } from "@/hooks/use-has-mounted";
import { pixelBody, pixelCorner } from "@/components/pixel/pixel-kit";

const STORAGE_KEY = "devsack-lang";
type Lang = "es" | "en";

// Control visual con estado persistido (localStorage). Todavía no traduce el
// contenido de la interfaz: eso queda para una tarea posterior.
export function LanguageToggle() {
  const hasMounted = useHasMounted();
  const [lang, setLang] = useState<Lang>("es");

  useEffect(() => {
    // Se difiere a un microtask para no llamar setState de forma síncrona
    // dentro del cuerpo del efecto (la lectura de localStorage sigue
    // ocurriendo en el primer tick disponible tras el montaje).
    queueMicrotask(() => {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored === "es" || stored === "en") setLang(stored);
    });
  }, []);

  if (!hasMounted) {
    return <div className="h-9 w-[4.5rem]" />;
  }

  const toggle = () => {
    const next: Lang = lang === "es" ? "en" : "es";
    setLang(next);
    window.localStorage.setItem(STORAGE_KEY, next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={lang === "es" ? "Switch to English" : "Cambiar a español"}
      className="relative flex h-9 items-center gap-1.5 border-2 border-border bg-surface px-2.5 text-foreground transition-colors hover:border-dev-green hover:text-dev-green focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dev-green/40"
      style={{ clipPath: pixelCorner(4) }}
    >
      <Languages size={14} />
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={lang}
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 6 }}
          transition={{ duration: 0.2 }}
          className={`${pixelBody.className} text-sm`}
        >
          {lang.toUpperCase()}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
