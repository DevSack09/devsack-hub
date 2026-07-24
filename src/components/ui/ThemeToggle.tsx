"use client";

import { useTheme } from "next-themes";
import { AnimatePresence, motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useHasMounted } from "@/hooks/use-has-mounted";
import { pixelCorner } from "@/components/pixel/pixel-kit";

type ThemeToggleProps = {
  /** "pixel" usa el look pixel-art (esquinas escalonadas) del Navbar/Hero público. */
  variant?: "default" | "pixel";
};

export function ThemeToggle({ variant = "default" }: ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const hasMounted = useHasMounted();

  if (!hasMounted) {
    return <div className="h-9 w-9" />;
  }

  const isDark = resolvedTheme === "dark";
  const isPixel = variant === "pixel";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Cambiar a tema claro" : "Cambiar a tema oscuro"}
      aria-pressed={isDark}
      className={
        isPixel
          ? "relative flex h-9 w-9 items-center justify-center border-2 border-border bg-surface text-foreground transition-colors hover:border-dev-blue hover:text-dev-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dev-blue/40"
          : "relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-border bg-surface text-foreground transition-colors hover:bg-border/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dev-blue/40"
      }
      style={isPixel ? { clipPath: pixelCorner(4) } : undefined}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={isDark ? "moon" : "sun"}
          initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
          transition={{ duration: 0.25 }}
        >
          {isDark ? <Moon size={16} /> : <Sun size={16} />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
