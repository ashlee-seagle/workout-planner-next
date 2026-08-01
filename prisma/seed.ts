import prisma from "../src/lib/prisma";

async function main() {
  const user = await prisma.user.upsert({
    where: {
      email: "dev@example.com",
    },
    update: {},
    create: {
      email: "dev@example.com",
      name: "Development User",
    },
  });

  console.log(`Seeded user: ${user.id}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 