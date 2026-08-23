import SearchBar from "@/components/SearchBar";
import PropertyCard from "@/components/PropertyCard";
import { getFeaturedListings } from "@/lib/listings";

export const revalidate = 60;

export default async function HomePage() {
  const featured = await getFeaturedListings(6);

  return (
    <>
      <section className="relative overflow-hidden bg-ink">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/30"
        />
        <div className="relative mx-auto max-w-6xl px-6 py-20 md:py-28">
          <h1 className="max-w-2xl font-body text-4xl font-extrabold leading-tight text-white md:text-5xl">
            بيتك القادم، في أي مكان بسوريا
          </h1>
          <p className="mt-4 max-w-lg font-body text-white/70">
            بيتي يجمع المشترين والمستأجرين والبائعين في مكان واحد — شقق وفلل
            وأراضٍ، معروضة من أصحابها مباشرة.
          </p>

          <div className="mt-8 max-w-3xl">
            <SearchBar />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="flex items-end justify-between">
          <h2 className="font-body text-2xl font-extrabold text-ink">
            أحدث العقارات
          </h2>
          <a
            href="/search"
            className="hidden font-body text-sm font-bold text-primary-dark hover:underline md:block"
          >
            عرض الكل ←
          </a>
        </div>

        {featured.length > 0 ? (
          <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((listing) => (
              <PropertyCard key={listing.id} listing={listing} />
            ))}
          </div>
        ) : (
          <div className="mt-8 rounded-2xl border border-dashed border-border bg-surface p-12 text-center">
            <p className="font-body text-lg font-bold text-ink">
              لا توجد عقارات بعد
            </p>
            <p className="mt-2 text-sm text-muted">
              بمجرد إضافة عقارات في PocketBase، ستظهر هنا تلقائياً.
            </p>
          </div>
        )}
      </section>
    </>
  );
}
