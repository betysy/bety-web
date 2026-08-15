import Image from "next/image";
import Link from "next/link";
import { formatPrice, type Listing } from "@/lib/pocketbase";

function BedIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
      <path d="M3 18v-6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3 18v2M21 18v2" strokeLinecap="round" />
      <path d="M3 12V7a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14 10h5a1 1 0 0 1 1 1v1" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function BathIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
      <path d="M4 12h16v3a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4v-3Z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 12V7a2 2 0 0 1 2-2c1 0 1.5.5 1.5 1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6 19v2M16 19v2" strokeLinecap="round" />
    </svg>
  );
}

function AreaIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
      <path d="M4 4h5M4 4v5M20 4h-5M20 4v5M4 20h5M4 20v-5M20 20h-5M20 20v-5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function PropertyCard({ listing }: { listing: Listing }) {
  const image = listing.images?.[0];
  const facts = [
    listing.bedrooms ? { icon: <BedIcon />, label: `${listing.bedrooms}`, aria: "عدد غرف النوم" } : null,
    listing.bathrooms ? { icon: <BathIcon />, label: `${listing.bathrooms}`, aria: "عدد الحمامات" } : null,
    listing.areaSqm ? { icon: <AreaIcon />, label: `${listing.areaSqm} م²`, aria: "المساحة" } : null,
  ].filter(Boolean) as { icon: React.ReactNode; label: string; aria: string }[];

  return (
    <Link
      href={`/listing/${listing.id}`}
      className="group block w-full max-w-xs"
    >
      <div className="relative mx-auto h-56 w-full max-w-[240px] overflow-hidden bg-teal/10 arch-frame shadow-card transition-shadow duration-500 ease-smooth group-hover:shadow-cardHover">
        {image ? (
          <Image
            src={image}
            alt={listing.title}
            fill
            sizes="240px"
            className="object-cover transition duration-700 ease-smooth group-hover:scale-[1.06]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-sand text-teal/40">
            <span className="font-display text-sm">No photo yet</span>
          </div>
        )}

        {listing.isFeatured && (
          <span className="absolute right-0 top-4 rounded-l-full bg-gold px-3 py-1 font-body text-[11px] font-bold text-teal-deep shadow-sm">
            مميز
          </span>
        )}
      </div>

      <div className="mt-4 px-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display text-lg leading-snug text-ink transition-colors group-hover:text-teal">
            {listing.title}
          </h3>
          <span
            className={`whitespace-nowrap rounded-full px-2.5 py-0.5 text-[11px] font-bold ${
              listing.listingType === "rent"
                ? "bg-clay/10 text-clay-dark"
                : "bg-teal/10 text-teal"
            }`}
          >
            {listing.listingType === "rent" ? "إيجار" : "بيع"}
          </span>
        </div>
        {listing.city && (
          <p className="mt-1 text-sm text-ink-soft">{listing.city}</p>
        )}
        <p className="tabular-price mt-2 font-mono text-lg font-medium text-clay">
          {formatPrice(listing)}
        </p>
        {facts.length > 0 && (
          <div className="mt-2 flex items-center gap-3 text-xs text-ink-soft">
            {facts.map((f, i) => (
              <span key={i} className="flex items-center gap-1" aria-label={f.aria}>
                {f.icon}
                {f.label}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
