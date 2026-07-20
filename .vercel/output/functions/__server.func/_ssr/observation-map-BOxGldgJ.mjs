import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L } from "../_libs/leaflet.mjs";
import { u as useObservations, S as SURVEY_AREA_KEYS, g as getTaxaGroup, A as AREA_COLORS, i as SURVEY_POLYGONS } from "./index-CFoMiIRD.mjs";
import { M as MapContainer, T as TileLayer, P as Polygon, C as CircleMarker, u as useMap, a as useMapEvents } from "../_libs/react-leaflet.mjs";
function FitBounds({ obs }) {
  const map = useMap();
  reactExports.useEffect(() => {
    if (obs.length === 0) return;
    const bounds = L.latLngBounds(obs.map((o) => [o.latitude, o.longitude]));
    map.fitBounds(bounds, { padding: [50, 50], maxZoom: 14, animate: true });
  }, [obs, map]);
  return null;
}
function ZoomTracker({ onZoom }) {
  useMapEvents({
    zoomend: (e) => onZoom(e.target.getZoom())
  });
  return null;
}
function PaneSetup() {
  const map = useMap();
  reactExports.useEffect(() => {
    if (!map.getPane("polygonPane")) {
      const pane = map.createPane("polygonPane");
      pane.style.zIndex = "500";
      pane.style.pointerEvents = "none";
    }
  }, [map]);
  return null;
}
function ObservationMap({ data, selectedSpecies = /* @__PURE__ */ new Set() }) {
  const { filters } = useObservations();
  const selectedAreas = new Set(filters.areas);
  const baseAreaKeys = SURVEY_AREA_KEYS.filter((k) => k !== "other_areas");
  const [zoom, setZoom] = reactExports.useState(7);
  const center = data[0] ? [data[0].latitude, data[0].longitude] : [31.5, 34.9];
  const bubbles = reactExports.useMemo(() => {
    const groups = /* @__PURE__ */ new Map();
    for (const obs of data) {
      const key = `${obs.scientific_name}|${obs.observed_on}|${obs.latitude.toFixed(3)}|${obs.longitude.toFixed(3)}`;
      const category = getTaxaGroup(obs) || "other";
      if (groups.has(key)) {
        const existing = groups.get(key);
        existing.count++;
        existing.raw_observations.push({
          species: obs.scientific_name,
          date: obs.observed_on,
          originalLat: obs.latitude,
          originalLng: obs.longitude
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
            originalLng: obs.longitude
          }]
        });
      }
    }
    return Array.from(groups.values());
  }, [data]);
  const mergedBubbles = bubbles.filter((b) => b.count > 1);
  let totalMergedObservations = 0;
  console.group("--- FULL AGGREGATION AUDIT REPORT ---");
  console.log(`Total Bubbles on Map (All): ${bubbles.length}`);
  console.log(`Bubbles containing MULTIPLE observations: ${mergedBubbles.length}`);
  mergedBubbles.forEach((bubble, index) => {
    totalMergedObservations += bubble.count;
    console.groupCollapsed(`Merged Bubble #${index + 1}: ${bubble.raw_observations[0]?.species} | Date: ${bubble.raw_observations[0]?.date} | Count: ${bubble.count}`);
    console.log(`Rounded Anchor: Lat=${bubble.lat}, Lng=${bubble.lng}`);
    console.table(bubble.raw_observations);
    console.groupEnd();
  });
  console.log("--- SUMMARY ---");
  console.log(`Total original observations hidden inside merged bubbles: ${totalMergedObservations}`);
  console.log(`Total points saved from rendering on map: ${totalMergedObservations - mergedBubbles.length}`);
  console.groupEnd();
  const categoryColors = {
    birds: { color: "#0ea5e9", fillColor: "#7dd3fc" },
    // sky-500, sky-300
    butterflies: { color: "#f97316", fillColor: "#fdba74" },
    // orange-500, orange-300
    dragonflies: { color: "#14b8a6", fillColor: "#5eead4" },
    // teal-500, teal-300
    arthropods: { color: "#dc2626", fillColor: "#fca5a5" },
    // red-600, red-300
    mammals: { color: "#a855f7", fillColor: "#d8b4fe" },
    // purple-500, purple-300
    plants: { color: "#65a30d", fillColor: "#bef264" },
    // lime-600, lime-300
    other: { color: "#6b7280", fillColor: "#d4d4d8" }
    // gray-500, gray-300
  };
  const getCategoryColor = (category) => {
    return categoryColors[category] || categoryColors.other;
  };
  const ringToLatLng = (ring) => ring.map(([lon, lat]) => [lat, lon]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full w-full overflow-hidden rounded-lg border bg-card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    MapContainer,
    {
      center,
      zoom: 7,
      scrollWheelZoom: true,
      preferCanvas: true,
      style: { height: "100%", width: "100%" },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          TileLayer,
          {
            attribution: "© OpenStreetMap",
            url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(PaneSetup, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(FitBounds, { obs: data }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ZoomTracker, { onZoom: setZoom }),
        baseAreaKeys.map((areaKey) => {
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
            interactive: false
          };
          return /* @__PURE__ */ jsxRuntimeExports.jsx(
            Polygon,
            {
              positions: rings.map(ringToLatLng),
              pathOptions,
              pane: "polygonPane"
            },
            areaKey
          );
        }),
        bubbles.map((bubble, i) => {
          const colors = getCategoryColor(bubble.category);
          const isSelected = selectedSpecies.size === 0 || selectedSpecies.has(bubble.raw_observations[0]?.species);
          return /* @__PURE__ */ jsxRuntimeExports.jsx(
            CircleMarker,
            {
              center: [bubble.lat, bubble.lng],
              radius: Math.min(5 + bubble.count * 2, 40),
              pathOptions: {
                color: colors.color,
                fillColor: colors.fillColor,
                fillOpacity: isSelected ? 0.6 : 0.15,
                weight: isSelected ? 2 : 1,
                opacity: isSelected ? 1 : 0.3
              },
              interactive: false
            },
            i
          );
        })
      ]
    }
  ) });
}
export {
  ObservationMap as O
};
