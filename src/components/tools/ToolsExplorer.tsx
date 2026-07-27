"use client";

import { useMemo, useState } from "react";
import { SearchBar } from "@/components/tools/SearchBar";
import { ToolGrid } from "@/components/tools/ToolGrid";
import { useDebounce } from "@/hooks/use-debounce";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { monoBody } from "@/components/pixel/pixel-kit";
import type { ToolWithRelations } from "@/types";

type ToolsExplorerProps = {
  tools: ToolWithRelations[];
};

export function ToolsExplorer({ tools }: ToolsExplorerProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 250);
  const { t } = useLanguage();

  const filteredTools = useMemo(() => {
    const term = debouncedSearch.trim().toLowerCase();
    if (!term) return tools;

    return tools.filter(
      (tool) =>
        tool.name.toLowerCase().includes(term) || tool.description.toLowerCase().includes(term)
    );
  }, [tools, debouncedSearch]);

  return (
    <div className="flex flex-col gap-8">
      <SearchBar value={searchTerm} onChange={setSearchTerm} />

      <p className={`${monoBody.className} text-sm text-foreground/50`}>
        <span className="text-dev-green">{">"}</span>{" "}
        {filteredTools.length} {filteredTools.length === 1 ? t.explorer.resultsOne : t.explorer.resultsOther}
      </p>

      <ToolGrid
        tools={filteredTools}
        emptyMessage={debouncedSearch.trim() ? t.explorer.emptyFiltered : t.explorer.emptyDefault}
      />
    </div>
  );
}
