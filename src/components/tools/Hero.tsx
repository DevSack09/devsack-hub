"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import {
  fadeInUp,
  fadeInUpReduced,
  staggerContainer,
  staggerContainerReduced,
} from "@/components/tools/motion-variants";
import { useLanguage } from "@/components/providers/LanguageProvider";
import {
  BOLT,
  BOX,
  GEM,
  HEART,
  PixelIcon,
  STAR,
  monoBody,
  pixelBody,
  pixelCorner,
  pixelDisplay,
} from "@/components/pixel/pixel-kit";

const TYPE_SPEED_MS = 45;
const SPOTLIGHT_SIZE = 420;

// Acento de color por posición del badge (el texto llega traducido vía t.hero.badges).
const BADGE_ACCENTS = ["blue", "green", "blue"] as const;

// Posiciones y datos fijos (no Math.random()) para que el marcado coincida
// entre el render de servidor y el de cliente y no dispare un mismatch de hidratación.
const FLOATING_ICONS = [
  { glyph: GEM, top: "14%", left: "8%", size: 30, color: "text-dev-blue/70", duration: 7, delay: 0, rotate: -8 },
  { glyph: BOLT, top: "74%", left: "6%", size: 24, color: "text-dev-green/60", duration: 8, delay: 1.4, rotate: 10 },
  { glyph: STAR, top: "18%", left: "89%", size: 26, color: "text-dev-green/70", duration: 6.5, delay: 0.6, rotate: 6 },
  { glyph: BOX, top: "70%", left: "90%", size: 30, color: "text-dev-blue/60", duration: 9, delay: 2, rotate: -10 },
  { glyph: HEART, top: "8%", left: "46%", size: 20, color: "text-dev-blue/50", duration: 7.5, delay: 0.3, rotate: 4 },
  { glyph: GEM, top: "86%", left: "56%", size: 22, color: "text-dev-green/50", duration: 8.5, delay: 1.8, rotate: -6 },
] as const;

const PARTICLES = [
  { top: "24%", left: "22%", size: 3, duration: 7, delay: 0, color: "bg-dev-blue/50" },
  { top: "64%", left: "16%", size: 2, duration: 9, delay: 1.2, color: "bg-dev-green/50" },
  { top: "34%", left: "62%", size: 2, duration: 8, delay: 0.6, color: "bg-dev-blue/40" },
  { top: "78%", left: "70%", size: 3, duration: 6.5, delay: 2, color: "bg-dev-green/40" },
  { top: "48%", left: "80%", size: 2, duration: 7.5, delay: 0.4, color: "bg-dev-blue/50" },
  { top: "12%", left: "66%", size: 2, duration: 8.5, delay: 1.6, color: "bg-dev-green/50" },
  { top: "56%", left: "34%", size: 2, duration: 6, delay: 0.9, color: "bg-dev-blue/40" },
  { top: "90%", left: "38%", size: 2, duration: 9.5, delay: 2.4, color: "bg-dev-green/40" },
] as const;

