import { drizzle } from "drizzle-orm/postgres-js";
import { env } from "@/env.mjs";

const db = drizzle(env.NEXT_PUBLIC_SUPABASE_URL);

// const allUsers = await db.select().from(...);
