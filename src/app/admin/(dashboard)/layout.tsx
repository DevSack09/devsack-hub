import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

// Verificación real de sesión (el proxy.ts solo hace el chequeo optimista).
export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  if (!session?.user) {
    redirect("/admin/login");
  }

  return (
    <div className="flex min-h-screen bg-background text-foreground transition-colors duration-300">
      <AdminSidebar userEmail={session.user.email ?? ""} />
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
