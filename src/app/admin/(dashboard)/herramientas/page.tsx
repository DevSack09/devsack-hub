import Link from "next/link";
import { Plus } from "lucide-react";
import { getAllToolsForAdmin } from "@/lib/data/tools";
import { ToolsTable } from "@/components/admin/ToolsTable";

export default async function AdminHerramientasPage() {
  const tools = await getAllToolsForAdmin();

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-primary text-3xl font-bold text-foreground">Gestionar herramientas</h1>
        <Link
          href="/admin/herramientas/nueva"
          className="flex items-center gap-2 rounded-full bg-dev-blue px-5 py-2 font-secondary text-sm font-medium text-black transition-colors hover:bg-dev-blue/90"
        >
          <Plus size={16} />
          Nueva herramienta
        </Link>
      </div>

      <div className="mt-6">
        <ToolsTable tools={tools} />
      </div>
    </div>
  );
}
