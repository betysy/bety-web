import { pb, LISTINGS_COLLECTION, imageUrl, type Listing } from "./pocketbase";

// "goal" exists in the schema but is empty on current records, so fall back
// to reading rent/sale off the Arabic title text.
function inferListingType(record: any): "sale" | "rent" {
  if (record.goal === "rent" || record.goal === "ايجار" || record.goal === "استئجار") {
    return "rent";
  }
  if (record.goal === "sale" || record.goal === "بيع") {
    return "sale";
  }
  const title: string = record.titleAr ?? "";
  if (title.includes("ايجار") || title.includes("اجار") || title.includes("استئجار")) {
    return "rent";
  }
  return "sale";
}

function mapRecord(record: any): Listing {
  const rawImages = record.imageUrl;
  const filenames: string[] = Array.isArray(rawImages)
    ? rawImages
    : rawImages
    ? [rawImages]
    : [];

  return {
    id: record.id,
    title: record.titleAr || "Untitled listing",
    price: record.price ?? 0,
    currency: record.currency || undefined,
    listingType: inferListingType(record),
    propertyType: record.type ?? "",
    city: record.cityAr || record.city || "",
    address: record.addressAr || "",
    bedrooms: record.rooms || undefined,
    bathrooms: record.bathrooms || undefined,
    areaSqm: record.area || undefined,
    images: filenames.map((f) => imageUrl(record, f)),
    latitude: record.lat ?? undefined,
    longitude: record.lng ?? undefined,
    isFeatured: record.isFeatured ?? false,
    created: record.created ?? "",
  };
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

// Distinct from "newest" — these are the isFeatured=true records, meant for
// a premium showcase strip at the top of the homepage.
export async function getPremiumListings(limit = 3): Promise<Listing[]> {
  try {
    const client = pb();
    const result = await client
      .collection(LISTINGS_COLLECTION)
      .getList(1, limit, { filter: "isFeatured = true", sort: "-created" });
    return result.items.map(mapRecord);
  } catch (err) {
    console.error("Failed to load premium listings", err);
    return [];
  }
}

export async function searchListings(params: {
  q?: string;
  city?: string;
  listingType?: string;
  minPrice?: string;
  maxPrice?: string;
  page?: number;
}): Promise<{ items: Listing[]; totalPages: number }> {
  const filters: string[] = [];
  if (params.q) {
    filters.push(
      `titleAr ~ "${params.q}" || city ~ "${params.q}" || cityAr ~ "${params.q}"`
    );
  }
  if (params.city) filters.push(`(city ~ "${params.city}" || cityAr ~ "${params.city}")`);
  // listingType isn't a real PocketBase field with values set yet (it's
  // inferred client-side from the title in mapRecord), so it can't be
  // filtered server-side until a `goal` field is actually populated.
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
    let items = result.items.map(mapRecord);
    if (params.listingType === "sale" || params.listingType === "rent") {
      items = items.filter((l) => l.listingType === params.listingType);
    }
    return { items, totalPages: result.totalPages };
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
