import { defineConfig } from "drizzle-kit";
export default defineConfig({
  out: './migrations/drizzle',   
  schema: './src/db/schema.ts',
  dialect: 'postgresql',
  dbCredentials: { url: process.env.NEON_DATABASE_URL! },
});