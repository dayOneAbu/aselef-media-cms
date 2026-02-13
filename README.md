# Aselef Media and Communication (AMC)

Aselef Media and Communication (AMC) is a new agency that is currently is in its startup stage. this project is a website + CMS built with **Next.js** and **Payload CMS**. It combines a public-facing site (pages/posts) with an admin panel for managing content, media, redirects, SEO metadata, and more.

## Tech stack

- **Framework**: Next.js 15 (App Router)
- **CMS**: Payload CMS 3 (`payload`, `@payloadcms/next`)
- **Database**: PostgreSQL (`@payloadcms/db-postgres`)
- **Storage**: S3-compatible storage for media (`@payloadcms/storage-s3`) with local `public/media` support
- **UI**: React 19 + TailwindCSS + Radix UI

## Features

- **Admin panel** at `/_admin` (Payload)
- **Collections**
  - **Pages**: page builder using blocks
  - **Posts**: rich text posts with authors, categories, related posts, featured flag, and read counters
  - **Media**: uploads/images with multiple image sizes
  - **Categories**: nested categories
  - **Users**: authentication-enabled users
- **Globals**
  - Header
  - Footer
  - Social media links
- **Plugins**
  - Redirects
  - SEO
  - Search
  - Form Builder
  - Nested Docs (for categories)
  - Payload Cloud support

## Requirements

- Node.js (see `package.json` engines)
- pnpm
- PostgreSQL database
- Optional: S3-compatible storage (AWS S3 / MinIO / etc.)

## Getting started

1. Install dependencies:

```bash
pnpm install
```

2. Create your env file:

```bash
cp .env.example .env
```

3. Configure environment variables (see below).

4. **Local Database Setup**:
   Ensure you have a local PostgreSQL instance running. Create a database named `amc`:

   ```bash
   psql -U postgres -c "CREATE DATABASE amc;"
   ```

5. **Run Migrations**:
   The project uses migrations to sync the database schema. Run them before starting:

   ```bash
   pnpm payload migrate
   ```

6. **Start the dev server**:
   ```bash
   pnpm dev
   ```

The site will be available at:

- **Website**: `http://localhost:3000`
- **Admin**: `http://localhost:3000/_admin`

## Environment variables

The project ships with `.env.example` containing the minimum required values.

- **`DATABASE_URI`**: PostgreSQL connection string
- **`PAYLOAD_SECRET`**: secret used by Payload for signing/encrypting tokens
- **`NEXT_PUBLIC_SERVER_URL`**: base URL used for CORS, link formatting, previews (no trailing slash)

Optional (required if you enable S3 storage in your environment):

- **`S3_ACCESS_KEY_ID`**
- **`S3_SECRET_ACCESS_KEY`**
- **`S3_BUCKET`**
- **`S3_ENDPOINT`**: e.g. `http://127.0.0.1:9000` for MinIO, or an AWS endpoint
- **`S3_REGION`**

Notes:

- The app also supports `VERCEL_PROJECT_PRODUCTION_URL` to derive the production base URL on Vercel.
- In `src/payload.config.ts`, media storage is configured with `disableLocalStorage: true` for S3 usage. Ensure S3 variables are set in environments where this is enabled.

## Scripts

- **`pnpm dev`**: run Next.js in development
- **`pnpm build`**: build Next.js
- **`pnpm start`**: start Next.js (production)
- **`pnpm lint`**: run lint
- **`pnpm generate:types`**: generate Payload types
- **`pnpm generate:importmap`**: generate Payload import map

## Content modeling overview

- **Pages** are composed using blocks (hero + flexible layout blocks).
- **Posts** support rich text, hero image, SEO fields, categories, related posts, and authors.
- **Media** supports image resizing and focal point.

## Deployment (Coolify/VPS)

This project is configured to deploy on Coolify using **Nixpacks**.

1. **Environment Variables**:
   Set `DATABASE_URI`, `PAYLOAD_SECRET`, and `NEXT_PUBLIC_SERVER_URL` in your Coolify application settings.
2. **Database Sync**:
   The `nixpacks.toml` file automatically runs `pnpm payload migrate` before building the app. **Always commit your migration files** in `src/migrations` to ensure the VPS database stays in sync.
3. **Troubleshooting**:
   If the build fails with "relation does not exist", it usually means migrations haven't run or the `DATABASE_URI` is incorrect.

## Migrations

- **Create a migration**: `pnpm payload migrate:create <name>`
- **Run migrations**: `pnpm payload migrate`
- **Check status**: `pnpm payload migrate:status`
