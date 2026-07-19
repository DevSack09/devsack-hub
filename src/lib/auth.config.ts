import type { NextAuthConfig } from "next-auth";

/**
 * Config edge-safe: sin providers que dependan de Prisma/bcrypt.
 * La usa `proxy.ts` para el chequeo optimista de sesión, y `auth.ts` la extiende
 * con el provider de Credentials para la config completa en runtime de Node.
 */
export const authConfig = {
  pages: {
    signIn: "/admin/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isLoginPage = nextUrl.pathname === "/admin/login";
      const isAdminRoute = nextUrl.pathname.startsWith("/admin");

      if (isLoginPage) return true;
      if (isAdminRoute) return isLoggedIn;
      return true;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
