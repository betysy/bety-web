import Image from "next/image";
import { notFound } from "next/navigation";
import { getListing, formatPrice, phoneDigits } from "@/lib/listings";
import PropertyMap from "@/components/PropertyMap";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const listing = await getListing(params.id);
  if (!listing) return { title: "الإعلان غير موجود — بيتي" };

  return {
    title: `${listing.title} — بيتي`,
    description:
      listing.description?.slice(0, 155) ||
      `${listing.propertyType || "عقار"} في ${listing.city || "سوريا"} — ${
        listing.listingType === "rent" ? "للإيجار" : "للبيع"
      } على بيتي.`,
    openGraph: {
      title: listing.title,
      images: listing.images?.[0] ? [listing.images[0]] : [],
    },
  };
}

export default async function ListingPage({
  params,
}: {
  params: { id: string };
}) {
  const listing = await getListing(params.id);
  if (!listing) notFound();

  const [hero, ...rest] = listing.images ?? [];
  const hasPin = listing.latitude != null && listing.longitude != null;

  return (
    <article className="mx-auto max-w-5xl px-6 py-10">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-[1.3fr_1fr]">
        <div>
          <div className="relative h-80 w-full overflow-hidden rounded-2xl bg-surface md:h-[420px]">
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
              <div className="flex h-full items-center justify-center text-muted">
                <span className="font-body">لا توجد صورة بعد</span>
              </div>
            )}
          </div>

          {rest.length > 0 && (
            <div className="mt-3 grid grid-cols-4 gap-3">
              {rest.slice(0, 4).map((src, i) => (
                <div
                  key={i}
                  className="relative h-20 overflow-hidden rounded-lg bg-surface"
                >
                  <Image
                    src={src}
                    alt={`${listing.title} صورة ${i + 2}`}
                    fill
                    sizes="120px"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          )}

          {listing.description && (
            <div className="mt-8">
              <h2 className="font-body text-lg font-extrabold text-ink">
                عن هذا العقار
              </h2>
              <p className="mt-3 whitespace-pre-line font-body text-ink/70">
                {listing.description}
              </p>
            </div>
          )}

          {hasPin && (
            <div className="mt-8">
              <h2 className="font-body text-lg font-extrabold text-ink">
                الموقع
              </h2>
              <div className="mt-3 h-64 overflow-hidden rounded-2xl border border-border">
                <PropertyMap
                  listings={[listing]}
                  center={[listing.latitude!, listing.longitude!]}
                  zoom={14}
                />
              </div>
            </div>
          )}
        </div>

        <aside className="h-fit rounded-2xl border border-border bg-white p-6 shadow-lg shadow-black/5 md:sticky md:top-[80px]">
          <span className="rounded-full bg-primary-light px-2.5 py-1 text-xs font-bold text-primary-dark">
            {listing.listingType === "rent" ? "للإيجار" : "للبيع"}
          </span>
          <h1 className="mt-3 font-body text-xl font-extrabold text-ink">
            {listing.title}
          </h1>
          {listing.city && (
            <p className="mt-1 text-sm text-muted">
              {listing.address ? `${listing.address} — ` : ""}
              {listing.city}
            </p>
          )}
          <p className="mt-4 font-body text-2xl font-extrabold text-primary-dark">
            {formatPrice(listing.price, listing.currency, listing.listingType)}
          </p>

          {((listing.bedrooms ?? 0) > 0 || (listing.bathrooms ?? 0) > 0 || (listing.areaSqm ?? 0) > 0) && (
            <dl className="mt-6 grid grid-cols-3 gap-3 border-t border-border pt-6 text-center">
              {listing.areaSqm ? (
                <div>
                  <dt className="text-xs text-muted">المساحة</dt>
                  <dd className="font-body text-lg font-bold text-ink">
                    {listing.areaSqm} م²
                  </dd>
                </div>
              ) : null}
              {listing.bedrooms ? (
                <div>
                  <dt className="text-xs text-muted">الغرف</dt>
                  <dd className="font-body text-lg font-bold text-ink">
                    {listing.bedrooms}
                  </dd>
                </div>
              ) : null}
              {listing.bathrooms ? (
                <div>
                  <dt className="text-xs text-muted">الحمامات</dt>
                  <dd className="font-body text-lg font-bold text-ink">
                    {listing.bathrooms}
                  </dd>
                </div>
              ) : null}
            </dl>
          )}

          {phoneDigits(listing.contactPhone) ? (
            <div className="mt-6 space-y-3">
              {listing.contactName && (
                <p className="text-sm text-muted">المعلن: {listing.contactName}</p>
              )}
              <div className="grid grid-cols-2 gap-3">
                <a
                  href={`tel:+${phoneDigits(listing.contactPhone)}`}
                  className="block rounded-xl bg-primary py-3 text-center font-body text-sm font-bold text-white hover:bg-primary-dark"
                >
                  اتصال
                </a>
                <a
                  href={`https://wa.me/${phoneDigits(listing.contactPhone)}?text=${encodeURIComponent(
                    `مرحباً، أنا مهتم بعقارك على بيتي: ${listing.title}\nhttps://betysyria.com/listing/${listing.id}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-xl bg-[#25D366] py-3 text-center font-body text-sm font-bold text-white hover:opacity-90"
                >
                  واتساب
                </a>
              </div>
            </div>
          ) : (
            <a
              href={`mailto:syrian.experts.1@gmail.com?subject=${encodeURIComponent(
                `استفسار عن عقار ${listing.id}`
              )}&body=${encodeURIComponent(
                `أرغب بالتواصل مع صاحب هذا العقار:\n${listing.title}\nhttps://betysyria.com/listing/${listing.id}`
              )}`}
              className="mt-6 block rounded-xl bg-primary py-3 text-center font-body text-sm font-bold text-white hover:bg-primary-dark"
            >
              تواصل عبر بيتي
            </a>
          )}
          <a
            href={`mailto:syrian.experts.1@gmail.com?subject=${encodeURIComponent(
              `بلاغ عن إعلان ${listing.id}`
            )}&body=${encodeURIComponent(
              `سبب البلاغ:\nالرابط: https://betysyria.com/listing/${listing.id}`
            )}`}
            className="mt-3 block text-center text-xs text-muted hover:text-primary"
          >
            الإبلاغ عن هذا الإعلان
          </a>
        </aside>
      </div>
    </article>
  );
}
