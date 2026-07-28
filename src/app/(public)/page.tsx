import type { Metadata } from "next";
import { getActiveTools, getFeaturedTools } from "@/lib/data/tools";
import { Hero } from "@/components/tools/Hero";
import { FeaturedSection } from "@/components/tools/FeaturedSection";
import { ToolsExplorer } from "@/components/tools/ToolsExplorer";
import { ExplorerHeading } from "@/components/tools/ExplorerHeading";
import { AboutSection } from "@/components/tools/AboutSection";
import { PixelGrid } from "@/components/pixel/pixel-kit";

export const metadata: Metadata = {
  title: "Dev.Sack Hub | Herramientas",
  description: "Galería de herramientas, IA, componentes y utilidades curadas por Dev.Sack.",
};

export default async function HomePage() {
  const [tools, featuredTools] = await Promise.all([getActiveTools(), getFeaturedTools()]);

  return (
    <>
      <Hero />

      <main className="relative">
        {/* Continuidad de textura: el Hero ya comparte el mismo tema que el resto
            de la página (dejó de forzar "dark"), así que no hace falta fundir
            colores acá — solo se extiende la retícula pixel-art un poco más
            para que el corte hacia el contenido no se sienta tan abrupto. */}
        <PixelGrid
          className="-z-10 top-0 h-32 opacity-20 sm:h-40"
          size={32}
          fadeToBottom
        />

        <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-20 px-4 pb-24 pt-36 sm:pt-44 md:px-8">
          <FeaturedSection tools={featuredTools} />

          <section id="herramientas" className="scroll-mt-24">
            <ExplorerHeading hasFeatured={featuredTools.length > 0} />
            <ToolsExplorer tools={tools} />
          </section>

          <AboutSection />
        </div>
      </main>
    </>
  );
}
