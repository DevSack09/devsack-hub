"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { LanguageToggle } from "@/components/ui/LanguageToggle";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { PixelIcon, STAR, pixelBody, pixelCorner, pixelDisplay } from "@/components/pixel/pixel-kit";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const { t } = useLanguage();
  const closeMenu = () => setIsOpen(false);

  const NAV_LINKS = [
    { label: t.nav.explore, href: "/#herramientas" },
    { label: t.nav.about, href: "/#footer" },
  ];

  return (
    <header className="sticky top-4 z-50 mx-4 md:mx-8">
      <div
        className="mx-auto flex max-w-5xl items-center justify-between border-2 border-border bg-surface/90 px-4 py-3 shadow-lg shadow-black/5 backdrop-blur-xl dark:shadow-black/20 sm:px-6"
        style={{ clipPath: pixelCorner(8) }}
      >
        <Link href="/" className="flex items-center gap-2" onClick={closeMenu}>
          <PixelIcon glyph={STAR} size={18} className="text-dev-green" />
          <span className={`${pixelDisplay.className} text-[10px] tracking-tight sm:text-xs`}>
            <span className="text-dev-blue">DEV</span>
            <span className="text-dev-green">.</span>
            <span className="text-foreground">SACK</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`group relative ${pixelBody.className} text-base tracking-widest text-foreground/70 transition-colors hover:text-dev-blue`}
            >
              {link.label.toUpperCase()}
              <span className="absolute -bottom-1 left-0 h-[3px] w-0 bg-dev-blue transition-all duration-200 ease-out group-hover:w-full" />
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle variant="pixel" />
          <LanguageToggle />
        </div>

        <button
          type="button"
          onClick={() => setIsOpen((value) => !value)}
          aria-label={isOpen ? t.nav.closeMenu : t.nav.openMenu}
          aria-expanded={isOpen}
          className="flex h-9 w-9 items-center justify-center border-2 border-border bg-surface text-foreground transition-colors hover:border-dev-blue hover:text-dev-blue md:hidden"
          style={{ clipPath: pixelCorner(4) }}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={isOpen ? "close" : "open"}
              initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
              transition={{ duration: 0.2 }}
            >
              {isOpen ? <X size={18} /> : <Menu size={18} />}
            </motion.span>
          </AnimatePresence>
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -8 }}
            transition={{ duration: shouldReduceMotion ? 0.01 : 0.2, ease: "easeOut" }}
            className="mx-auto mt-2 max-w-5xl border-2 border-border bg-surface/95 backdrop-blur-xl md:hidden"
            style={{ clipPath: pixelCorner(8) }}
          >
            <div className="flex flex-col gap-1 p-4">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  className={`${pixelBody.className} border-b border-border/60 py-3 text-lg tracking-widest text-foreground/80 transition-colors last:border-b-0 hover:text-dev-blue`}
                >
                  {link.label.toUpperCase()}
                </Link>
              ))}
              <div className="mt-3 flex items-center gap-3 pt-1">
                <ThemeToggle variant="pixel" />
                <LanguageToggle />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
