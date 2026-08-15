export default function Footer() {
  return (
    <footer className="mt-24 border-t border-teal/10 bg-teal">
      <div className="mx-auto max-w-6xl px-6 py-14 text-cream/80">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-display text-xl font-bold text-cream">بيتي</p>
            <p className="mt-1 text-sm text-cream/55">
              عقارات في جميع أنحاء سوريا — بيع، إيجار، وإعلان في مكان واحد.
            </p>
          </div>
          <div className="flex gap-8 font-body text-sm">
            <a href="/search" className="transition hover:text-cream">
              العقارات
            </a>
            <a
              href="mailto:syrian.experts.1@gmail.com"
              className="transition hover:text-cream"
            >
              تواصل معنا
            </a>
            <a
              href="https://betysy.github.io/bety-legal/"
              className="transition hover:text-cream"
            >
              الخصوصية والشروط
            </a>
          </div>
        </div>
        <div className="mt-10 flex flex-col gap-2 border-t border-cream/10 pt-6 text-xs text-cream/40 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} بيتي. جميع الحقوق محفوظة.</p>
          <p className="font-mono" dir="ltr">betysyria.com</p>
        </div>
      </div>
    </footer>
  );
}
