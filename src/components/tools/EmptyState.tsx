import { SearchX } from "lucide-react";

export function EmptyState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-border py-20 text-center">
      <SearchX size={32} className="text-foreground/30" />
      <p className="font-secondary text-sm text-foreground/60">{message}</p>
    </div>
  );
}
