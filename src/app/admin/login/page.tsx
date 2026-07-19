// Formulario de login (Credentials provider). Fuera de (dashboard) a propósito:
// así no queda detrás del guard de sesión en (dashboard)/layout.tsx.
export default function AdminLoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <h1 className="font-primary text-3xl font-bold">Iniciar sesión</h1>
    </main>
  );
}
