import "dotenv/config";
import { serve } from "@hono/node-server";
import { Hono } from "hono";
import {corsMiddleware} from "./middleware/cors"
import authRoutes from "./routes/auth"; 
import cmsRoutes from './routes/cms';
import protectedRoutes from "./routes/protected"; 

const app = new Hono();

app.use("*", corsMiddleware);
app.route("/auth", authRoutes);
app.route("/secure", protectedRoutes);

//cms
app.route('/api', cmsRoutes);

const port = Number(process.env.PORT) || 4000;

serve({ fetch: app.fetch, port });

console.log(`✅ Server running on http://localhost:${port}`);
