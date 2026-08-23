"use client";

import dynamic from "next/dynamic";
import type { Listing } from "@/lib/pocketbase";

// Leaflet touches `window` at import time, which breaks Next.js SSR — load
// the actual map only in the browser.
const PropertyMapInner = dynamic(() => import("./PropertyMapInner"), {
  ssr: false,
  loading: () => <div className="h-full w-full animate-pulse bg-surface" />,
});

export default function PropertyMap(props: {
  listings: Listing[];
  center?: [number, number];
  zoom?: number;
}) {
  return <PropertyMapInner {...props} />;
}
