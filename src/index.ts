import { serve } from "@hono/node-server";
import { Hono } from "hono";
import "dotenv/config";

import betterAuthMiddleware from "./middleware/better-auth";
import authRoutes from "./routes/auth"; // only /register
import protectedRoutes from "./routes/protected"; // /me with session

const app = new Hono();

app.route("/api", authRoutes);
app.route("/api", betterAuthMiddleware);
app.route("/api", protectedRoutes);

const port = Number(process.env.PORT) || 4000;

serve({ fetch: app.fetch, port });

console.log(`✅ Server running on http://localhost:${port}`);
