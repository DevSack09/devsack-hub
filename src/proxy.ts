import NextAuth from "next-auth";
import { authConfig } from "@/lib/auth.config";

// Chequeo optimista: solo redirige si no hay sesión. La verificación real
// de autorización vive en cada Server Action (ver lib/actions), cerca de Prisma.
const { auth } = NextAuth(authConfig);

export const proxy = auth;

export const config = {
  matcher: ["/admin/:path*"],
};
