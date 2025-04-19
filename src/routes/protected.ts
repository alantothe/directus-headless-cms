import { Hono } from "hono";
import { auth } from "../services/auth/auth-config";

const protectedRoutes = new Hono<{
  Variables: {
    user: typeof auth.$Infer.Session.user | null;
    session: typeof auth.$Infer.Session.session | null;
  };
}>();

protectedRoutes.use("*", async (c, next) => {
  const session = await auth.api.getSession({ headers: c.req.raw.headers });

  if (!session) {
    c.set("user", null);
    c.set("session", null);
    return c.body("Unauthorized", 401);
  }

  c.set("user", session.user);
  c.set("session", session.session);
  return next();
});

protectedRoutes.get("/me", (c) => {
  const user = c.get("user");
  const session = c.get("session");

  return c.json({ user, session });
});

export default protectedRoutes;
