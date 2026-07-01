import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";
import * as dotenv from "dotenv";

dotenv.config();

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is missing from environment variables");
}

// For queries and transactions in Next.js Server Actions / API routes
const queryClient = postgres(process.env.DATABASE_URL, { max: 1 });
export const db = drizzle(queryClient, { schema });
