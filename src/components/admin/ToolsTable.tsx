import Image from "next/image";
import { ToolRowActions } from "@/components/admin/ToolRowActions";
import type { ToolWithRelations } from "@/types";

export function ToolsTable({ tools }: { tools: ToolWithRelations[] }) {
  if (tools.length === 0) {
    return (
      <p className="font-secondary text-sm text-foreground/60">
        Todavía no hay herramientas. Creá la primera con el botón de arriba.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-border">
      <table className="w-full text-left font-secondary text-sm">
        <thead className="border-b border-border bg-surface text-foreground/60">
          <tr>
            <th className="p-3 font-medium">Herramienta</th>
            <th className="p-3 font-medium">Categoría</th>
            <th className="p-3 font-medium">Etiquetas</th>
            <th className="p-3 font-medium">Estado</th>
            <th className="p-3 font-medium">Recom.</th>
            <th className="p-3 font-medium">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {tools.map((tool) => (
            <tr key={tool.id} className="border-b border-border last:border-0">
              <td className="p-3">
                <div className="flex items-center gap-3">
                  {tool.imageUrl ? (
                    <Image
                      src={tool.imageUrl}
                      alt=""
                      width={40}
                      height={40}
                      unoptimized
                      className="h-10 w-10 rounded-lg object-cover"
                    />
                  ) : (
                    <div className="h-10 w-10 rounded-lg bg-border" />
                  )}
                  <span className="font-medium text-foreground">{tool.name}</span>
                </div>
              </td>
              <td className="p-3 text-foreground/70">{tool.category.name}</td>
              <td className="p-3 text-foreground/70">
                {tool.tags.map((tag) => tag.name).join(", ") || "—"}
              </td>
              <td className="p-3">
                <span
                  className={`rounded-full px-2 py-1 text-xs ${
                    tool.status === "ACTIVE"
                      ? "bg-dev-green/10 text-dev-green"
                      : "bg-foreground/10 text-foreground/50"
                  }`}
                >
                  {tool.status === "ACTIVE" ? "Activo" : "Inactivo"}
                </span>
              </td>
              <td className="p-3 text-foreground/70">{tool.recommendationLevel}/5</td>
              <td className="p-3">
                <ToolRowActions id={tool.id} status={tool.status} isFeatured={tool.isFeatured} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
