import Image from "next/image";
import { notFound } from "next/navigation";
import { getListing } from "@/lib/listings";
import { formatPrice } from "@/lib/pocketbase";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const listing = await getListing(params.id);
  if (!listing) return { title: "Listing not found — Bety بيتي" };

  return {
    title: `${listing.title} — Bety بيتي`,
    description: `${listing.propertyType || "Property"} in ${
      listing.city || "Syria"
    } — ${listing.listingType === "rent" ? "for rent" : "for sale"} on Bety.`,
    openGraph: {
      title: listing.title,
      images: listing.images?.[0] ? [listing.images[0]] : [],
    },
  };
}

export default async function ListingPage({
  params,
}: {
  params: { id: string };
}) {
  const listing = await getListing(params.id);
  if (!listing) notFound();

  const [hero, ...rest] = listing.images ?? [];

  return (
    <article className="mx-auto max-w-5xl px-6 py-12">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-[1.3fr_1fr]">
        <div>
          <div className="relative h-80 w-full overflow-hidden rounded-2xl bg-sand md:h-[420px]">
            {hero ? (
              <Image
                src={hero}
                alt={listing.title}
                fill
                sizes="(min-width: 768px) 60vw, 100vw"
                className="object-cover"
                priority
              />
            ) : (
              <div className="flex h-full items-center justify-center text-teal/40">
                <span className="font-display">No photo yet</span>
              </div>
            )}
          </div>

          {rest.length > 0 && (
            <div className="mt-3 grid grid-cols-4 gap-3">
              {rest.slice(0, 4).map((src, i) => (
                <div
                  key={i}
                  className="relative h-20 overflow-hidden rounded-lg bg-sand"
                >
                  <Image
                    src={src}
                    alt={`${listing.title} photo ${i + 2}`}
                    fill
                    sizes="120px"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          )}

          {listing.propertyType && (
            <div className="mt-8">
              <h2 className="font-display text-xl text-ink">
                About this property
              </h2>
              <p className="mt-3 font-body text-ink/70">
                {listing.propertyType}
                {listing.address ? ` — ${listing.address}` : ""}
              </p>
            </div>
          )}
        </div>

        <aside className="h-fit rounded-2xl border border-teal/10 bg-cream p-6 shadow-lg shadow-teal-deep/5">
          <span className="rounded-full bg-teal/10 px-2 py-0.5 text-xs font-semibold uppercase tracking-wide text-teal">
            {listing.listingType === "rent" ? "For rent" : "For sale"}
          </span>
          <h1 className="mt-3 font-display text-2xl text-ink">
            {listing.title}
          </h1>
          {listing.city && (
            <p className="mt-1 text-sm text-ink/60">
              {listing.address ? `${listing.address}, ` : ""}
              {listing.city}
            </p>
          )}
          <p className="mt-4 font-display text-3xl text-clay">
            {formatPrice(listing)}
          </p>

          {(listing.bedrooms || listing.bathrooms || listing.areaSqm) && (
            <dl className="mt-6 grid grid-cols-3 gap-3 border-t border-teal/10 pt-6 text-center">
              {listing.bedrooms ? (
                <div>
                  <dt className="text-xs uppercase text-ink/50">Beds</dt>
                  <dd className="font-display text-lg text-ink">
                    {listing.bedrooms}
                  </dd>
                </div>
              ) : null}
              {listing.bathrooms ? (
                <div>
                  <dt className="text-xs uppercase text-ink/50">Baths</dt>
                  <dd className="font-display text-lg text-ink">
                    {listing.bathrooms}
                  </dd>
                </div>
              ) : null}
              {listing.areaSqm ? (
                <div>
                  <dt className="text-xs uppercase text-ink/50">Area</dt>
                  <dd className="font-display text-lg text-ink">
                    {listing.areaSqm} m²
                  </dd>
                </div>
              ) : null}
            </dl>
          )}

          <a
            href="mailto:syrian.experts.1@gmail.com"
            className="mt-6 block rounded-xl bg-clay py-3 text-center font-body text-sm font-semibold text-cream hover:bg-clay-dark"
          >
            Contact about this property
          </a>
        </aside>
      </div>
    </article>
  );
}
