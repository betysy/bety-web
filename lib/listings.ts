import { pb, LISTINGS_COLLECTION, imageUrl, type Listing } from "./pocketbase";

function mapRecord(record: any): Listing {
  return {
    id: record.id,
    title: record.title ?? "Untitled listing",
    description: record.description ?? "",
    price: record.price ?? 0,
    listingType: record.listingType ?? record.type ?? "sale",
    propertyType: record.propertyType ?? "",
    city: record.city ?? "",
    address: record.address ?? "",
    bedrooms: record.bedrooms ?? undefined,
    bathrooms: record.bathrooms ?? undefined,
    areaSqm: record.areaSqm ?? record.area ?? undefined,
    images: Array.isArray(record.images)
      ? record.images.map((f: string) => imageUrl(record, f))
      : record.image
      ? [imageUrl(record, record.image)]
      : [],
    latitude: record.latitude ?? undefined,
    longitude: record.longitude ?? undefined,
    status: record.status ?? "active",
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
    filters.push(`title ~ "${params.q}" || city ~ "${params.q}"`);
  }
  if (params.city) filters.push(`city = "${params.city}"`);
  if (params.listingType) filters.push(`listingType = "${params.listingType}"`);
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
