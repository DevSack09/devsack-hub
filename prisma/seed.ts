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
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
