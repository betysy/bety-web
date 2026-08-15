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
      className="flex w-full flex-col gap-3 rounded-2xl bg-cream p-4 shadow-xl shadow-teal-deep/20 md:flex-row md:items-center md:gap-4 md:p-3"
    >
      <div className="flex flex-1 flex-col gap-1 px-2">
        <label className="text-xs font-semibold uppercase tracking-wide text-ink/50">
          Search
        </label>
        <input
          type="text"
          name="q"
          defaultValue={defaultQ}
          placeholder="Neighborhood, city, or keyword"
          className="bg-transparent font-body text-base text-ink placeholder:text-ink/40 focus:outline-none"
        />
      </div>

      <div className="hidden h-10 w-px bg-ink/10 md:block" />

      <div className="flex flex-1 flex-col gap-1 px-2">
        <label className="text-xs font-semibold uppercase tracking-wide text-ink/50">
          City
        </label>
        <input
          type="text"
          name="city"
          defaultValue={defaultCity}
          placeholder="e.g. Damascus"
          className="bg-transparent font-body text-base text-ink placeholder:text-ink/40 focus:outline-none"
        />
      </div>

      <div className="hidden h-10 w-px bg-ink/10 md:block" />

      <div className="flex flex-col gap-1 px-2">
        <label className="text-xs font-semibold uppercase tracking-wide text-ink/50">
          Type
        </label>
        <select
          name="listingType"
          defaultValue={defaultType || ""}
          className="bg-transparent font-body text-base text-ink focus:outline-none"
        >
          <option value="">Buy or rent</option>
          <option value="sale">For sale</option>
          <option value="rent">For rent</option>
        </select>
      </div>

      <button
        type="submit"
        className="rounded-xl bg-clay px-8 py-3 font-body text-sm font-semibold text-cream transition hover:bg-clay-dark"
      >
        Search
      </button>
    </form>
  );
}
