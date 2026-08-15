import PocketBase from "pocketbase";

// Same PocketBase instance the Flutter app uses.
export const PB_URL =
  process.env.NEXT_PUBLIC_POCKETBASE_URL || "https://aalattar.pockethost.io";

export const LISTINGS_COLLECTION = "pbc_2037580119";

export function pb() {
  // A fresh client per request on the server; the browser gets one instance.
  return new PocketBase(PB_URL);
}

/**
 * Field names below are best-guess placeholders based on common real-estate
 * schemas. Open your PocketBase admin → pbc_2037580119 → check the actual
 * field names, then adjust this type + the `record.*` lookups in
 * lib/listings.ts to match exactly. Nothing else in the app needs to change.
 */
export type Listing = {
  id: string;
  title: string;
  description?: string;
  price: number;
  listingType: "sale" | "rent";
  propertyType?: string; // apartment, villa, land, office, etc.
  city?: string;
  address?: string;
  bedrooms?: number;
  bathrooms?: number;
  areaSqm?: number;
  images?: string[]; // filenames stored in the PocketBase file field
  latitude?: number;
  longitude?: number;
  status?: string;
  created?: string;
};

export function imageUrl(record: any, filename: string, thumb?: string) {
  const query = thumb ? `?thumb=${thumb}` : "";
  return `${PB_URL}/api/files/${LISTINGS_COLLECTION}/${record.id}/${filename}${query}`;
}
