import Image from "next/image";
import Link from "next/link";
import type { Listing } from "@/lib/pocketbase";
import { formatPriceSYP } from "@/lib/listings";

const THREE_DAYS_MS = 3 * 24 * 60 * 60 * 1000;

export default function PropertyCard({ listing }: { listing: Listing }) {
  const image = listing.images?.[0];
  const isNew =
    !!listing.created && Date.now() - new Date(listing.created).getTime() < THREE_DAYS_MS;

  return (
    <Link href={`/listing/${listing.id}`} className="group block w-full">
      <div className="relative h-56 w-full overflow-hidden rounded-2xl bg-surface">
        {image ? (
          <Image
            src={image}
            alt={listing.title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-muted">
            <span className="font-body text-sm">لا توجد صورة بعد</span>
          </div>
        )}
        {listing.propertyType && (
          <span className="absolute right-3 top-3 rounded-full bg-white px-3 py-1 text-xs font-bold text-primary-dark shadow">
            {listing.propertyType}
          </span>
        )}
        {isNew && (
          <span className="absolute left-3 top-3 rounded-full bg-primary px-3 py-1 text-xs font-bold text-white">
            جديد
          </span>
        )}
        <span className="absolute bottom-3 right-3 rounded-full bg-primary px-3 py-1.5 text-sm font-extrabold text-white shadow">
          {formatPriceSYP(listing.price, listing.listingType)}
        </span>
      </div>

      <div className="mt-3 px-1">
        <h3 className="truncate font-body text-base font-bold text-ink group-hover:text-primary-dark">
          {listing.title}
        </h3>
        {listing.city && (
          <p className="mt-1 flex items-center gap-1 text-sm text-muted">
            <span aria-hidden>📍</span>
            {listing.address ? `${listing.address} — ${listing.city}` : listing.city}
          </p>
        )}
        {(listing.bedrooms || listing.bathrooms || listing.areaSqm) && (
          <p className="mt-1.5 text-sm text-ink/70">
            {[
              listing.areaSqm ? `${listing.areaSqm} م²` : null,
              listing.bedrooms ? `${listing.bedrooms} غرف` : null,
              listing.bathrooms ? `${listing.bathrooms} حمام` : null,
            ]
              .filter(Boolean)
              .join(" · ")}
          </p>
        )}
      </div>
    </Link>
  );
}
