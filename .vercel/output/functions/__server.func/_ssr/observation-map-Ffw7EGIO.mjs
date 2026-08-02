import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L } from "../_libs/leaflet.mjs";
import { u as useObservations, d as getTaxaGroup, h as SURVEY_POLYGONS, i as translateSpeciesName, j as SURVEY_AREA_KEYS } from "./index-ByY-qZdo.mjs";
import { u as useI18n } from "./router-HU5iIjKZ.mjs";
import { M as MapContainer, T as TileLayer, G as GeoJSON, P as Polygon, a as Tooltip, C as CircleMarker, u as useMap, b as useMapEvents } from "../_libs/react-leaflet.mjs";
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
  const map = useMapEvents({
    zoomend: (e) => {
      console.log("🔍 ZOOM LEVEL CHANGED TO:", map.getZoom());
      onZoom(e.target.getZoom());
    }
  });
  return null;
}
const CLICK_PIXEL_THRESHOLD = 20;
function MapClickHandler({
  bubbles,
  zoom,
  onSelect
}) {
  useMapEvents({
    click: (e) => {
      if (zoom < 12) return;
      const map = e.target;
      const clickPoint = map.latLngToContainerPoint(e.latlng);
      let closestBubble = null;
      let closestDist = Infinity;
      for (const bubble of bubbles) {
        const bubblePoint = map.latLngToContainerPoint([bubble.lat, bubble.lng]);
        const dist = clickPoint.distanceTo(bubblePoint);
        if (dist <= CLICK_PIXEL_THRESHOLD && dist < closestDist) {
          closestDist = dist;
          closestBubble = bubble;
        }
      }
      if (closestBubble) {
        onSelect(closestBubble.observation_ids);
      }
    }
  });
  return null;
}
function ObservationMap({ data, selectedSpecies = /* @__PURE__ */ new Set() }) {
  const { filters, monitoringAreas, observations: allObservations } = useObservations();
  const { lang } = useI18n();
  const selectedAreas = new Set(filters.areas);
  const baseAreaKeys = SURVEY_AREA_KEYS.filter((k) => k !== "other_areas");
  const [zoom, setZoom] = reactExports.useState(7);
  const [selectedBubbleIds, setSelectedBubbleIds] = reactExports.useState(null);
  const canvasRenderer = reactExports.useMemo(() => L.canvas(), []);
  const observationsMap = reactExports.useMemo(
    () => new Map(allObservations.filter((o) => o.composite_id).map((o) => [o.composite_id, o])),
    [allObservations]
  );
  const visibleMonitoringAreas = reactExports.useMemo(
    () => monitoringAreas ? {
      ...monitoringAreas,
      features: monitoringAreas.features.filter(
        (feature) => filters.monitoringAreas.has(feature.properties.id)
      )
    } : null,
    [monitoringAreas, filters.monitoringAreas]
  );
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
        if (obs.composite_id) existing.observation_ids.push(obs.composite_id);
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
          }],
          observation_ids: obs.composite_id ? [obs.composite_id] : []
        });
      }
    }
    return Array.from(groups.values());
  }, [data]);
  const clickableBubbles = reactExports.useMemo(
    () => bubbles.filter(
      (b) => selectedSpecies.size === 0 || selectedSpecies.has(b.raw_observations[0]?.species)
    ),
    [bubbles, selectedSpecies]
  );
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
  const selectedObservations = reactExports.useMemo(() => {
    if (!selectedBubbleIds) return [];
    return selectedBubbleIds.map((id) => observationsMap.get(id)).filter((obs) => Boolean(obs));
  }, [selectedBubbleIds, observationsMap]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative h-full w-full overflow-hidden rounded-lg border bg-card", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
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
          /* @__PURE__ */ jsxRuntimeExports.jsx(ZoomTracker, { onZoom: setZoom }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(MapClickHandler, { bubbles: clickableBubbles, zoom, onSelect: setSelectedBubbleIds }),
          visibleMonitoringAreas && /* @__PURE__ */ jsxRuntimeExports.jsx(
            GeoJSON,
            {
              data: visibleMonitoringAreas,
              style: () => ({
                color: "#4b5563",
                fillColor: "#9ca3af",
                fillOpacity: 0.35,
                opacity: 1,
                weight: 3,
                interactive: true,
                renderer: canvasRenderer
              }),
              onEachFeature: (feature, layer) => {
                layer.bindTooltip(String(feature.properties?.name ?? "אזור ניטור"), {
                  sticky: true,
                  direction: "top",
                  opacity: 0.95
                });
              }
            },
            Array.from(filters.monitoringAreas).sort().join("|")
          ),
          baseAreaKeys.map((areaKey) => {
            const rings = SURVEY_POLYGONS[areaKey];
            if (!rings) return null;
            const isSelected = selectedAreas.has(areaKey);
            if (!isSelected) return null;
            const pathOptions = {
              color: "#4b5563",
              fillColor: "#9ca3af",
              fillOpacity: 0.35,
              weight: 3,
              opacity: 1,
              interactive: true
            };
            return /* @__PURE__ */ jsxRuntimeExports.jsx(
              Polygon,
              {
                positions: rings.map(ringToLatLng),
                pathOptions,
                renderer: canvasRenderer,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { sticky: true, direction: "top", opacity: 0.95, children: areaKey })
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
                interactive: false,
                renderer: canvasRenderer
              },
              i
            );
          })
        ]
      }
    ),
    selectedBubbleIds && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute top-0 right-0 h-full w-80 bg-white shadow-2xl z-[1000] p-4 overflow-y-auto flex flex-col gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-sm font-semibold", children: [
          "פרטי תצפית (",
          selectedObservations.length,
          ")"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => setSelectedBubbleIds(null),
            className: "rounded-md px-2 py-1 text-sm text-muted-foreground hover:bg-muted",
            children: "✕ סגור"
          }
        )
      ] }),
      selectedObservations.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "לא נמצאו פרטים עבור תצפית זו." }),
      selectedObservations.map((obs, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex flex-col gap-1 rounded-lg border p-3 text-sm shadow-sm",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center font-medium italic", children: lang === "he" ? translateSpeciesName(obs.scientific_name) : obs.scientific_name }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: "שם משתמש: " }),
              obs.user_login
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: "תאריך: " }),
              obs.observed_on
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: `inline-block w-fit rounded-full px-2 py-0.5 text-xs font-medium ${obs.source === "inaturalist" ? "bg-emerald-100 text-emerald-800" : "bg-blue-100 text-blue-800"}`,
                children: obs.source === "inaturalist" ? "iNaturalist" : "מנטר מקצועי"
              }
            ) }),
            obs.source === "inaturalist" && obs.source_url && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "a",
              {
                href: obs.source_url,
                target: "_blank",
                rel: "noopener noreferrer",
                className: "mt-1 inline-block rounded-md bg-emerald-600 px-3 py-1.5 text-center text-xs font-medium text-white hover:bg-emerald-700",
                children: "צפה ב-iNaturalist"
              }
            )
          ]
        },
        obs.composite_id ?? idx
      ))
    ] })
  ] });
}
export {
  ObservationMap as O
};
