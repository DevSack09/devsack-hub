export default async function HerramientaDetallePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <main className="p-12">
      <h1 className="font-primary text-3xl font-bold">Herramienta: {slug}</h1>
    </main>
  );
}