// Efecto máquina de escribir: revela el texto carácter a carácter.
// Desactivado (texto completo de una) si el usuario prefiere motion reducido.
function useTypewriter(text: string, speed: number, enabled: boolean) {
  const [output, setOutput] = useState("");

  useEffect(() => {
    if (!enabled) return;

    let i = 0;
    const interval = setInterval(() => {
      i += 1;
      setOutput(text.slice(0, i));
      if (i >= text.length) clearInterval(interval);
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed, enabled]);

  return enabled ? output : text;
}

export function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const { t } = useLanguage();
  const item = shouldReduceMotion ? fadeInUpReduced : fadeInUp;
  const typedTagline = useTypewriter(t.hero.tagline, TYPE_SPEED_MS, !shouldReduceMotion);
  const badges = t.hero.badges.map((label, index) => ({ label, accent: BADGE_ACCENTS[index] }));

  const sectionRef = useRef<HTMLElement>(null);
  const spotlightX = useMotionValue(0);
  const spotlightY = useMotionValue(0);
  const springX = useSpring(spotlightX, { stiffness: 60, damping: 20, mass: 0.6 });
  const springY = useSpring(spotlightY, { stiffness: 60, damping: 20, mass: 0.6 });

  // Spotlight que sigue el cursor: se mueve vía motion values (fuera del ciclo
  // de render de React) para no afectar el rendimiento.
  useEffect(() => {
    if (shouldReduceMotion) return;
    const section = sectionRef.current;
    if (!section) return;

    const { width, height } = section.getBoundingClientRect();
    spotlightX.set(width / 2 - SPOTLIGHT_SIZE / 2);
    spotlightY.set(height / 2 - SPOTLIGHT_SIZE / 2);

    const handlePointerMove = (event: PointerEvent) => {
      const rect = section.getBoundingClientRect();
      spotlightX.set(event.clientX - rect.left - SPOTLIGHT_SIZE / 2);
      spotlightY.set(event.clientY - rect.top - SPOTLIGHT_SIZE / 2);
    };

    section.addEventListener("pointermove", handlePointerMove);
    return () => section.removeEventListener("pointermove", handlePointerMove);
  }, [shouldReduceMotion, spotlightX, spotlightY]);

  return (
    // "dark" fuerza los tokens de tema oscuro dentro del Hero sin importar el
    // tema elegido por el visitante: la estética "espacio pixel-art" solo funciona en oscuro.
    <section
      ref={sectionRef}
      className="dark relative isolate flex min-h-screen items-center overflow-hidden bg-background px-5 text-foreground sm:px-8 md:px-10"
    >
      {/* Fondo base */}
      <div className="absolute inset-0 -z-30 bg-gradient-to-b from-background via-background to-surface/60" />

      {/* Retícula estilo "hoja cuadriculada" */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          maskImage: "radial-gradient(ellipse 70% 60% at 50% 40%, black 0%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 60% at 50% 40%, black 0%, transparent 80%)",
        }}
      />

      {/* Spotlight interactivo que sigue el cursor */}
      {!shouldReduceMotion && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute -z-10 rounded-full bg-dev-blue/10 blur-[100px]"
          style={{
            width: SPOTLIGHT_SIZE,
            height: SPOTLIGHT_SIZE,
            left: springX,
            top: springY,
          }}
        />
      )}

      {/* Glows decorativos con la paleta de marca */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          className="absolute -left-32 top-1/4 h-72 w-72 rounded-full bg-dev-blue/25 blur-[100px]"
          animate={
            shouldReduceMotion ? undefined : { y: [0, 24, 0], opacity: [0.25, 0.4, 0.25] }
          }
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -right-24 bottom-1/4 h-80 w-80 rounded-full bg-dev-green/20 blur-[110px]"
          animate={
            shouldReduceMotion ? undefined : { y: [0, -20, 0], opacity: [0.2, 0.35, 0.2] }
          }
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
      </div>

      {/* Polvo de píxeles */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        {PARTICLES.map((particle, index) => (
          <motion.span
            key={index}
            className={`absolute ${particle.color}`}
            style={{
              top: particle.top,
              left: particle.left,
              width: particle.size,
              height: particle.size,
            }}
            animate={
              shouldReduceMotion ? undefined : { y: [0, -16, 0], opacity: [0.3, 0.9, 0.3] }
            }
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: particle.delay,
            }}
          />
        ))}
      </div>

      {/* Sprites pixel-art flotantes */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        {FLOATING_ICONS.map((icon, index) => (
          <motion.div
            key={index}
            className={`absolute ${icon.color}`}
            style={{ top: icon.top, left: icon.left }}
            initial={{ rotate: icon.rotate }}
            animate={
              shouldReduceMotion
                ? undefined
                : { y: [0, -14, 0], rotate: [icon.rotate, icon.rotate + 6, icon.rotate] }
            }
            transition={{
              duration: icon.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: icon.delay,
            }}
          >
            <PixelIcon glyph={icon.glyph} size={icon.size} />
          </motion.div>
        ))}
      </div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={shouldReduceMotion ? staggerContainerReduced : staggerContainer}
        className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center text-center"
      >
        <motion.div
          variants={item}
          className="flex flex-wrap items-center justify-center gap-2 sm:gap-3"
        >
          {badges.map((badge) => (
            <span
              key={badge.label}
              className={`${pixelBody.className} border px-3 py-1.5 text-xs tracking-wider sm:text-sm ${
                badge.accent === "blue"
                  ? "border-dev-blue/60 text-dev-blue"
                  : "border-dev-green/60 text-dev-green"
              }`}
              style={{ clipPath: pixelCorner(4) }}
            >
              {badge.label}
            </span>
          ))}
        </motion.div>

        <motion.h1
          variants={item}
          className={`${pixelDisplay.className} mt-8 text-3xl leading-none tracking-tight sm:text-5xl md:text-6xl lg:text-7xl`}
        >
          <span
            className="text-dev-blue"
            style={{ textShadow: "0 0 24px rgba(56, 182, 255, 0.55), 0 0 48px rgba(56, 182, 255, 0.25)" }}
          >
            DEV
          </span>
          <span className="text-dev-green" style={{ textShadow: "0 0 24px rgba(3, 250, 110, 0.55)" }}>
            .
          </span>
          <span>SACK</span>
        </motion.h1>

        <motion.p
          variants={item}
          aria-label={t.hero.tagline}
          className={`${pixelBody.className} mt-6 text-2xl text-dev-green sm:mt-8 sm:text-3xl md:text-4xl`}
        >
          <span aria-hidden="true">{typedTagline}</span>
          {!shouldReduceMotion && (
            <motion.span
              aria-hidden="true"
              className="ml-1 inline-block h-[0.9em] w-[3px] translate-y-[0.1em] bg-dev-blue align-middle"
              animate={{ opacity: [1, 1, 0, 0] }}
              transition={{ duration: 1, repeat: Infinity, times: [0, 0.5, 0.5, 1] }}
            />
          )}
        </motion.p>

        <motion.p
          variants={item}
          className={`${monoBody.className} mt-6 max-w-xl text-base text-foreground/60 sm:text-lg`}
        >
          {t.hero.paragraph}
        </motion.p>

        <motion.div
          variants={item}
          className="mt-9 flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="#herramientas"
            className="inline-flex items-center gap-2 bg-dev-green px-5 py-3 font-secondary text-sm font-semibold text-black transition-colors hover:bg-dev-green/90 sm:text-base"
            style={{ clipPath: pixelCorner(6) }}
          >
            {t.hero.ctaExplore}
            <ArrowRight size={16} />
          </a>
          <a
            href="#destacadas"
            className="inline-flex items-center gap-2 border-2 border-dev-blue px-5 py-3 font-secondary text-sm font-semibold text-dev-blue transition-colors hover:bg-dev-blue hover:text-black sm:text-base"
            style={{ clipPath: pixelCorner(6) }}
          >
            {t.hero.ctaFeatured}
            <ArrowRight size={16} />
          </a>
        </motion.div>
      </motion.div>

      {/* Indicador de scroll: refuerza que hay más contenido debajo */}
      {!shouldReduceMotion && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 sm:bottom-10"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="text-foreground/40"
          >
            <ChevronDown size={18} />
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
