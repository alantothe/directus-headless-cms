
import { Hono } from "hono";
import {auth } from "../utils/auth"

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

export default authRoutes;
