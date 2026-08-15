import Image from "next/image";
import Link from "next/link";
import type { Listing } from "@/lib/pocketbase";

function formatPrice(price: number, listingType: string) {
  const formatted = new Intl.NumberFormat("en-US").format(price);
  return listingType === "rent" ? `$${formatted}/mo` : `$${formatted}`;
}

export default function PropertyCard({ listing }: { listing: Listing }) {
  const image = listing.images?.[0];

  return (
    <Link
      href={`/listing/${listing.id}`}
      className="group block w-full max-w-xs"
    >
      <div className="relative mx-auto h-56 w-full max-w-[240px] overflow-hidden bg-teal/10 arch-frame">
        {image ? (
          <Image
            src={image}
            alt={listing.title}
            fill
            sizes="240px"
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-sand text-teal/40">
            <span className="font-display text-sm">No photo yet</span>
          </div>
        )}
      </div>

      <div className="mt-4 px-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display text-lg leading-snug text-ink group-hover:text-teal">
            {listing.title}
          </h3>
          <span className="whitespace-nowrap rounded-full bg-teal/10 px-2 py-0.5 text-xs font-semibold uppercase tracking-wide text-teal">
            {listing.listingType === "rent" ? "Rent" : "Sale"}
          </span>
        </div>
        {listing.city && (
          <p className="mt-1 text-sm text-ink/60">{listing.city}</p>
        )}
        <p className="mt-2 font-display text-xl text-clay">
          {formatPrice(listing.price, listing.listingType)}
        </p>
        {(listing.bedrooms || listing.bathrooms || listing.areaSqm) && (
          <p className="mt-1 text-xs text-ink/50">
            {[
              listing.bedrooms ? `${listing.bedrooms} bd` : null,
              listing.bathrooms ? `${listing.bathrooms} ba` : null,
              listing.areaSqm ? `${listing.areaSqm} m²` : null,
            ]
              .filter(Boolean)
              .join(" · ")}
          </p>
        )}
      </div>
    </Link>
  );
}
