import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function seed() {
  const categorySqlQueries = [
    prisma.$executeRaw`INSERT INTO "JourneyCategory" ("title", "value") VALUES ('Wilderness', 'wilderness')`,
    prisma.$executeRaw`INSERT INTO "JourneyCategory" ("title", "value") VALUES ('Mountain', 'mountain')`,
    prisma.$executeRaw`INSERT INTO "JourneyCategory" ("title", "value") VALUES ('Cultural', 'cultural')`,
    prisma.$executeRaw`INSERT INTO "JourneyCategory" ("title", "value") VALUES ('Long distance', 'longDistance')`,
    prisma.$executeRaw`INSERT INTO "JourneyCategory" ("title", "value") VALUES ('Bike', 'bike')`,
    prisma.$executeRaw`INSERT INTO "JourneyCategory" ("title", "value") VALUES ('Foot walk', 'footWalk')`,
  ];

  await Promise.all(categorySqlQueries);
}

seed()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
