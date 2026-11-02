# Bety Syria (بيتي سوريا) — website

Next.js app for betysyria.com, hosted on Netlify with continuous deployment: push to
`main` on GitHub (`betysy/bety-web`) and Netlify builds and deploys automatically. There's
no separate deploy step — a merged/pushed commit on `main` is live shortly after.

Shares the same PocketBase backend as the Flutter mobile app (`bety_complete` /
`bety_IOS` — separate repos/folders, not in this one). Never guess a PocketBase field
name — check the live schema first:
`https://aalattar.pockethost.io/api/collections/properties/records?perPage=1`

This file is maintained by hand after each significant session. Update it when you learn
something non-obvious — don't let it go stale.

## Current status (as of 2026-10-12)

**Site is live and deployed, but the only 3 listings in the catalog are test data** with
nonsense prices and no area/rooms/description — confirmed by the developer. They need to
be deleted from the PocketBase admin (`https://aalattar.pockethost.io/_/`) before this is
launch-ready: record ids `c07g0ztandi0v26`, `0x0936tzy1q1fdp`, `fx1m1iex5xs31zs`. This repo's
code is not the blocker here — the data is.

**Heads up on git history:** `main` was force-pushed at some point (commit `4f2b8a1`,
"Redesign site in Arabic/RTL with ImmoScout24-inspired UX, fix data pipeline") which
rewrote history past earlier commits. If you ever see a local clone that looks "behind" or
has unpushed changes that don't make sense against `origin/main`, re-clone or hard-reset
rather than trying to merge — assume `origin/main` is the source of truth.

## Known facts about the data

- `goal` (sale/rent) is usually blank on older PocketBase records. `lib/listings.ts`'s
  `inferListingType()` falls back to reading rent/sale off the Arabic title text
  (`للإيجار`/`اجار` → rent) when the field is empty. Don't assume `goal` is reliably
  populated — this inference exists for a reason.
- `descriptionAr` is mapped to `Listing.description` and rendered on the listing detail
  page (`app/listing/[id]/page.tsx`) and used in the page's meta description. This was
  missing for a while (older code never read the field at all) — if description stops
  showing up again, check `lib/listings.ts`'s `mapRecord()` still reads it.
- Prices are stored as raw SYP integers, often in the billions given Syria's currency
  situation — `formatPrice()` in `lib/pocketbase.ts` uses `Intl.NumberFormat` with
  `notation: "compact"`, which is correct behavior; a wrong-looking price is almost always
  bad underlying data, not a formatting bug. Sanity-check against the raw PocketBase value
  before assuming the display logic is at fault.
- `currency` is blank on most/all current records; `formatPrice()` falls back to SYP, which
  is the only sane assumption given the price magnitudes.

## Build / verify

```bash
npm install
npx tsc --noEmit        # typecheck — do this before any push, it's fast and catches real bugs
npm run build            # full Next.js build; needs network access to Google Fonts
```

## Design system

Canonical palette: Petrol `#0B7285` (primary/links), Clay `#C8623A` (badges/CTA emphasis),
Paper `#F6F4EF` (background) — ImmoScout24-style, warm paper ground, full RTL from the
root (not a mirrored LTR layout). Arabic throughout, no partial English UI. If you see a
teal/orange or blue/gold scheme referenced anywhere, it's from a stale draft — this is the
current one.

## Security

Treat any credential that has ever appeared in a chat transcript as compromised. A GitHub
token was exposed this way once already and had to be rotated — never paste tokens into
any Claude chat (or any chat), including when asking for help pushing code.
