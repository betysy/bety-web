export default function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-ink">
      <div className="mx-auto max-w-6xl px-6 py-12 text-white/80">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-body text-xl font-extrabold text-white">بيتي</p>
            <p className="mt-1 text-sm text-white/50">
              عقارات في سوريا — بيع، إيجار، وإدراج إعلانك في مكان واحد.
            </p>
          </div>
          <div className="flex gap-8 text-sm font-bold">
            <a href="/search" className="hover:text-primary">
              العقارات
            </a>
            <a href="mailto:syrian.experts.1@gmail.com" className="hover:text-primary">
              تواصل معنا
            </a>
            <a
              href="https://betysy.github.io/bety-legal/"
              className="hover:text-primary"
            >
              الخصوصية والشروط
            </a>
          </div>
        </div>
        <p className="mt-10 text-xs text-white/40">
          © {new Date().getFullYear()} بيتي. جميع الحقوق محفوظة.
        </p>
      </div>
    </footer>
  );
}
