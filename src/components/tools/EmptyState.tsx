import { SearchX } from "lucide-react";
import { PixelGrid, pixelBody, pixelCorner } from "@/components/pixel/pixel-kit";

export function EmptyState({ message }: { message: string }) {
  return (
    <div
      className="relative flex flex-col items-center justify-center gap-3 overflow-hidden border-2 border-border bg-surface/40 py-20 text-center"
      style={{ clipPath: pixelCorner(10) }}
    >
      <PixelGrid className="opacity-20" size={24} />
      <SearchX size={32} className="relative text-foreground/30" />
      <p className={`${pixelBody.className} relative text-lg text-foreground/60`}>{message}</p>
    </div>
  );
}
