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

## Field mapping (matches the real `properties` schema)

`lib/listings.ts` maps the actual PocketBase fields: `titleAr`, `price`,
`currency`, `city`, `cityAr`, `addressAr`, `area`, `rooms`, `bathrooms`,
`type`, `goal`, `lat`, `lng`, `isFeatured`, `imageUrl`. There's no populated
rent-vs-sale field yet (`goal` is empty on current records), so
`inferListingType()` in `lib/listings.ts` reads it off keywords in the
Arabic title instead. Once `goal` starts getting set to real values on new
listings, update that function to read it directly.

Prices are Syrian Pounds (the `currency` field is empty on every record, but
the magnitude — tens of billions — only makes sense as SYP). `formatPrice()`
in `lib/pocketbase.ts` formats accordingly; adjust there if that assumption
changes.

## A note on public read access

Earlier local testing hit a 403 on public listing reads, but the deployed
Netlify site successfully fetched and displayed real listings, so the
List/View API rule on `properties` appears to already allow public reads.
If listings ever stop showing up on the live site specifically (not just in
local dev), check Collections → `properties` → **API Rules** in the
PocketBase admin first.

## Deploying on Netlify
This repo includes `netlify.toml` with the official Next.js runtime plugin.
In Netlify's site settings, add the environment variable:

```
NEXT_PUBLIC_POCKETBASE_URL=https://aalattar.pockethost.io
```

Then connect `betysyria.com` as a custom domain in Netlify's Domain
settings, and add the DNS records Netlify gives you inside Hostinger's DNS
panel.
