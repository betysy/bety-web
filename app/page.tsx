import SearchBar from "@/components/SearchBar";
import PropertyCard from "@/components/PropertyCard";
import { getFeaturedListings, getPremiumListings } from "@/lib/listings";

export const revalidate = 60;

export default async function HomePage() {
  const [newest, premium] = await Promise.all([
    getFeaturedListings(6),
    getPremiumListings(3),
  ]);

  return (
    <>
      <section className="relative overflow-hidden bg-teal">
        <div className="tile-texture pointer-events-none absolute inset-0 opacity-[0.06]" />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 top-0 h-full w-[520px] opacity-90 arch-frame-wide"
          style={{
            background:
              "linear-gradient(160deg, #E8DCC8 0%, #B5502A 55%, #8F3C1E 100%)",
          }}
        />
        <div className="relative mx-auto max-w-6xl px-6 py-24 md:py-32">
          <p className="font-arabic text-lg text-sand fade-up">بيتك يبدأ من هون</p>
          <h1
            className="fade-up mt-3 max-w-xl font-display text-5xl font-medium leading-[1.05] text-cream md:text-6xl"
            style={{ animationDelay: "80ms" }}
          >
            Find your next home, across Syria.
          </h1>
          <p
            className="fade-up mt-5 max-w-md font-body text-cream/70"
            style={{ animationDelay: "160ms" }}
          >
            Bety brings buyers, renters, and sellers together in one place —
            apartments, villas, and land, listed by people who live there.
          </p>

          <div
            className="fade-up mt-10 max-w-3xl"
            style={{ animationDelay: "240ms" }}
          >
            <SearchBar />
          </div>

          <div
            className="fade-up mt-10 flex max-w-3xl flex-wrap gap-x-10 gap-y-3 border-t border-cream/15 pt-6 text-sm text-cream/60"
            style={{ animationDelay: "320ms" }}
          >
            <span>
              <span className="font-mono text-cream">دمشق</span> · Damascus
              listings live
            </span>
            <span>Verified by the Bety team</span>
            <span>New listings added weekly</span>
          </div>
        </div>
      </section>

      {premium.length > 0 && (
        <section className="border-b border-line bg-sand-light">
          <div className="mx-auto max-w-6xl px-6 py-16">
            <p className="font-arabic text-gold">عقارات مميزة</p>
            <h2 className="font-display text-3xl text-ink">
              Featured selections
            </h2>
            <p className="mt-1 text-sm text-ink-soft">
              Hand-picked listings, reviewed by the Bety team.
            </p>
            <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {premium.map((listing) => (
                <PropertyCard key={listing.id} listing={listing} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="flex items-end justify-between">
          <div>
            <p className="font-arabic text-clay">أحدث العقارات</p>
            <h2 className="font-display text-3xl text-ink">
              Newest listings
            </h2>
          </div>
          <a
            href="/search"
            className="hidden font-body text-sm font-semibold text-teal transition hover:text-clay md:block"
          >
            View all →
          </a>
        </div>

        {newest.length > 0 ? (
          <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {newest.map((listing) => (
              <PropertyCard key={listing.id} listing={listing} />
            ))}
          </div>
        ) : (
          <div className="mt-10 rounded-2xl border border-dashed border-teal/20 bg-sand-light p-12 text-center">
            <p className="font-display text-xl text-teal">
              No listings yet
            </p>
            <p className="mt-2 text-sm text-ink-soft">
              Once properties are added in PocketBase, they'll appear here
              automatically.
            </p>
          </div>
        )}
      </section>
    </>
  );
}
