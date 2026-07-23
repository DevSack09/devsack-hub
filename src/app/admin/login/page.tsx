import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { LoginForm } from "@/components/admin/LoginForm";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

export default async function AdminLoginPage() {
  const session = await auth();
  if (session?.user) redirect("/admin");

  return (
    <main className="relative grid min-h-screen bg-background text-foreground transition-colors duration-300 lg:grid-cols-2">
      <div className="absolute right-4 top-4 z-10 lg:right-8 lg:top-8">
        <ThemeToggle />
      </div>

      <div className="relative hidden overflow-hidden lg:flex lg:flex-col lg:justify-center lg:p-16">
        <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-dev-blue/20 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-dev-green/20 blur-3xl" />
        <div className="relative">
          <h2 className="font-primary text-5xl font-bold tracking-tighter">
            <span className="text-dev-blue">Dev</span>
            <span className="text-dev-green">.</span>
            <span>Sack</span>
          </h2>
          <p className="mt-4 max-w-sm font-secondary text-foreground/60">
            Panel de administración del hub de herramientas.
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center p-6">
        <LoginForm />
      </div>
    </main>
  );
}
