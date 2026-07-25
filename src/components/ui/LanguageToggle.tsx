"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Languages } from "lucide-react";
import { useHasMounted } from "@/hooks/use-has-mounted";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { pixelBody, pixelCorner } from "@/components/pixel/pixel-kit";

// Control visual con estado persistido (LanguageProvider + localStorage) que
// alterna el idioma de todo el contenido traducible de la app.
export function LanguageToggle() {
  const hasMounted = useHasMounted();
  const { locale, setLocale } = useLanguage();

  if (!hasMounted) {
    return <div className="h-9 w-[4.5rem]" />;
  }

  const toggle = () => setLocale(locale === "es" ? "en" : "es");

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={locale === "es" ? "Switch to English" : "Cambiar a español"}
      className="relative flex h-9 items-center gap-1.5 border-2 border-border bg-surface px-2.5 text-foreground transition-colors hover:border-dev-green hover:text-dev-green focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dev-green/40"
      style={{ clipPath: pixelCorner(4) }}
    >
      <Languages size={14} />
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={locale}
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 6 }}
          transition={{ duration: 0.2 }}
          className={`${pixelBody.className} text-sm`}
        >
          {locale.toUpperCase()}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
