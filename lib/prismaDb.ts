import { PrismaClient } from "@prisma/client";

declare global {
  namespace NodeJS {
    interface Global {
      prisma?: PrismaClient;
    }
  }
}

const prismadb = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  global.prisma = prismadb;
}

export default prismadb;
