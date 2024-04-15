import { PrismaClient } from "@prisma/client";

// Declares a global variable prisma of type PrismaClient | undefined in the global scope.
// Cho phép ta truy cập biến prisma tại bất kỳ file nào mà không cần phải import
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

// Checks if globalThis.prisma (which is prisma declared globally earlier) is defined and assigns it to db.
// If prisma is not defined, it creates a new instance of PrismaClient and assigns it to db.
export const db = globalThis.prisma || new PrismaClient();

// ensures that if the Node.js environment is not in production mode, it assigns the db instance to globalThis.prisma.
// This is likely done to maintain a single instance of the Prisma client across the application in development environments, optimizing resource usage.
if (process.env.NODE_ENV !== "production") globalThis.prisma = db;

// In summary, this code sets up a Prisma database client instance (db) that can be used throughout the application.
// It ensures that only one instance of the client is created and reused in non-production environments
// to optimize resource usage.
