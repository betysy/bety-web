const CITIES = [
  "دمشق", "حلب", "حمص", "اللاذقية", "طرطوس", "درعا",
  "إدلب", "دير الزور", "القامشلي", "ريف دمشق", "حماة", "السويداء",
];

const TYPES = ["شقة", "فيلا", "بيت", "استوديو", "محل تجاري", "مكتب", "أرض"];

export default function SearchBar({
  defaultQ,
  defaultCity,
  defaultType,
  defaultListingType,
}: {
  defaultQ?: string;
  defaultCity?: string;
  defaultType?: string;
  defaultListingType?: string;
}) {
  return (
    <form
      action="/search"
      method="get"
      className="w-full rounded-2xl bg-white p-3 shadow-xl shadow-black/10"
    >
      <div className="flex gap-1 p-1">
        {[
          { value: "sale", label: "للبيع" },
          { value: "rent", label: "للإيجار" },
        ].map((opt) => (
          <label key={opt.value} className="group">
            <input
              type="radio"
              name="listingType"
              value={opt.value}
              defaultChecked={(defaultListingType || "sale") === opt.value}
              className="peer sr-only"
            />
            <span className="block cursor-pointer rounded-full px-4 py-1.5 font-body text-sm font-bold text-ink/60 peer-checked:bg-primary-light peer-checked:text-primary-dark">
              {opt.label}
            </span>
          </label>
        ))}
      </div>

      <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-2">
        <div className="flex flex-1 flex-col gap-1 px-3 py-1">
          <label className="text-xs font-bold text-ink/40">الكلمة المفتاحية</label>
          <input
            type="text"
            name="q"
            defaultValue={defaultQ}
            placeholder="حي، عنوان، أو وصف"
            className="bg-transparent font-body text-base text-ink placeholder:text-ink/40 focus:outline-none"
          />
        </div>

        <div className="hidden h-9 w-px bg-border md:block" />

        <div className="flex flex-1 flex-col gap-1 px-3 py-1">
          <label className="text-xs font-bold text-ink/40">المدينة</label>
          <select
            name="city"
            defaultValue={defaultCity || ""}
            className="bg-transparent font-body text-base text-ink focus:outline-none"
          >
            <option value="">كل المدن</option>
            {CITIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div className="hidden h-9 w-px bg-border md:block" />

        <div className="flex flex-1 flex-col gap-1 px-3 py-1">
          <label className="text-xs font-bold text-ink/40">نوع العقار</label>
          <select
            name="propertyType"
            defaultValue={defaultType || ""}
            className="bg-transparent font-body text-base text-ink focus:outline-none"
          >
            <option value="">كل الأنواع</option>
            {TYPES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="rounded-xl bg-primary px-8 py-3 font-body text-sm font-bold text-white transition hover:bg-primary-dark"
        >
          بحث
        </button>
      </div>
    </form>
  );
}
