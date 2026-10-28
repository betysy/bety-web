import type { MetadataRoute } from "next";
import { pb, LISTINGS_COLLECTION } from "@/lib/pocketbase";

const SITE = "https://betysyria.com";

// Regenerated at most once an hour so new listings reach Google quickly.
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages: MetadataRoute.Sitemap = [
    { url: `${SITE}/`, changeFrequency: "daily", priority: 1 },
    { url: `${SITE}/search`, changeFrequency: "daily", priority: 0.8 },
    { url: `${SITE}/privacy-policy.html`, changeFrequency: "yearly", priority: 0.2 },
  ];
  try {
    // Only approved listings are publicly readable, so this lists exactly
    // what visitors can open.
    const items = await pb()
      .collection(LISTINGS_COLLECTION)
      .getFullList({ fields: "id,updated", sort: "-updated", batch: 200 });
    for (const r of items) {
      pages.push({
        url: `${SITE}/listing/${r.id}`,
        lastModified: r.updated ? new Date(String(r.updated).replace(" ", "T")) : undefined,
        changeFrequency: "weekly",
        priority: 0.7,
      });
    }
  } catch (err) {
    console.error("sitemap: could not load listings", err);
  }
  return pages;
}
