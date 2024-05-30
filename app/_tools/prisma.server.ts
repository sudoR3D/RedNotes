import { PrismaClient } from "@prisma/client";

let notedb: PrismaClient;

declare global {
    var __db: PrismaClient | undefined;
}

if (process.env.NODE_ENV === 'production') {
    notedb = new PrismaClient();
    notedb.$connect();
} else {
    if (!global.__db) {
        global.__db = new PrismaClient();
        global.__db.$connect();
    }
    notedb = global.__db;
}
export { notedb };