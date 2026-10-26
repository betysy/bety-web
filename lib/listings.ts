import { pb, LISTINGS_COLLECTION, imageUrl, type Listing } from "./pocketbase";

// Escapes a user-typed value for safe interpolation into a PocketBase
// filter expression (PocketBase filters use " to delimit string literals).
function escapeFilterValue(v: string) {
  return v.replace(/"/g, '\\"');
}

// Old records predate the `goal` field and are treated as "for sale" by
// the Flutter app — mirrored here so both platforms agree on what counts
// as a sale listing.
function goalFilter(listingType: "sale" | "rent") {
  return listingType === "rent" ? 'goal = "rent"' : '(goal = "sale" || goal = "")';
}

function mapRecord(record: any): Listing {
  return {
    id: record.id,
    title: record.titleAr || "إعلان بدون عنوان",
    description: record.descriptionAr ?? "",
    price: Number(record.price) || 0,
    currency: String(record.currency ?? "").toUpperCase() === "USD" ? "USD" : "SYP",
    listingType: record.goal === "rent" ? "rent" : "sale",
    contactName: record.contactName ?? "",
    contactPhone: record.contactPhone ?? "",
    propertyType: record.type ?? "",
    city: record.city ?? "",
    address: record.addressAr ?? "",
    bedrooms: record.rooms ?? undefined,
    bathrooms: record.bathrooms ?? undefined,
    areaSqm: record.area ?? undefined,
    images: Array.isArray(record.imageUrl)
      ? record.imageUrl.map((f: string) => imageUrl(record, f))
      : record.imageUrl
      ? [imageUrl(record, record.imageUrl)]
      : [],
    latitude: record.lat ?? undefined,
    longitude: record.lng ?? undefined,
    created: record.created ?? "",
    floor: String(record.floor ?? "").trim(),
    totalFloors: Number(record.totalFloors) || 0,
    buildYear: Number(record.buildYear) || 0,
    furnished: record.furnished ?? "",
    finishing: record.finishing ?? "",
    deedType: record.deedType ?? "",
    hasElevator: record.hasElevator === true,
    hasParking: record.hasParking === true,
    solarPower: record.solarPower === true,
    waterTank: record.waterTank === true,
    hasBalcony: record.hasBalcony === true,
  };
}

const RESIDENTIAL = ["شقة", "فيلا", "بيت", "استوديو", "طابق"];
export const isResidential = (t?: string) => RESIDENTIAL.includes(t ?? "");

// Same rules as the app's Property.pricePerSqm / floorLabel.
export function pricePerSqm(l: Listing) {
  return l.listingType === "sale" && l.price > 0 && (l.areaSqm ?? 0) > 0
    ? l.price / (l.areaSqm as number)
    : null;
}

export function floorLabel(l: Listing) {
  const f = /^\d+$/.test(l.floor ?? "") ? Number(l.floor) : null;
  if (f === null) return "";
  const name = f === 0 ? "أرضي" : String(f);
  return l.totalFloors ? `${name} من ${l.totalFloors}` : name;
}

export const AMENITIES: { key: keyof Listing; label: string; icon: string }[] = [
  { key: "hasElevator", label: "مصعد", icon: "🛗" },
  { key: "hasParking", label: "موقف سيارة", icon: "🅿️" },
  { key: "solarPower", label: "طاقة شمسية", icon: "☀️" },
  { key: "waterTank", label: "خزان مياه", icon: "💧" },
  { key: "hasBalcony", label: "بلكونة", icon: "🪟" },
];

/** Same city + same rent/sale first, then same type — mirrors the app's
 *  "عقارات مشابهة" section. */
export async function getSimilarListings(l: Listing, limit = 6): Promise<Listing[]> {
  try {
    const client = pb();
    const result = await client.collection(LISTINGS_COLLECTION).getList(1, 40, {
      filter: `id != "${escapeFilterValue(l.id)}" && ${goalFilter(l.listingType)}`,
      sort: "-created",
    });
    const score = (o: Listing) =>
      (o.city === l.city ? 2 : 0) + (o.propertyType === l.propertyType ? 2 : 0);
    return result.items
      .map(mapRecord)
      .filter((o) => score(o) >= 2)
      .sort((a, b) => score(b) - score(a))
      .slice(0, limit);
  } catch (err) {
    console.error("Failed to load similar listings", err);
    return [];
  }
}

// Mirrors formatPrice / Property.priceLabel in the Flutter app (v1.0.4+):
// price is stored exactly as the lister typed it (no ×1,000,000), with a
// currency of USD or SYP. Western digits with thousands separators.
export function formatPrice(
  price: number,
  currency: "USD" | "SYP",
  listingType: "sale" | "rent"
) {
  if (!price || price <= 0) return "السعر عند التواصل";
  const symbol = currency === "USD" ? "$" : "ل.س";
  const label = `${Math.round(price).toLocaleString("en-US")} ${symbol}`;
  return listingType === "rent" ? `${label} / شهرياً` : label;
}

// Normalizes a stored Syrian phone number to digits with country code
// (9639XXXXXXXX) for tel: and wa.me links. Returns "" if unusable.
export function phoneDigits(raw?: string) {
  let p = (raw ?? "").replace(/[^0-9+]/g, "");
  if (!p) return "";
  if (p.startsWith("+")) p = p.slice(1);
  else if (p.startsWith("00")) p = p.slice(2);
  else if (p.startsWith("0")) p = "963" + p.slice(1);
  else if (!p.startsWith("963")) p = "963" + p;
  return p.length >= 11 ? p : "";
}

export async function getFeaturedListings(limit = 6): Promise<Listing[]> {
  try {
    const client = pb();
    const result = await client
      .collection(LISTINGS_COLLECTION)
      .getList(1, limit, { sort: "-created" });
    return result.items.map(mapRecord);
  } catch (err) {
    console.error("Failed to load featured listings", err);
    return [];
  }
}

export async function searchListings(params: {
  q?: string;
  city?: string;
  listingType?: string;
  propertyType?: string;
  minPrice?: string;
  maxPrice?: string;
  page?: number;
}): Promise<{ items: Listing[]; totalPages: number }> {
  const filters: string[] = [];
  if (params.q) {
    const q = escapeFilterValue(params.q);
    filters.push(`(titleAr ~ "${q}" || city ~ "${q}" || addressAr ~ "${q}")`);
  }
  if (params.city) filters.push(`city = "${escapeFilterValue(params.city)}"`);
  if (params.propertyType) filters.push(`type = "${escapeFilterValue(params.propertyType)}"`);
  if (params.listingType === "sale" || params.listingType === "rent") {
    filters.push(goalFilter(params.listingType));
  }
  if (params.minPrice) filters.push(`price >= ${Number(params.minPrice)}`);
  if (params.maxPrice) filters.push(`price <= ${Number(params.maxPrice)}`);

  try {
    const client = pb();
    const result = await client
      .collection(LISTINGS_COLLECTION)
      .getList(params.page ?? 1, 12, {
        filter: filters.join(" && "),
        sort: "-created",
      });
    return { items: result.items.map(mapRecord), totalPages: result.totalPages };
  } catch (err) {
    console.error("Search failed", err);
    return { items: [], totalPages: 0 };
  }
}

export async function getListing(id: string): Promise<Listing | null> {
  try {
    const client = pb();
    const record = await client.collection(LISTINGS_COLLECTION).getOne(id);
    return mapRecord(record);
  } catch (err) {
    console.error("Failed to load listing", err);
    return null;
  }
}
