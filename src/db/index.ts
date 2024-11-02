import { drizzle } from "drizzle-orm/postgres-js";
import { env } from "@/env.mjs";

const db = drizzle(env.DATABASE_URL);

// const allUsers = await db.select().from(...);
