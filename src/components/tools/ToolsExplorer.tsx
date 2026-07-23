"use client";

import { useMemo, useState } from "react";
import { X } from "lucide-react";
import { SearchBar } from "@/components/tools/SearchBar";
import { FilterPills } from "@/components/tools/FilterPills";
import { ToolGrid } from "@/components/tools/ToolGrid";
import { useDebounce } from "@/hooks/use-debounce";
import { useToolFilters } from "@/hooks/use-tool-filters";
import type { Category, Tag, Technology, ToolWithRelations } from "@/types";

type ToolsExplorerProps = {
  tools: ToolWithRelations[];
  categories: Category[];
  tags: Tag[];
  technologies: Technology[];
};

export function ToolsExplorer({ tools, categories, tags, technologies }: ToolsExplorerProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 250);
  const { searchParams, setFilter, toggleListFilter, clearFilters } = useToolFilters();

  const selectedCategory = searchParams.get("categoria");
  const selectedTags = useMemo(
    () => searchParams.get("tags")?.split(",").filter(Boolean) ?? [],
    [searchParams]
  );
  const selectedTechnologies = useMemo(
    () => searchParams.get("tecnologias")?.split(",").filter(Boolean) ?? [],
    [searchParams]
  );

  const hasActiveFilters =
    Boolean(selectedCategory) ||
    selectedTags.length > 0 ||
    selectedTechnologies.length > 0 ||
    searchTerm.length > 0;

  const filteredTools = useMemo(() => {
    const term = debouncedSearch.trim().toLowerCase();

    return tools.filter((tool) => {
      if (
        term &&
        !tool.name.toLowerCase().includes(term) &&
        !tool.description.toLowerCase().includes(term)
      ) {
        return false;
      }

      if (selectedCategory && tool.category.slug !== selectedCategory) return false;

      if (
        selectedTags.length > 0 &&
        !selectedTags.every((slug) => tool.tags.some((tag) => tag.slug === slug))
      ) {
        return false;
      }

      if (
        selectedTechnologies.length > 0 &&
        !selectedTechnologies.every((slug) =>
          tool.technologies.some((technology) => technology.slug === slug)
        )
      ) {
        return false;
      }

      return true;
    });
  }, [tools, debouncedSearch, selectedCategory, selectedTags, selectedTechnologies]);

  const handleClearAll = () => {
    setSearchTerm("");
    clearFilters();
  };

  return (
    <div className="flex flex-col gap-8">
      <SearchBar value={searchTerm} onChange={setSearchTerm} />

      <div className="flex flex-col gap-5 rounded-2xl border border-border bg-surface/60 p-5">
        <FilterPills
          label="Categoría"
          items={categories}
          selected={selectedCategory ? [selectedCategory] : []}
          onToggle={(slug) => setFilter("categoria", selectedCategory === slug ? null : slug)}
        />
        <FilterPills
          label="Etiquetas"
          items={tags}
          selected={selectedTags}
          onToggle={(slug) => toggleListFilter("tags", slug)}
        />
        <FilterPills
          label="Tecnologías"
          items={technologies}
          selected={selectedTechnologies}
          onToggle={(slug) => toggleListFilter("tecnologias", slug)}
          activeClassName="border-dev-green bg-dev-green/10 text-dev-green"
        />

        {hasActiveFilters && (
          <button
            type="button"
            onClick={handleClearAll}
            className="flex w-fit items-center gap-1.5 font-secondary text-sm text-foreground/60 transition-colors hover:text-foreground"
          >
            <X size={14} />
            Limpiar filtros
          </button>
        )}
      </div>

      <p className="font-secondary text-sm text-foreground/50">
        {filteredTools.length} {filteredTools.length === 1 ? "herramienta encontrada" : "herramientas encontradas"}
      </p>

      <ToolGrid
        tools={filteredTools}
        emptyMessage={
          hasActiveFilters
            ? "No encontramos herramientas con esos filtros."
            : "Todavía no hay herramientas activas."
        }
      />
    </div>
  );
}
