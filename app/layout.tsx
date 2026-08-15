import type { Metadata } from "next";
import { Amiri, Tajawal, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Amiri is a literary Arabic naskh serif — carries the same "characterful
// headline face used with restraint" role Fraunces played, but one that
// actually renders Arabic glyphs instead of silently falling back.
const amiri = Amiri({
  subsets: ["arabic"],
  variable: "--font-display",
  weight: ["400", "700"],
  style: ["normal", "italic"],
});

const tajawal = Tajawal({
  subsets: ["arabic"],
  variable: "--font-body",
  weight: ["400", "500", "700", "800"],
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "بيتي — عقارات في سوريا",
  description:
    "ابحث عن شقق وفلل وأراضٍ للبيع أو الإيجار في جميع أنحاء سوريا. بيتي يجمع المشترين والمستأجرين والبائعين في مكان واحد.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body
        className={`${amiri.variable} ${tajawal.variable} ${plexMono.variable} font-body bg-cream text-ink antialiased`}
      >
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
