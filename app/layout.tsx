import type { Metadata } from "next";
import { Fraunces, Manrope, Tajawal } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  weight: ["400", "500", "600", "700"],
});

const tajawal = Tajawal({
  subsets: ["arabic"],
  variable: "--font-tajawal",
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Bety بيتي — Real Estate in Syria",
  description:
    "Find apartments, villas, and land for sale or rent across Syria. Bety بيتي connects buyers, renters, and sellers in one place.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${fraunces.variable} ${manrope.variable} ${tajawal.variable} font-body bg-cream text-ink antialiased`}
      >
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
