# Drizzle + Better Auth Server Starter Kit

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

# 🔐 Auth API Routes

These are the default auth endpoints included with the starter kit using **Better Auth**, **Drizzle ORM**, and **Hono**.

---

##  Available Routes

```http
POST /api/auth/signup
POST /api/auth/signin
GET  /api/auth/me
```

| Route              | Method | Description                            |
|-------------------|--------|----------------------------------------|
| `/api/auth/signup`| POST   | Create a new user (email + password)   |
| `/api/auth/signin`| POST   | Log in an existing user                |
| `/api/auth/me`    | GET    | Returns the logged-in user             |

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
