import PocketBase from "pocketbase";

// Same PocketBase instance the Flutter app uses.
export const PB_URL =
  process.env.NEXT_PUBLIC_POCKETBASE_URL || "https://aalattar.pockethost.io";

// The collection is named "properties" in the PocketBase admin
// (pbc_2037580119 is just its internal id — both work as identifiers).
export const LISTINGS_COLLECTION = "properties";

export function pb() {
  // A fresh client per request on the server; the browser gets one instance.
  return new PocketBase(PB_URL);
}

/**
 * Matches the actual "properties" collection schema:
 * titleAr, price, currency, city, cityAr, addressAr, area, rooms,
 * bathrooms, type, goal, lat, lng, isFeatured, isPlus, hasBalcony, imageUrl.
 * There's no separate rent/sale field with values populated yet, so
 * listingType is inferred from titleAr in lib/listings.ts.
 */
export type Listing = {
  id: string;
  title: string; // sourced from titleAr
  price: number;
  currency?: string;
  listingType: "sale" | "rent";
  propertyType?: string; // from `type`, e.g. "شقة"
  city?: string;
  address?: string;
  bedrooms?: number; // from `rooms`
  bathrooms?: number;
  areaSqm?: number; // from `area`
  images?: string[]; // built from the `imageUrl` file field
  latitude?: number;
  longitude?: number;
  isFeatured?: boolean;
  created?: string;
};

export function imageUrl(record: any, filename: string, thumb?: string) {
  const query = thumb ? `?thumb=${thumb}` : "";
  return `${PB_URL}/api/files/${LISTINGS_COLLECTION}/${record.id}/${filename}${query}`;
}

// Prices are shown in whatever currency the listing specifies. Older
// records have an empty currency field, which only makes sense as Syrian
// Pounds given the magnitude (tens of billions), so that's the fallback.
const CURRENCY_LABELS: Record<string, string> = {
  SYP: "ل.س",
  USD: "$",
};

export function formatPrice(listing: Pick<Listing, "price" | "currency" | "listingType">) {
  const code = listing.currency || "SYP";
  const label = CURRENCY_LABELS[code] || code;
  const compact = new Intl.NumberFormat("ar", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(listing.price);
  const suffix = listing.listingType === "rent" ? " شهرياً" : "";
  return `${compact} ${label}${suffix}`;
}
