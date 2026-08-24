# Sanity CMS Integration Guide - Northstar

This guide walks you through connecting your Sanity CMS account, understanding the required environment variables, managing content in the embedded Studio (`/studio`), and seeding initial data.

---

## 🛠️ 1. Environment Variables Overview

To connect your project to Sanity, copy `.env.example` to `.env.local` in the project root:

```bash
cp .env.example .env.local
```

Here is a breakdown of all environment variables used by the system:

| Variable | Description | Requirement | Example |
| :--- | :--- | :--- | :--- |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Your unique Sanity Project ID | **Required** | `abc123xyz` |
| `NEXT_PUBLIC_SANITY_DATASET` | Dataset name (e.g. `production` or `development`) | **Required** | `production` |
| `NEXT_PUBLIC_SANITY_API_VERSION` | API version date tag | Optional (default: `2024-03-01`) | `2024-03-01` |
| `SANITY_API_READ_TOKEN` | Read token for querying private datasets or previewing drafts | Optional | `sk...` |
| `SANITY_API_WRITE_TOKEN` | Write token used for automated seeding & migration scripts | Optional (for seed script) | `sk...` |

---

## 🔑 2. How to Get Your Credentials from Sanity

1. Go to [https://sanity.io/manage](https://sanity.io/manage) and log in or sign up.
2. Click **Create new project** (or select your existing project).
3. Under **Project Details**, copy your **Project ID** into `NEXT_PUBLIC_SANITY_PROJECT_ID`.
4. Navigate to **API** tab -> **Tokens**:
   - Click **Add API token**.
   - For **Read Token**: Name it `Read Token`, set Permission to `Viewer`, and paste into `SANITY_API_READ_TOKEN`.
   - For **Write Token**: Name it `Seed Token`, set Permission to `Editor`, and paste into `SANITY_API_WRITE_TOKEN`.
5. Under **API** tab -> **CORS Origins**:
   - Click **Add CORS Origin**.
   - Add `http://localhost:3000` and check **Allow credentials**.

---

## 🎨 3. Accessing Embedded Sanity Studio

Your Sanity Studio is embedded directly into the Next.js app!

- **Local Studio URL**: `http://localhost:3000/studio`
- From here, you can manage the **Landing Page Hero** content, edit titles, update subtext, change button links, upload fallback images, or replace the showcase video URL.

---

## 🚀 4. Automated Seeding Script

Once you've set your `NEXT_PUBLIC_SANITY_PROJECT_ID` and `SANITY_API_WRITE_TOKEN` in `.env.local`, you can seed the Hero content into your Sanity dataset with a single command:

```bash
node scripts/seed-hero.mjs
```

---

## 🛡️ 5. Zero-Breakage Graceful Fallback System

- If no Sanity environment variables are provided, or if the dataset is empty, the application automatically uses default mock values.
- Your design, layout, responsiveness, and Framer Motion animations remain **100% intact and functional at all times**.
