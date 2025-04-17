# Postgres - Drizzle - Hono - Better Auth Server Starter Kit

Backend starter kit with auth already set up.

<h2 style="margin-bottom: 0.5rem;">Built with:</h2>
<p>
  <img alt="TypeScript" src="https://img.shields.io/badge/typescript-007ACC?style=for-the-badge&logo=typescript&logoColor=white"/>
  <img alt="Hono" src="https://img.shields.io/badge/hono-E36002?style=for-the-badge&logo=hono&logoColor=white"/>
  <img alt="Drizzle" src="https://img.shields.io/badge/drizzle-43853D?style=for-the-badge&logo=drizzle&logoColor=white"/>
  <img alt="BetterAuth" src="https://img.shields.io/badge/betterauth-333333?style=for-the-badge&logo=fusionauth&logoColor=white"/>
  <img alt="PostgreSQL" src="https://img.shields.io/badge/postgres-%23336791.svg?style=for-the-badge&logo=postgresql&logoColor=white"/>  
  <img alt="Node.js" src="https://img.shields.io/badge/node-43853D?style=for-the-badge&logo=node.js&logoColor=white"/>
</p>

- ✅ Register & login ready to go
- ✅ Session-based protected routes
- ✅ Works with Neon or local PostgreSQL
- ✅ Plug-and-play auth with Better Auth 
- ✅ Clean file structure — easy to add new routes and handlers
- ✅ Built with Drizzle ORM — ready for custom schemas and migrations
- ✅ Start building your API immediately — just add your models and logic
- ✅ Great starting point for learning Drizzle, Hono, and Better Auth

Start building your API right away — no boilerplate setup needed.


## Features

- API routes with Hono
- Authentication using Better Auth
- PostgreSQL with Drizzle ORM
- Ready-to-run schema and migration setup
- Works with both Neon or local Postgres (you choose)

## System Requirements

You need to have the following installed on your computer:

→ Node.js (v18 or later)

 →PostgreSQL (for local development)
 
 ⚠️ If you don't want to install Postgres locally, you can use Neon instead (free serverless Postgres)

## Documentation

Better Auth : https://www.better-auth.com/

Hono: https://hono.dev/

Drizzle: https://orm.drizzle.team/docs/overview

Neon:
[neon.tech](https://neon.tech/)

# Install and Setup 

## Clone the project

```bash
git clone https://github.com/alantothe/auth-starter-kit.git
cd auth-starter-kit
```
> TIP: If you're planning to build your project from this starter, don’t forget to rename the root folder to match your project name.

## Install Dependencies 

```bash
npm install
```

##  Choose Your Database

Before continuing, decide whether you're using:

- **Local PostgreSQL** (requires installing Postgres on your machine)  
- **Neon (Serverless PostgreSQL)** [free and cloud-hosted — no setup required](https://neon.tech/)

---

## Environment Setup

Create a `.env` file at the root of the project:

```env
# Secret used by Better Auth for session encryption (can be any random string)
BETTER_AUTH_SECRET=your_super_secret_key

# Local Postgres connection string (uncomment if using local Postgres)
# DATABASE_URL=postgres://postgres:password@localhost:5432/auth_starter_db

# Neon (serverless Postgres) connection string (uncomment if using Neon)
# NEON_DATABASE_URL=postgres://user:password@ep-xxxx.aws.neon.tech/dbname

# The port your dev server will run on
PORT=4000

```
## Local PostgreSQL Setup

If you chose local Postgres, run the following to set up your database:

### 1. Start the PostgreSQL shell

```bash
psql -U postgres
```

> Replace `postgres` with your local Postgres admin username if different.

### 2. Inside the `psql` shell, run:

```sql
CREATE DATABASE auth_starter_db;
CREATE USER auth_admin WITH PASSWORD 'yourpassword';
GRANT ALL PRIVILEGES ON DATABASE auth_starter_db TO auth_admin;
```

Then quit the shell:

```sql
\q
```

---

### Update your `.env` file

```env
DATABASE_URL=postgres://auth_admin:yourpassword@localhost:5432/auth_starter_db
```
> Replace url information with your recently created local Postgres admin info and database

This will connect your app to the local Postgres database with the new user credentials.

---

##  Neon (Serverless) Setup

If you chose Neon:

1. Go to [neon.tech](https://neon.tech) and sign up
2. Create a new project
3. Copy the connection string from the project dashboard
4. Paste it into your `.env` file under `NEON_DATABASE_URL`
5. In your `db.ts`, uncomment the Neon client and comment out the local one

--- 

## Choose the Right Database Client

In your project, you’ll find two database clients located in:

```
./src/db/client/
├── client-neon.ts        # for Neon (serverless PostgreSQL)
└── client-pg-local.ts    # for local PostgreSQL
```

You need to import the correct one based on which database you're using.

---

### 🔁 Example in `utils/auth.ts`

Here’s how the setup looks in `utils/auth.ts`:

```ts
import "dotenv/config";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

//~-------------------------------------
// Choose your database:

// Local Postgres:
// import db from "../db/client/client-pg-local";

// Neon (for serverless):
// import db from "../db/client/client-neon";
//~-------------------------------------

import { schema } from "../db/schema";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema,
    usePlural: true,
  }),
  emailAndPassword: {
    enabled: true,
  },
});
```

---

✅ Be sure to **uncomment the correct import** depending on your database choice, and comment out the one you’re not using.

🚧 **Optional Cleanup:**  
If you know for sure you’ll only be using one database (e.g., only Neon or only local Postgres), feel free to **delete the unused client file** and remove any related code. This will simplify your project and avoid confusion later.


##  Run Drizzle Migrations

Depending on your database choice, you’ll need to specify the correct config file when running Drizzle migrations:

### ➤ Local PostgreSQL

```bash
npx drizzle-kit push --config drizzle-pg-local.config.ts
```

### ➤ Neon (Serverless)

```bash
npx drizzle-kit push --config drizzle-neon.config.ts
```

> ⚠️ If you forget to specify the `--config`, Drizzle will default to `drizzle.config.ts` — which may not exist or may not match your setup.

## Run Project 

```bash
npm run dev
```

# 🔐 Auth API Routes

These are the default auth endpoints included with the starter kit 

---

##  Available Routes

```http
POST /auth/register
POST /auth/sign-in
GET  /auth/me
```

| Route              | Method | Description                            |
|-------------------|--------|----------------------------------------|
| `/auth/register`  | POST   | Create a new user (email + password)   |
| `/auth/sign-in`   | POST   | Log in an existing user                |
| `/auth/me`        | GET    | Returns the logged-in user             |

---

## ⚠️ `/me` only works after sign-in

After signing up or signing in, **Better Auth sets a session token in a cookie**.  
The `/api/auth/me` route will **only return user data** if that token is present in the request cookies.

> If you're using Postman or another client, make sure to **preserve cookies** across requests.

---

##  Example Payloads

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
