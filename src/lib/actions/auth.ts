"use server";

import { AuthError } from "next-auth";
import { signIn, signOut } from "@/lib/auth";
import { loginSchema } from "@/lib/validations/auth.schema";

export async function authenticate(_prevState: string | undefined, formData: FormData) {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return "Revisa los datos ingresados.";
  }

  try {
    await signIn("credentials", {
      email: parsed.data.email,
      password: parsed.data.password,
      redirectTo: "/admin",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Credenciales inválidas.";
        default:
          return "No se pudo iniciar sesión. Intenta de nuevo.";
      }
    }
    throw error;
  }
}

export async function logout() {
  await signOut({ redirectTo: "/admin/login" });
}
