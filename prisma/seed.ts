import "dotenv/config";
import bcrypt from "bcryptjs";
import { prisma } from "../src/lib/prisma";

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL ?? "admin@devsack.dev";
  const adminPassword = process.env.ADMIN_PASSWORD ?? "changeme123";

  await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      name: "Dev.Sack",
      passwordHash: await bcrypt.hash(adminPassword, 10),
    },
  });

  const categories = [
    { name: "Inteligencia Artificial", slug: "ia" },
    { name: "Componentes UI", slug: "componentes-ui" },
    { name: "Iconos e imágenes", slug: "iconos-imagenes" },
    { name: "Documentación y APIs", slug: "documentacion-apis" },
    { name: "Inspiración", slug: "inspiracion" },
    { name: "Utilidades", slug: "utilidades" },
  ];

  for (const category of categories) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: {},
      create: category,
    });
  }

  const tags = [
    { name: "Gratis", slug: "gratis" },
    { name: "Freemium", slug: "freemium" },
    { name: "Open Source", slug: "open-source" },
    { name: "IA generativa", slug: "ia-generativa" },
    { name: "No-code", slug: "no-code" },
    { name: "Productividad", slug: "productividad" },
    { name: "Colaborativo", slug: "colaborativo" },
    { name: "Self-hosted", slug: "self-hosted" },
  ];

  for (const tag of tags) {
    await prisma.tag.upsert({
      where: { slug: tag.slug },
      update: {},
      create: tag,
    });
  }

  const technologies = [
    { name: "React", slug: "react" },
    { name: "Next.js", slug: "nextjs" },
    { name: "Tailwind CSS", slug: "tailwindcss" },
    { name: "TypeScript", slug: "typescript" },
    { name: "Python", slug: "python" },
    { name: "Node.js", slug: "nodejs" },
    { name: "PostgreSQL", slug: "postgresql" },
    { name: "Figma", slug: "figma" },
    { name: "Docker", slug: "docker" },
    { name: "GraphQL", slug: "graphql" },
  ];

  for (const technology of technologies) {
    await prisma.technology.upsert({
      where: { slug: technology.slug },
      update: {},
      create: technology,
    });
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
