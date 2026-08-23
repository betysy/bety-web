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
    price: record.price ?? 0,
    listingType: record.goal === "rent" ? "rent" : "sale",
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
  };
}

// Mirrors Property.priceLabel in bety_complete/lib/main.dart — prices are
// stored as raw Syrian Pounds, not USD.
export function formatPriceSYP(price: number, listingType: "sale" | "rent") {
  const millions = price / 1_000_000;
  const label =
    millions >= 1
      ? `${millions % 1 === 0 ? millions.toFixed(0) : millions.toFixed(1)} م.ل.س`
      : `${price.toFixed(0)} ل.س`;
  return listingType === "rent" ? `${label} · شهرياً` : label;
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
