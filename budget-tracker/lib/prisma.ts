import { PrismaClient } from "@prisma/client";

// Create a singleton for Prisma Client
const prismaClientSingleton = () => {
  return new PrismaClient();
};

// Initialize prisma as a singleton instance directly
const prisma = prismaClientSingleton();

export default prisma;
