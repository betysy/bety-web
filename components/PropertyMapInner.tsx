"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Link from "next/link";
import type { Listing } from "@/lib/pocketbase";
import { formatPriceSYP } from "@/lib/listings";

// Same CartoDB Voyager tile source used by the Flutter app
// (bety_complete/lib/main.dart, kTileUrl) for visual consistency.
const TILE_URL = "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png";

const pinIcon = L.divIcon({
  className: "",
  html:
    '<div style="width:16px;height:16px;border-radius:50%;background:#00C896;' +
    'border:2px solid white;box-shadow:0 1px 4px rgba(0,0,0,.45)"></div>',
  iconSize: [16, 16],
  iconAnchor: [8, 8],
});

export default function PropertyMapInner({
  listings,
  center,
  zoom = 12,
}: {
  listings: Listing[];
  center?: [number, number];
  zoom?: number;
}) {
  const pins = listings.filter(
    (l): l is Listing & { latitude: number; longitude: number } =>
      l.latitude != null && l.longitude != null
  );
  const mapCenter: [number, number] =
    center ?? (pins[0] ? [pins[0].latitude, pins[0].longitude] : [33.5138, 36.2765]);

  return (
    <MapContainer
      center={mapCenter}
      zoom={zoom}
      scrollWheelZoom={false}
      className="h-full w-full"
    >
      <TileLayer
        url={TILE_URL}
        subdomains={["a", "b", "c", "d"]}
        attribution='&copy; OpenStreetMap &copy; CARTO'
      />
      {pins.map((l) => (
        <Marker key={l.id} position={[l.latitude, l.longitude]} icon={pinIcon}>
          <Popup>
            <Link
              href={`/listing/${l.id}`}
              className="font-body text-sm font-bold text-ink hover:text-primary-dark"
            >
              {l.title}
            </Link>
            <div className="mt-1 font-body text-xs text-muted">
              {formatPriceSYP(l.price, l.listingType)}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
