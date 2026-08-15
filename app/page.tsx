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
          className="pointer-events-none absolute -left-24 top-0 h-full w-[520px] opacity-90 arch-frame-wide"
          style={{
            background:
              "linear-gradient(200deg, #E8DCC8 0%, #B5502A 55%, #8F3C1E 100%)",
          }}
        />
        <div className="relative mx-auto max-w-6xl px-6 py-24 md:py-32">
          <p className="fade-up text-lg text-sand">
            بيتك يبدأ من هون
          </p>
          <h1
            className="fade-up mt-3 max-w-xl font-display text-5xl font-bold leading-[1.15] text-cream md:text-6xl"
            style={{ animationDelay: "80ms" }}
          >
            دوّر على بيتك الجديد، بكل سوريا
          </h1>
          <p
            className="fade-up mt-5 max-w-md font-body text-cream/70"
            style={{ animationDelay: "160ms" }}
          >
            منصة بيتي تجمع المشترين والمستأجرين والبائعين في مكان واحد —
            شقق وفلل وأراضٍ معروضة من أصحابها مباشرة.
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
            <span>عقارات دمشق متوفرة الآن</span>
            <span>معتمد من فريق بيتي</span>
            <span>عقارات جديدة أسبوعياً</span>
          </div>
        </div>
      </section>

      {premium.length > 0 && (
        <section className="border-b border-line bg-sand-light">
          <div className="mx-auto max-w-6xl px-6 py-16">
            <p className="text-gold">عقارات مميزة</p>
            <h2 className="font-display text-3xl font-bold text-ink">
              عقارات مختارة بعناية
            </h2>
            <p className="mt-1 text-sm text-ink-soft">
              عقارات تمت مراجعتها من فريق بيتي.
            </p>
            <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {premium.map((listing) => (
                <PropertyCard key={listing.id} listing={listing} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="mx-auto max-w-6xl px-6 pt-16">
        <div className="flex flex-col items-center gap-4 rounded-2xl bg-sand-light px-8 py-10 text-center md:flex-row md:justify-between md:text-start">
          <div>
            <h2 className="font-display text-2xl font-bold text-ink">
              عندك عقار للبيع أو الإيجار؟
            </h2>
            <p className="mt-1 text-sm text-ink-soft">
              أضف تفاصيل عقارك مجاناً، وسيراجعه فريق بيتي قبل نشره.
            </p>
          </div>
          <a
            href="/list-property"
            className="rounded-xl bg-clay px-6 py-3 font-body text-sm font-semibold text-cream transition duration-300 ease-smooth hover:bg-clay-dark hover:shadow-md"
          >
            أضف عقارك الآن
          </a>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-clay">جديد</p>
            <h2 className="font-display text-3xl font-bold text-ink">
              أحدث العقارات
            </h2>
          </div>
          <a
            href="/search"
            className="hidden items-center gap-1 font-body text-sm font-semibold text-teal transition hover:text-clay md:flex"
          >
            عرض الكل
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M10 6 4 12l6 6M4 12h16" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
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
            <p className="font-display text-xl text-teal">لا توجد عقارات بعد</p>
            <p className="mt-2 text-sm text-ink-soft">
              بمجرد إضافة العقارات، ستظهر هنا تلقائياً.
            </p>
          </div>
        )}
      </section>
    </>
  );
}
