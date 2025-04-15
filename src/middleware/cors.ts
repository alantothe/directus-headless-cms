
import { cors } from "hono/cors";


export const corsMiddleware = cors({
  origin: "*", // or use env vars like process.env.FRONTEND_URL
  allowHeaders: ["Content-Type", "Authorization"],
  allowMethods: ["GET", "POST", "OPTIONS"],
  credentials: true,
});
