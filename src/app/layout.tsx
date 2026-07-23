import type { Metadata } from "next";
import { Montserrat, Poppins } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";

// Configuración de Montserrat como fuente primaria (para títulos y acentos)
const montserratFont = Montserrat({
  subsets: ["latin"],
  variable: "--font-primary",
  weight: ["300", "400", "500", "700", "900"],
});

// Configuración de Poppins como fuente secundaria (para cuerpo de texto y lectura)
const poppinsFont = Poppins({
  subsets: ["latin"],
  variable: "--font-secondary",
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Dev.sack | Hub",
  description: "Desarrollador Fullstack & Diseñador de Interfaces Premium",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${montserratFont.variable} ${poppinsFont.variable}`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body className="bg-background text-foreground antialiased font-secondary transition-colors duration-300">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}