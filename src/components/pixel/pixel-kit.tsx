import { JetBrains_Mono, Press_Start_2P, VT323 } from "next/font/google";

// Tipografía pixel/retro compartida por el Hero y el Navbar (no afecta el resto del sitio).
export const pixelDisplay = Press_Start_2P({ subsets: ["latin"], weight: "400" });
export const pixelBody = VT323({ subsets: ["latin"], weight: "400" });

// Monoespaciada para texto de apoyo con acento "código", usada en el párrafo del Hero.
export const monoBody = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500"] });

// Esquinas "pixeladas" (staircase) en vez de border-radius, para botones/paneles pixel-art.
export function pixelCorner(cut: number) {
  return `polygon(${cut}px 0, calc(100% - ${cut}px) 0, 100% ${cut}px, 100% calc(100% - ${cut}px), calc(100% - ${cut}px) 100%, ${cut}px 100%, 0 calc(100% - ${cut}px), 0 ${cut}px)`;
}

// Glifos pixel-art de 8x8, dibujados a mano como filas de texto ("1" = pixel encendido).
export type PixelGlyph = readonly string[];

export const GEM: PixelGlyph = [
  "...11...",
  "..1111..",
  ".111111.",
  "11111111",
  ".111111.",
  "..1111..",
  "...11...",
  "........",
];
export const BOLT: PixelGlyph = [
  "....11..",
  "...11...",
  "..11....",
  ".11111..",
  "....11..",
  "...11...",
  "..11....",
  ".1......",
];
export const STAR: PixelGlyph = [
  "...11...",
  "...11...",
  ".1.11.1.",
  "11111111",
  ".1.11.1.",
  "...11...",
  "...11...",
  "........",
];
export const BOX: PixelGlyph = [
  "........",
  ".111111.",
  ".1....1.",
  ".1....1.",
  ".1....1.",
  ".1....1.",
  ".111111.",
  "........",
];
export const HEART: PixelGlyph = [
  ".11.11..",
  "1111111.",
  "1111111.",
  ".11111..",
  "..111...",
  "...1....",
  "........",
  "........",
];

// Retícula de fondo estilo "hoja cuadriculada" (mismo patrón que usa el Hero),
// reutilizada por cualquier zona que necesite ecoar esa textura pixel-art.
export function PixelGrid({
  className = "",
  size = 32,
  fadeToBottom = false,
}: {
  className?: string;
  size?: number;
  // Atenúa la retícula hacia abajo en vez de cortarla en seco al llegar al borde.
  fadeToBottom?: boolean;
}) {
  const fadeMask = fadeToBottom ? "linear-gradient(to bottom, black, transparent)" : undefined;

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 ${className}`}
      style={{
        backgroundImage:
          "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
        backgroundSize: `${size}px ${size}px`,
        maskImage: fadeMask,
        WebkitMaskImage: fadeMask,
      }}
    />
  );
}

export function PixelIcon({
  glyph,
  size,
  className,
}: {
  glyph: PixelGlyph;
  size: number;
  className?: string;
}) {
  const gridSize = glyph.length;
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${gridSize} ${gridSize}`}
      shapeRendering="crispEdges"
      className={className}
      aria-hidden="true"
    >
      {glyph.flatMap((row, y) =>
        [...row].map((cell, x) =>
          cell === "1" ? <rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} fill="currentColor" /> : null
        )
      )}
    </svg>
  );
}
