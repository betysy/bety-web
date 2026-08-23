import type { Metadata } from "next";
import { Almarai } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const almarai = Almarai({
  subsets: ["arabic"],
  variable: "--font-almarai",
  weight: ["400", "700", "800"],
});

export const metadata: Metadata = {
  title: "بيتي — عقارات في سوريا",
  description:
    "ابحث عن شقق وفلل وأراضٍ للبيع أو الإيجار في سوريا. بيتي يجمع المشترين والمستأجرين والبائعين في مكان واحد.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body
        className={`${almarai.variable} font-body bg-white text-ink antialiased`}
      >
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
