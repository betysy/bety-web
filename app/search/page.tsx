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
    <div className="mx-auto max-w-6xl px-6 py-12">
      <h1 className="font-display text-3xl text-ink">Browse listings</h1>
      <div className="mt-6">
        <SearchBar
          defaultQ={searchParams.q}
          defaultCity={searchParams.city}
          defaultType={searchParams.listingType}
        />
      </div>

      <p className="mt-8 text-sm text-ink/60">
        {items.length > 0
          ? `Showing ${items.length} listing${items.length === 1 ? "" : "s"}`
          : "No listings match your search yet."}
      </p>

      <div className="mt-6 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((listing) => (
          <PropertyCard key={listing.id} listing={listing} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="mt-16 flex justify-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <a
              key={p}
              href={`/search?${new URLSearchParams({
                ...searchParams,
                page: String(p),
              } as Record<string, string>).toString()}`}
              className={`h-9 w-9 rounded-full text-center font-body text-sm leading-9 ${
                p === page
                  ? "bg-teal text-cream"
                  : "bg-sand-light text-ink/70 hover:bg-sand"
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
