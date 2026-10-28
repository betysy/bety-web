import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://betysyria.com/sitemap.xml",
    host: "https://betysyria.com",
  };
}
