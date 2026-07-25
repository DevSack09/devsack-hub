"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { BOLT, PixelIcon, pixelBody } from "@/components/pixel/pixel-kit";

// Encabezado de la sección Explorar: vive en un client component (a diferencia
// del resto de page.tsx) porque debe reaccionar al toggle de idioma sin recarga,
// algo que un Server Component no puede hacer.
export function ExplorerHeading({ hasFeatured }: { hasFeatured: boolean }) {
  const { t } = useLanguage();

  return (
    <div className="mb-6 flex items-center gap-2.5">
      <PixelIcon glyph={BOLT} size={20} className="text-dev-blue" />
      <h2 className={`${pixelBody.className} text-2xl tracking-wide text-foreground sm:text-3xl`}>
        {hasFeatured ? t.explorer.heading : t.explorer.headingEmpty}
      </h2>
    </div>
  );
}
