import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

// Shell del hub público: navbar flotante + footer, compartidos por
// "/" (galería de herramientas), /categorias/[slug] y /etiquetas/[slug].
// Theme-aware.
export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
