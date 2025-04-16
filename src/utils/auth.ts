import "dotenv/config";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
//~-------------------------------------
// Choose your database:
// Local Postgres:
// import db from "../db/client/client-pg-local";

// Neon (for serverless):
import db from "../db/client/client-neon";
//~-------------------------------------
import { schema } from "../db/schema";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema,
    usePlural: true,
  }),
  emailAndPassword: {
    enabled: true,
  },
});
