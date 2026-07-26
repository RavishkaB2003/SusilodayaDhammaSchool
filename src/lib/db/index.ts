import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";
import * as dotenv from "dotenv";

dotenv.config();

const databaseUrl = process.env.DATABASE_URL;

// During Next.js build phase (static generation/analysis), environment variables might not be loaded.
// We avoid throwing an error to prevent breaking the build, but will fail at runtime if missing.
if (!databaseUrl) {
  if (process.env.NEXT_PHASE === "phase-production-build") {
    console.warn("⚠️ DATABASE_URL is missing. Using placeholder client for build phase.");
  } else {
    throw new Error("DATABASE_URL is missing from environment variables");
  }
}

const connectionString = databaseUrl || "postgres://placeholder:placeholder@localhost:5432/placeholder";
const queryClient = postgres(connectionString, { max: 1 });
export const db = drizzle(queryClient, { schema });
