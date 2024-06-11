// Import the PrismaClient constructor from the @prisma/client package
import { PrismaClient } from "@prisma/client"

// Declare a variable to hold the PrismaClient instance
let notedb: PrismaClient

// Declare a global variable to handle the PrismaClient instance in non-production environments
declare global {
    // This prevents the PrismaClient from being reinitialized in development mode
    // by storing it in a global variable.
    var __db: PrismaClient | undefined
}

// Initialize the PrismaClient instance based on the environment
if (process.env.NODE_ENV === 'production') {
    // In production, create a new PrismaClient instance and connect it
    notedb = new PrismaClient()
    notedb.$connect()
} else {
    // In development, reuse the global PrismaClient instance if it exists
    if (!global.__db) {
        global.__db = new PrismaClient()
        global.__db.$connect()
    }
    notedb = global.__db
}

// Export the PrismaClient instance for use in other parts of the application
export { notedb } 
