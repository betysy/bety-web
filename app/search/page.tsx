import SearchBar from "@/components/SearchBar";
import PropertyCard from "@/components/PropertyCard";
import PropertyMap from "@/components/PropertyMap";
import { searchListings } from "@/lib/listings";

export const metadata = {
  title: "نتائج البحث — بيتي",
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: {
    q?: string;
    city?: string;
    listingType?: string;
    propertyType?: string;
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
    <div>
      <div className="sticky top-[57px] z-40 border-b border-border bg-white/95 px-6 py-4 backdrop-blur">
        <div className="mx-auto max-w-6xl">
          <SearchBar
            defaultQ={searchParams.q}
            defaultCity={searchParams.city}
            defaultType={searchParams.propertyType}
            defaultListingType={searchParams.listingType}
          />
        </div>
      </div>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-6 py-8 lg:grid-cols-[1fr_420px]">
        <div>
          <p className="font-body text-sm font-bold text-muted">
            {items.length > 0
              ? `${items.length} عقار مطابق للبحث`
              : "لا توجد عقارات مطابقة لبحثك حالياً"}
          </p>

          <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2">
            {items.map((listing) => (
              <PropertyCard key={listing.id} listing={listing} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="mt-12 flex justify-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <a
                  key={p}
                  href={`/search?${new URLSearchParams({
                    ...searchParams,
                    page: String(p),
                  } as Record<string, string>).toString()}`}
                  className={`h-9 w-9 rounded-full text-center font-body text-sm font-bold leading-9 ${
                    p === page
                      ? "bg-primary text-white"
                      : "bg-surface text-ink/70 hover:bg-border"
                  }`}
                >
                  {p}
                </a>
              ))}
            </div>
          )}
        </div>

        <div className="hidden h-[calc(100vh-180px)] overflow-hidden rounded-2xl border border-border lg:sticky lg:top-[150px] lg:block">
          <PropertyMap listings={items} />
        </div>
      </div>
    </div>
  );
}
