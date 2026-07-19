// Shell del hub público: acá irá el navbar con buscador y el footer,
// compartidos por /herramientas, /categorias/[slug] y /etiquetas/[slug].
export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen">{children}</div>;
}
