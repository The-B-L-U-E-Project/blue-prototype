# Project BLUE

**BLUE** — **B**road **L**earning **U**niversal **E**ducation.

Prototype for the BLUE website.

---

## Stack

- `api/` — Hono backend on Cloudflare Workers.
- `app/` — React 19 + Vite 8 frontend.
- `supabase/` — database / auth / storage migrations.
- pnpm workspace, TypeScript throughout.

---

## Prerequisites

- [Node.js](https://nodejs.org/) 20+
- [pnpm](https://pnpm.io/) 10+ (`npm install -g pnpm`)
- [Supabase CLI](https://supabase.com/docs/guides/local-development) (for local DB)
- [Wrangler](https://developers.cloudflare.com/workers/wrangler/) is installed via the `api` package.

---

## Install

```bash
git clone https://github.com/The-B-L-U-E-Project/blue-prototype.git
cd blue-prototype
pnpm install
```

---

## Run

Start Supabase (local Postgres + auth):

```bash
supabase start
```

Run the API (Cloudflare Workers dev server):

```bash
cd api
pnpm dev
```

Run the frontend (Vite):

```bash
cd app
pnpm dev
```

App defaults to `http://localhost:5173`. API to `http://localhost:8787`.

---

## Build

```bash
pnpm --filter app build
pnpm --filter api deploy   # deploys Worker (needs Cloudflare auth)
```

---

## Repo layout

```
api/         Hono backend. Exports AppType from src/index.ts.
app/         React frontend. Consumes AppType via hc<AppType>.
supabase/    Migrations and local config.
docs/        Design notes, open questions.
```

See `CONTRIBUTING.md` before opening a PR.
