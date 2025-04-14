import { Hono } from "hono";
import { cors } from "hono/cors";
import { auth } from "../utils/auth";

const betterAuthMiddleware = new Hono();

betterAuthMiddleware.use(
  "/auth/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["POST", "GET", "OPTIONS"],
    credentials: true,
  })
);

// Only call auth.handler on POST
// Define your login route
betterAuthMiddleware.post("/auth/callback/credentials", async (c) => {
  const body = await c.req.json();

  // Use the server-side API to authenticate the user
  const response = await auth.api.signInEmail({
    body,
    asResponse: true, // Ensures the response is in the correct format
  });

  return response;
});

export default betterAuthMiddleware;
