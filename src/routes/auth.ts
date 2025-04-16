import { Hono } from "hono";
import { auth } from "../utils/auth-config";

const authRoutes = new Hono();

authRoutes.post("/register", async (c) => {
  const body = await c.req.json();

  const result = await auth.api.signUpEmail({
    body: {
      email: body.email,
      password: body.password,
      name: body.name,
    },
    asResponse: true,
  });

  return result;
});

authRoutes.post("/sign-in", async (c) => {
  const body = await c.req.json();
  const result = await auth.api.signInEmail({
    body: {
      email: body.email,
      password: body.password,
    },
    asResponse: true,
  });
  return result;
});

export default authRoutes;
