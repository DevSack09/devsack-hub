export default async function EditarHerramientaPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div>
      <h1 className="font-primary text-3xl font-bold">Editar herramienta {id}</h1>
    </div>
  );
}
