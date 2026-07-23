import Link from "next/link";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

export function Navbar() {
  return (
    <header className="sticky top-4 z-50 mx-4 md:mx-8">
      <div className="mx-auto flex max-w-5xl items-center justify-between rounded-full border border-border bg-surface/80 px-5 py-3 shadow-lg shadow-black/5 backdrop-blur-xl dark:shadow-black/20">
        <Link href="/" className="font-primary text-lg font-bold tracking-tight">
          <span className="text-dev-blue">Dev</span>
          <span className="text-dev-green">.</span>
          <span className="text-foreground">Sack</span>
        </Link>

        <nav className="flex items-center gap-6">
          <Link
            href="/"
            className="hidden font-secondary text-sm text-foreground/70 transition-colors hover:text-foreground sm:inline"
          >
            Herramientas
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
