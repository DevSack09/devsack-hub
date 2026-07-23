import { getTechnologies } from "@/lib/data/technologies";
import { createTechnology, updateTechnology, deleteTechnology } from "@/lib/actions/technologies";
import { CatalogManager } from "@/components/admin/CatalogManager";

export default async function AdminTecnologiasPage() {
  const technologies = await getTechnologies();

  return (
    <div>
      <h1 className="font-primary text-3xl font-bold text-foreground">Tecnologías</h1>
      <div className="mt-6">
        <CatalogManager
          items={technologies}
          createAction={createTechnology}
          updateAction={updateTechnology}
          deleteAction={deleteTechnology}
          emptyLabel="Todavía no hay tecnologías."
        />
      </div>
    </div>
  );
}
