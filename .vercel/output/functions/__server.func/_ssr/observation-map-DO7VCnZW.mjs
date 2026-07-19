import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L } from "../_libs/leaflet.mjs";
import { u as useObservations, S as SURVEY_AREA_KEYS, g as getTaxaGroup, A as AREA_COLORS, h as SURVEY_POLYGONS } from "./index-DpIpUFdL.mjs";
import { M as MapContainer, T as TileLayer, P as Polygon, C as CircleMarker, u as useMap } from "../_libs/react-leaflet.mjs";
function FitBounds({ obs }) {
  const map = useMap();
  reactExports.useEffect(() => {
    if (obs.length === 0) return;
    const bounds = L.latLngBounds(obs.map((o) => [o.latitude, o.longitude]));
    map.fitBounds(bounds, { padding: [50, 50], maxZoom: 14, animate: true });
  }, [obs, map]);
  return null;
}
function ObservationMap({ data }) {
  const { filters } = useObservations();
  const selectedAreas = new Set(filters.areas);
  const hasOtherAreas = selectedAreas.has("other_areas");
  const baseAreaKeys = SURVEY_AREA_KEYS.filter((k) => k !== "other_areas");
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
    mammals: { color: "#a855f7", fillColor: "#d8b4fe" },
    // purple-500, purple-300
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
        /* @__PURE__ */ jsxRuntimeExports.jsx(FitBounds, { obs: data }),
        baseAreaKeys.map((areaKey) => {
          const rings = SURVEY_POLYGONS[areaKey];
          if (!rings) return null;
          const isSelected = selectedAreas.has(areaKey);
          if (!isSelected && !hasOtherAreas) return null;
          const color = isSelected ? AREA_COLORS[areaKey] : "#4b5563";
          return /* @__PURE__ */ jsxRuntimeExports.jsx(
            Polygon,
            {
              positions: rings.map(ringToLatLng),
              pathOptions: {
                color,
                fillColor: isSelected ? AREA_COLORS[areaKey] : "#9ca3af",
                fillOpacity: isSelected ? 0.2 : 0.15,
                weight: isSelected ? 2 : 4,
                opacity: 0.8,
                dashArray: isSelected ? void 0 : "10, 10",
                interactive: false
              }
            },
            areaKey
          );
        }),
        bubbles.map((bubble, i) => {
          const colors = getCategoryColor(bubble.category);
          return /* @__PURE__ */ jsxRuntimeExports.jsx(
            CircleMarker,
            {
              center: [bubble.lat, bubble.lng],
              radius: Math.min(5 + bubble.count * 2, 40),
              pathOptions: {
                color: colors.color,
                fillColor: colors.fillColor,
                fillOpacity: 0.6,
                weight: 1
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
