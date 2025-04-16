
import { cors } from "hono/cors";


export const corsMiddleware = cors({
  origin: "*", // change to frontend link
  allowHeaders: ["Content-Type", "Authorization"],
  allowMethods: ["GET", "POST", "OPTIONS"],
  credentials: true,
});
