"use client";

import { motion } from "framer-motion";
import { Search } from "lucide-react";

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
};

export function SearchBar({ value, onChange }: SearchBarProps) {
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
        placeholder="Buscar herramientas..."
        aria-label="Buscar herramientas"
        className="w-full rounded-full border border-border bg-surface/80 py-3 pl-11 pr-4 font-secondary text-sm text-foreground shadow-lg shadow-black/5 backdrop-blur-xl outline-none transition-colors focus:border-dev-blue focus-visible:ring-2 focus-visible:ring-dev-blue/40 dark:shadow-black/20"
      />
    </motion.div>
  );
}
