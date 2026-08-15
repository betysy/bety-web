export default function Footer() {
  return (
    <footer className="mt-24 border-t border-teal/10 bg-teal">
      <div className="mx-auto max-w-6xl px-6 py-14 text-cream/80">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-display text-xl text-cream">
              Bety <span className="font-arabic text-clay">بيتي</span>
            </p>
            <p className="mt-1 text-sm text-cream/55">
              Real estate across Syria — buy, rent, and list in one place.
            </p>
          </div>
          <div className="flex gap-8 font-body text-sm">
            <a href="/search" className="transition hover:text-cream">
              Listings
            </a>
            <a
              href="mailto:syrian.experts.1@gmail.com"
              className="transition hover:text-cream"
            >
              Contact
            </a>
            <a
              href="https://betysy.github.io/bety-legal/"
              className="transition hover:text-cream"
            >
              Privacy &amp; legal
            </a>
          </div>
        </div>
        <div className="mt-10 flex flex-col gap-2 border-t border-cream/10 pt-6 text-xs text-cream/40 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Bety بيتي. All rights reserved.</p>
          <p className="font-mono">betysyria.com</p>
        </div>
      </div>
    </footer>
  );
}
