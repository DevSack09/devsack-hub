import Link from "next/link";
import { LogOut } from "lucide-react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { logout } from "@/lib/actions/auth";

const links = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/herramientas", label: "Herramientas" },
  { href: "/admin/categorias", label: "Categorías" },
  { href: "/admin/etiquetas", label: "Etiquetas" },
  { href: "/admin/tecnologias", label: "Tecnologías" },
];

export function AdminSidebar({ userEmail }: { userEmail: string }) {
  return (
    <aside className="flex w-64 shrink-0 flex-col justify-between border-r border-border bg-surface p-6">
      <div>
        <h2 className="font-primary text-lg font-bold">
          <span className="text-dev-blue">Dev</span>
          <span className="text-dev-green">.</span>
          <span className="text-foreground">Sack</span>
        </h2>

        <nav className="mt-8 flex flex-col gap-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2 font-secondary text-sm text-foreground/70 transition-colors hover:bg-border/40 hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="flex flex-col gap-3 border-t border-border pt-4">
        <div className="flex items-center justify-between gap-2">
          <span className="truncate font-secondary text-xs text-foreground/50">{userEmail}</span>
          <ThemeToggle />
        </div>

        <form action={logout}>
          <button
            type="submit"
            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 font-secondary text-sm text-foreground/70 transition-colors hover:bg-border/40 hover:text-foreground"
          >
            <LogOut size={16} />
            Cerrar sesión
          </button>
        </form>
      </div>
    </aside>
  );
}
