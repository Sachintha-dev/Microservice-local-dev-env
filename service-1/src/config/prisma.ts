import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const connectToPrisma = async (): Promise<void> => {
  try {
    await prisma.$connect();
    console.log("🐘 [postgres-database]: Connected to Prisma successfully! ✅");
  } catch (error) {
    console.error("💥 [postgres-database]: Error connecting to Prisma", error);
    process.exit(1);
  }
};

export const disconnectFromPrisma = async (): Promise<void> => {
  try {
    await prisma.$disconnect();
    console.log(
      "🐘 [postgres-database]: Disconnected from Prisma successfully! ✅"
    );
  } catch (error) {
    console.error(
      "💥 [postgres-database]: Error disconnecting from Prisma",
      error
    );
  }
};

export default prisma;
