
import bcrypt from "bcrypt";
import { Context } from "hono";
import { z } from "zod";
import db from "../db/client/client";
import { users } from "../db/schema";

// Zod validation schema
const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export async function registerHandler(c: Context) {
  const body = await c.req.json();

  const parsed = registerSchema.safeParse(body);
  if (!parsed.success) {
    return c.json({ error: "Invalid input" }, 400);
  }

  const { email, password } = parsed.data;

  // Check if user already exists
  const existingUser = await db.query.users.findFirst({
    where: (user, { eq }) => eq(user.email, email),
  });

  if (existingUser) {
    return c.json({ error: "User already exists" }, 409);
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Insert user
  await db.insert(users).values({
    email,
    password: hashedPassword,
  });

  return c.json({ success: true, message: "User registered successfully" });
}

export async function loginHandler(c: Context) {
  const body = await c.req.json();

  const parsed = loginSchema.safeParse(body);
  if (!parsed.success) {
    return c.json({ error: "Invalid input" }, 400);
  }

  const { email, password } = parsed.data;

  const user = await db.query.users.findFirst({
    where: (user, { eq }) => eq(user.email, email),
  });

  if (!user) {
    return c.json({ error: "Invalid credentials" }, 401);
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    return c.json({ error: "Invalid credentials" }, 401);
  }
  // Need to add token logic here
  return c.json({ success: true, message: "Login successful", userId: user.id });
}

