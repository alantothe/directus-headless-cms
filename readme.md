#TO DO 
- name table with auth and cms so it clear in the publics folder what is what
- these tables cannot work together
- then figure out what 

# Payload Headless CMS

<h2 style="margin-bottom: 0.5rem;">Built with:</h2>
<p>

  <img alt="TypeScript" src="https://img.shields.io/badge/typescript-007ACC?style=for-the-badge&logo=typescript&logoColor=white"/>
  <img alt="Payload CMS" src="https://img.shields.io/badge/Payload%20CMS-444444?style=for-the-badge&logo=payloadcms&logoColor=white"/>
  <img alt="Hono" src="https://img.shields.io/badge/hono-E36002?style=for-the-badge&logo=hono&logoColor=white"/>
  <img alt="Drizzle" src="https://img.shields.io/badge/drizzle-43853D?style=for-the-badge&logo=drizzle&logoColor=white"/>
  <img alt="BetterAuth" src="https://img.shields.io/badge/betterauth-333333?style=for-the-badge&logo=fusionauth&logoColor=white"/>
  <img alt="PostgreSQL" src="https://img.shields.io/badge/postgres-%23336791.svg?style=for-the-badge&logo=postgresql&logoColor=white"/>  
  <img alt="Node.js" src="https://img.shields.io/badge/node-43853D?style=for-the-badge&logo=node.js&logoColor=white"/>
</p>

# Install and Setup

## Clone the project

```bash
git clone https://github.com/alantothe/payload-headless-cms.git
cd payload-headless-cms
```

## Install Dependencies

```bash
npm install
```

## Environment Setup

Create a `.env` file at the root of the project:

```env
# Secret used by Better Auth for session encryption (can be any random string)
BETTER_AUTH_SECRET=your_super_secret_key

# Neon (serverless Postgres) connection string
# NEON_DATABASE_URL=postgres://user:password@ep-xxxx.aws.neon.tech/dbname

# The port your dev server will run on
PORT=4000

```

## Neon (Serverless) Setup

If you chose Neon:

1. Go to [neon.tech](https://neon.tech) and sign up
2. Create a new project
3. Copy the connection string from the project dashboard
4. Paste it into your `.env` file under `NEON_DATABASE_URL`

## Run Drizzle Migrations

Depending on your database choice, you’ll need to specify the correct config file when running Drizzle migrations:

### ➤ Neon (Serverless)

```bash
npx drizzle-kit push --config drizzle-neon.config.ts
```

## Run Project

```bash
npm run dev
```

# 🔐 Auth API Routes

These are the default auth endpoints included.

---

## Available Routes

```http
POST /auth/register
POST /auth/sign-in
GET  /auth/me
```

| Route            | Method | Description                          |
| ---------------- | ------ | ------------------------------------ |
| `/auth/register` | POST   | Create a new user (email + password) |
| `/auth/sign-in`  | POST   | Log in an existing user              |
| `/auth/me`       | GET    | Returns the logged-in user           |

---

## ⚠️ `/me` only works after sign-in

After signing up or signing in, **Better Auth sets a session token in a cookie**.  
The `/api/auth/me` route will **only return user data** if that token is present in the request cookies.

> If you're using Postman or another client, make sure to **preserve cookies** across requests.

---

## Example Payloads

### `POST /api/auth/signup`

```json
{
  "email": "test@example.com",
  "password": "supersecure123"
}
```

### `POST /api/auth/signin`

```json
{
  "email": "test@example.com",
  "password": "supersecure123"
}
```
