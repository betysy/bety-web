# Bety بيتي — Web

Next.js website for Bety, sharing the same PocketBase backend as the Flutter app.

## Stack
- Next.js 14 (App Router, SSR for SEO on listing pages)
- Tailwind CSS
- PocketBase JS SDK, pointed at `aalattar.pockethost.io`

## Local development
```bash
npm install
cp .env.example .env.local
npm run dev
```

## ⚠️ Before this works: fix PocketBase API rules

While testing this build, listing requests came back **403 Forbidden** from
`https://aalattar.pockethost.io/api/collections/pbc_2037580119/records`.

This means the collection's **List/View API rule** is currently locked down
(only logged-in users, or nobody, can read it). For a public real estate
site, anonymous visitors need to be able to *read* listings without logging
in.

**To fix:** open the PocketBase admin → Collections → `pbc_2037580119` →
**API Rules** tab, and set the **List rule** and **View rule** to something
like:

```
status = "active"
```

(or leave them completely empty, which means "public"). Leave the
**Create/Update/Delete** rules restricted to authenticated owners/admins —
you only want reads to be public, not writes.

## Verify your field names

`lib/listings.ts` maps PocketBase records assuming field names like `title`,
`price`, `listingType`, `city`, `bedrooms`, `bathrooms`, `areaSqm`, `images`.
Open the collection schema in the PocketBase admin and adjust the field
names in `lib/listings.ts` (`mapRecord` function) if yours differ — nothing
else in the app needs to change.

## Deploying on Netlify
This repo includes `netlify.toml` with the official Next.js runtime plugin.
In Netlify's site settings, add the environment variable:

```
NEXT_PUBLIC_POCKETBASE_URL=https://aalattar.pockethost.io
```

Then connect `betysyria.com` as a custom domain in Netlify's Domain
settings, and add the DNS records Netlify gives you inside Hostinger's DNS
panel.
