import Link from "next/link";

export default function SearchBar({
  defaultQ,
  defaultCity,
  defaultType,
}: {
  defaultQ?: string;
  defaultCity?: string;
  defaultType?: string;
}) {
  return (
    <form
      action="/search"
      method="get"
      className="flex w-full flex-col gap-3 rounded-2xl bg-cream p-4 shadow-lift md:flex-row md:items-center md:gap-2 md:p-3"
    >
      <div className="flex flex-1 items-center gap-2 px-2">
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="shrink-0 text-ink-soft"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="m21 21-4.35-4.35" strokeLinecap="round" />
        </svg>
        <div className="flex flex-1 flex-col gap-0.5">
          <label className="text-[11px] font-semibold uppercase tracking-wide text-ink-soft">
            بحث
          </label>
          <input
            type="text"
            name="q"
            defaultValue={defaultQ}
            placeholder="الحي، المدينة، أو كلمة مفتاحية"
            className="bg-transparent font-body text-base text-ink placeholder:text-ink/35 focus:outline-none"
          />
        </div>
      </div>

      <div className="hidden h-10 w-px bg-line md:block" />

      <div className="flex flex-1 flex-col gap-0.5 px-2">
        <label className="text-[11px] font-semibold uppercase tracking-wide text-ink-soft">
          المدينة
        </label>
        <input
          type="text"
          name="city"
          defaultValue={defaultCity}
          placeholder="مثال: دمشق"
          className="bg-transparent font-body text-base text-ink placeholder:text-ink/35 focus:outline-none"
        />
      </div>

      <div className="hidden h-10 w-px bg-line md:block" />

      <div className="flex flex-col gap-0.5 px-2">
        <label className="text-[11px] font-semibold uppercase tracking-wide text-ink-soft">
          النوع
        </label>
        <select
          name="listingType"
          defaultValue={defaultType || ""}
          className="bg-transparent font-body text-base text-ink focus:outline-none"
        >
          <option value="">بيع أو إيجار</option>
          <option value="sale">للبيع</option>
          <option value="rent">للإيجار</option>
        </select>
      </div>

      <button
        type="submit"
        className="rounded-xl bg-clay px-8 py-3 font-body text-sm font-semibold text-cream transition duration-300 ease-smooth hover:bg-clay-dark hover:shadow-md"
      >
        بحث
      </button>
    </form>
  );
}
