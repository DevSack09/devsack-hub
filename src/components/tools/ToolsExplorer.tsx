"use client";

import { useMemo, useState } from "react";
import { X } from "lucide-react";
import { SearchBar } from "@/components/tools/SearchBar";
import { FilterPills } from "@/components/tools/FilterPills";
import { ToolGrid } from "@/components/tools/ToolGrid";
import { useDebounce } from "@/hooks/use-debounce";
import { useToolFilters } from "@/hooks/use-tool-filters";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { monoBody, pixelBody, pixelCorner } from "@/components/pixel/pixel-kit";
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
  const { t } = useLanguage();

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

      <div
        className="flex flex-col gap-6 border-2 border-border bg-surface/50 p-5 backdrop-blur-sm sm:p-6"
        style={{ clipPath: pixelCorner(8) }}
      >
        <FilterPills
          label={t.explorer.categoryLabel}
          items={categories}
          selected={selectedCategory ? [selectedCategory] : []}
          onToggle={(slug) => setFilter("categoria", selectedCategory === slug ? null : slug)}
          accent="green"
          variant="solid"
        />
        <FilterPills
          label={t.explorer.tagsLabel}
          items={tags}
          selected={selectedTags}
          onToggle={(slug) => toggleListFilter("tags", slug)}
          accent="green"
        />
        <FilterPills
          label={t.explorer.technologiesLabel}
          items={technologies}
          selected={selectedTechnologies}
          onToggle={(slug) => toggleListFilter("tecnologias", slug)}
          accent="green"
        />

        {hasActiveFilters && (
          <button
            type="button"
            onClick={handleClearAll}
            className={`${pixelBody.className} flex w-fit items-center gap-1.5 border border-border px-3 py-1.5 text-sm tracking-wide text-foreground/60 transition-colors hover:border-dev-green/60 hover:text-foreground`}
            style={{ clipPath: pixelCorner(3) }}
          >
            <X size={14} />
            {t.explorer.clearFilters.toUpperCase()}
          </button>
        )}
      </div>

      <p className={`${monoBody.className} text-sm text-foreground/50`}>
        <span className="text-dev-green">{">"}</span>{" "}
        {filteredTools.length} {filteredTools.length === 1 ? t.explorer.resultsOne : t.explorer.resultsOther}
      </p>

      <ToolGrid
        tools={filteredTools}
        emptyMessage={hasActiveFilters ? t.explorer.emptyFiltered : t.explorer.emptyDefault}
      />
    </div>
  );
}
