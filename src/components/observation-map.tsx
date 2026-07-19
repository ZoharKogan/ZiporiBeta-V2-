import { useEffect, useMemo, useState } from "react";
import { MapContainer, TileLayer, CircleMarker, Polygon, useMap, useMapEvents } from "react-leaflet";
import L from "leaflet";
import type { Observation } from "@/lib/observations-store";
import { useObservations, translateSpeciesName, getTaxaGroup } from "@/lib/observations-store";
import { SURVEY_POLYGONS, SURVEY_AREA_KEYS, AREA_COLORS, type SurveyAreaKey } from "@/lib/survey-polygons";

function FitBounds({ obs }: { obs: Observation[] }) {
  const map = useMap();
  useEffect(() => {
    if (obs.length === 0) return;
    const bounds = L.latLngBounds(obs.map((o) => [o.latitude, o.longitude] as [number, number]));
    map.fitBounds(bounds, { padding: [50, 50], maxZoom: 14, animate: true });
  }, [obs, map]);
  return null;
}

function ZoomTracker({ onZoom }: { onZoom: (z: number) => void }) {
  useMapEvents({
    zoomend: (e) => onZoom(e.target.getZoom()),
  });
  return null;
}

function PaneSetup() {
  const map = useMap();
  useEffect(() => {
    if (!map.getPane("polygonPane")) {
      const pane = map.createPane("polygonPane");
      pane.style.zIndex = "500";
      pane.style.pointerEvents = "none";
    }
  }, [map]);
  return null;
}

export function ObservationMap({ data, selectedSpecies = new Set<string>() }: { data: Observation[]; selectedSpecies?: Set<string> }) {
  const { filters } = useObservations();
  const selectedAreas = new Set(filters.areas) as Set<SurveyAreaKey>;
  const baseAreaKeys = SURVEY_AREA_KEYS.filter((k) => k !== "other_areas");
  const [zoom, setZoom] = useState<number>(7);

  const center: [number, number] = data[0]
    ? [data[0].latitude, data[0].longitude]
    : [31.5, 34.9]; // default Israel

  // Data aggregation: group observations by species, date, and rounded coordinates
  const bubbles = useMemo(() => {
    const groups = new Map<string, { lat: number; lng: number; count: number; category: string; raw_observations: Array<{ species: string; date: string; originalLat: number; originalLng: number }> }>();

    for (const obs of data) {
      const key = `${obs.scientific_name}|${obs.observed_on}|${obs.latitude.toFixed(3)}|${obs.longitude.toFixed(3)}`;
      const category = getTaxaGroup(obs) || "other";

      if (groups.has(key)) {
        const existing = groups.get(key)!;
        existing.count++;
        existing.raw_observations.push({
          species: obs.scientific_name,
          date: obs.observed_on,
          originalLat: obs.latitude,
          originalLng: obs.longitude,
        });
      } else {
        groups.set(key, {
          lat: obs.latitude,
          lng: obs.longitude,
          count: 1,
          category,
          raw_observations: [{
            species: obs.scientific_name,
            date: obs.observed_on,
            originalLat: obs.latitude,
            originalLng: obs.longitude,
          }],
        });
      }
    }

    return Array.from(groups.values());
  }, [data]);

  const mergedBubbles = bubbles.filter(b => b.count > 1);
  let totalMergedObservations = 0;

  console.group('--- FULL AGGREGATION AUDIT REPORT ---');
  console.log(`Total Bubbles on Map (All): ${bubbles.length}`);
  console.log(`Bubbles containing MULTIPLE observations: ${mergedBubbles.length}`);

  mergedBubbles.forEach((bubble, index) => {
    totalMergedObservations += bubble.count;
    console.groupCollapsed(`Merged Bubble #${index + 1}: ${bubble.raw_observations[0]?.species} | Date: ${bubble.raw_observations[0]?.date} | Count: ${bubble.count}`);
    console.log(`Rounded Anchor: Lat=${bubble.lat}, Lng=${bubble.lng}`);
    console.table(bubble.raw_observations);
    console.groupEnd();
  });

  console.log('--- SUMMARY ---');
  console.log(`Total original observations hidden inside merged bubbles: ${totalMergedObservations}`);
  console.log(`Total points saved from rendering on map: ${totalMergedObservations - mergedBubbles.length}`);
  console.groupEnd();

  // Color palette matching taxa tabs (soft/pastel colors)
  const categoryColors: Record<string, { color: string; fillColor: string }> = {
    birds: { color: "#0ea5e9", fillColor: "#7dd3fc" },        // sky-500, sky-300
    butterflies: { color: "#f97316", fillColor: "#fdba74" },  // orange-500, orange-300
    dragonflies: { color: "#14b8a6", fillColor: "#5eead4" },  // teal-500, teal-300
    arthropods: { color: "#dc2626", fillColor: "#fca5a5" },   // red-600, red-300
    mammals: { color: "#a855f7", fillColor: "#d8b4fe" },      // purple-500, purple-300
    plants: { color: "#65a30d", fillColor: "#bef264" },       // lime-600, lime-300
    other: { color: "#6b7280", fillColor: "#d4d4d8" },        // gray-500, gray-300
  };

  const getCategoryColor = (category: string) => {
    return categoryColors[category] || categoryColors.other;
  };

  /** Convert GeoJSON [lon, lat] ring to Leaflet [lat, lng] positions. */
  const ringToLatLng = (ring: number[][]): [number, number][] =>
    ring.map(([lon, lat]) => [lat, lon] as [number, number]);

  return (
    <div className="h-full w-full overflow-hidden rounded-lg border bg-card">
      <MapContainer
        center={center}
        zoom={7}
        scrollWheelZoom
        preferCanvas={true}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <PaneSetup />
        <FitBounds obs={data} />
        <ZoomTracker onZoom={setZoom} />
        {baseAreaKeys.map((areaKey) => {
          const rings = SURVEY_POLYGONS[areaKey];
          if (!rings) return null;
          const isSelected = selectedAreas.has(areaKey);
          if (!isSelected) return null;
          const zoomedOut = zoom <= 13;
          const pathOptions = {
            color: AREA_COLORS[areaKey],
            fillColor: AREA_COLORS[areaKey],
            fillOpacity: zoomedOut ? 0.6 : 0.35,
            weight: zoomedOut ? 11 : 4,
            opacity: 1,
            interactive: false,
          };
          return (
            <Polygon
              key={areaKey}
              positions={rings.map(ringToLatLng)}
              pathOptions={pathOptions}
              pane="polygonPane"
            />
          );
        })}
        {bubbles.map((bubble, i) => {
          const colors = getCategoryColor(bubble.category);
          const isSelected = selectedSpecies.size === 0 || selectedSpecies.has(bubble.raw_observations[0]?.species);
          return (
            <CircleMarker
              key={i}
              center={[bubble.lat, bubble.lng]}
              radius={Math.min(5 + bubble.count * 2, 40)}
              pathOptions={{
                color: colors.color,
                fillColor: colors.fillColor,
                fillOpacity: isSelected ? 0.6 : 0.15,
                weight: isSelected ? 2 : 1,
                opacity: isSelected ? 1 : 0.3,
              }}
              interactive={false}
            />
          );
        })}
      </MapContainer>
    </div>
  );
}
