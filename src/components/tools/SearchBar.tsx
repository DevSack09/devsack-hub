"use client";

import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { pixelBody, pixelCorner } from "@/components/pixel/pixel-kit";

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
};

export function SearchBar({ value, onChange }: SearchBarProps) {
  const { t } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
      className="relative mx-auto w-full max-w-xl"
    >
      <Search
        size={18}
        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-foreground/40"
      />
      <input
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={t.explorer.searchPlaceholder}
        aria-label={t.explorer.searchAriaLabel}
        className={`${pixelBody.className} w-full border-2 border-border bg-surface/80 py-3 pl-11 pr-4 text-lg tracking-wide text-foreground caret-dev-blue shadow-lg shadow-black/5 backdrop-blur-xl outline-none transition-colors placeholder:text-foreground/40 focus:border-dev-blue focus:shadow-[0_0_0_3px_rgba(56,182,255,0.18)] dark:shadow-black/20`}
        style={{ clipPath: pixelCorner(6) }}
      />
    </motion.div>
  );
}
