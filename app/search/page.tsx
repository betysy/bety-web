import SearchBar from "@/components/SearchBar";
import PropertyCard from "@/components/PropertyCard";
import { searchListings } from "@/lib/listings";

export const metadata = {
  title: "Search listings — Bety بيتي",
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: {
    q?: string;
    city?: string;
    listingType?: string;
    minPrice?: string;
    maxPrice?: string;
    page?: string;
  };
}) {
  const page = Number(searchParams.page || 1);
  const { items, totalPages } = await searchListings({
    ...searchParams,
    page,
  });

  return (
    <div className="mx-auto max-w-6xl px-6 py-14">
      <p className="font-arabic text-clay">تصفح العقارات</p>
      <h1 className="font-display text-4xl text-ink">Browse listings</h1>
      <div className="mt-8">
        <SearchBar
          defaultQ={searchParams.q}
          defaultCity={searchParams.city}
          defaultType={searchParams.listingType}
        />
      </div>

      <div className="mt-8 flex items-center gap-2 border-t border-line pt-6">
        <span className="font-mono text-sm text-ink-soft">
          {items.length > 0
            ? `${items.length} listing${items.length === 1 ? "" : "s"}`
            : "0 listings"}
        </span>
        {items.length === 0 && (
          <span className="text-sm text-ink-soft">
            — try a broader search or different city
          </span>
        )}
      </div>

      {items.length > 0 ? (
        <div className="mt-8 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((listing) => (
            <PropertyCard key={listing.id} listing={listing} />
          ))}
        </div>
      ) : (
        <div className="mt-8 rounded-2xl border border-dashed border-teal/20 bg-sand-light p-12 text-center">
          <p className="font-display text-xl text-teal">No matches</p>
          <p className="mt-2 text-sm text-ink-soft">
            Nothing fits those filters yet — adjust the search above and try
            again.
          </p>
        </div>
      )}

      {totalPages > 1 && (
        <div className="mt-16 flex justify-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <a
              key={p}
              href={`/search?${new URLSearchParams({
                ...searchParams,
                page: String(p),
              } as Record<string, string>).toString()}`}
              className={`h-9 w-9 rounded-full text-center font-mono text-sm leading-9 transition ${
                p === page
                  ? "bg-teal text-cream"
                  : "bg-sand-light text-ink-soft hover:bg-sand"
              }`}
            >
              {p}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
