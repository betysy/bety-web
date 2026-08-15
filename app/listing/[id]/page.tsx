import Image from "next/image";
import Link from "next/link";
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

function FactIcon({ type }: { type: "bed" | "bath" | "area" }) {
  const common = { width: 18, height: 18, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.6 };
  if (type === "bed") {
    return (
      <svg {...common}>
        <path d="M3 18v-6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M3 18v2M21 18v2" strokeLinecap="round" />
        <path d="M3 12V7a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M14 10h5a1 1 0 0 1 1 1v1" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  if (type === "bath") {
    return (
      <svg {...common}>
        <path d="M4 12h16v3a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4v-3Z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M4 12V7a2 2 0 0 1 2-2c1 0 1.5.5 1.5 1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M6 19v2M16 19v2" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <path d="M4 4h5M4 4v5M20 4h-5M20 4v5M4 20h5M4 20v-5M20 20h-5M20 20v-5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
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
      <nav className="mb-6 flex items-center gap-2 font-body text-sm text-ink-soft">
        <Link href="/" className="hover:text-teal">
          Home
        </Link>
        <span>/</span>
        <Link href="/search" className="hover:text-teal">
          Listings
        </Link>
        {listing.city && (
          <>
            <span>/</span>
            <span className="text-ink">{listing.city}</span>
          </>
        )}
      </nav>

      <div className="grid grid-cols-1 gap-10 md:grid-cols-[1.3fr_1fr]">
        <div>
          <div className="relative h-80 w-full overflow-hidden rounded-2xl bg-sand shadow-card md:h-[440px]">
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
            {listing.isFeatured && (
              <span className="absolute left-4 top-4 rounded-full bg-gold px-3 py-1 font-body text-xs font-bold uppercase tracking-wider text-teal-deep shadow-sm">
                Featured
              </span>
            )}
          </div>

          {rest.length > 0 && (
            <div className="mt-3 grid grid-cols-4 gap-3">
              {rest.slice(0, 4).map((src, i) => (
                <div
                  key={i}
                  className="relative h-20 overflow-hidden rounded-lg bg-sand ring-1 ring-line transition hover:ring-clay"
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

          {(listing.bedrooms || listing.bathrooms || listing.areaSqm) && (
            <div className="mt-8 flex gap-8 rounded-xl border border-line bg-sand-light px-6 py-4">
              {listing.bedrooms ? (
                <div className="flex items-center gap-2 text-ink">
                  <FactIcon type="bed" />
                  <span className="font-mono text-sm">
                    {listing.bedrooms} bed{listing.bedrooms > 1 ? "s" : ""}
                  </span>
                </div>
              ) : null}
              {listing.bathrooms ? (
                <div className="flex items-center gap-2 text-ink">
                  <FactIcon type="bath" />
                  <span className="font-mono text-sm">
                    {listing.bathrooms} bath{listing.bathrooms > 1 ? "s" : ""}
                  </span>
                </div>
              ) : null}
              {listing.areaSqm ? (
                <div className="flex items-center gap-2 text-ink">
                  <FactIcon type="area" />
                  <span className="font-mono text-sm">{listing.areaSqm} m²</span>
                </div>
              ) : null}
            </div>
          )}

          {listing.propertyType && (
            <div className="mt-8">
              <h2 className="font-display text-xl text-ink">
                About this property
              </h2>
              <p className="mt-3 font-body text-ink-soft">
                {listing.propertyType}
                {listing.address ? ` — ${listing.address}` : ""}
              </p>
            </div>
          )}
        </div>

        <aside className="h-fit rounded-2xl border border-line bg-cream p-6 shadow-card md:sticky md:top-24">
          <span
            className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide ${
              listing.listingType === "rent"
                ? "bg-clay/10 text-clay-dark"
                : "bg-teal/10 text-teal"
            }`}
          >
            {listing.listingType === "rent" ? "For rent" : "For sale"}
          </span>
          <h1 className="mt-3 font-display text-2xl leading-snug text-ink">
            {listing.title}
          </h1>
          {listing.city && (
            <p className="mt-1 text-sm text-ink-soft">
              {listing.address ? `${listing.address}, ` : ""}
              {listing.city}
            </p>
          )}
          <p className="tabular-price mt-5 font-mono text-3xl font-medium text-clay">
            {formatPrice(listing)}
          </p>

          <a
            href="mailto:syrian.experts.1@gmail.com"
            className="mt-6 block rounded-xl bg-clay py-3 text-center font-body text-sm font-semibold text-cream transition duration-300 ease-smooth hover:bg-clay-dark hover:shadow-md"
          >
            Contact about this property
          </a>
          <p className="mt-3 text-center text-xs text-ink-soft">
            Responses usually within a day
          </p>
        </aside>
      </div>
    </article>
  );
}
