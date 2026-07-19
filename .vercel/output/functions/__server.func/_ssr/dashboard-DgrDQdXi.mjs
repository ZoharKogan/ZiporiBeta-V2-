import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useObservations, g as getTaxaGroup, c as getObservationArea, d as getSpeciesClassification, t as translateTaxa, a as translateMonth, b as translateGroupName } from "./index-DpIpUFdL.mjs";
import { u as useI18n } from "./router-BBaajQ2s.mjs";
import { O as ObservationMap } from "./observation-map-DO7VCnZW.mjs";
import { M as MetricsTable } from "./metrics-table-TmvPV5tC.mjs";
import "../_libs/papaparse.mjs";
import "../_libs/leaflet.mjs";
import { R as ResponsiveContainer, L as LineChart, C as CartesianGrid, X as XAxis, Y as YAxis, T as Tooltip, a as Legend, b as Line } from "../_libs/recharts.mjs";
import "../_libs/radix-ui__react-tabs.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__react-roving-focus.mjs";
import "../_libs/radix-ui__react-collection.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/radix-ui__react-direction.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/radix-ui__react-slider.mjs";
import "../_libs/radix-ui__number.mjs";
import "../_libs/radix-ui__react-use-previous.mjs";
import "../_libs/radix-ui__react-use-size.mjs";
import "../_libs/lucide-react.mjs";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/isbot.mjs";
import "../_libs/react-leaflet.mjs";
import "../_libs/react-leaflet__core.mjs";
import "../_libs/lodash.mjs";
import "../_libs/tiny-invariant.mjs";
import "../_libs/react-is.mjs";
import "../_libs/d3-shape.mjs";
import "../_libs/d3-path.mjs";
import "../_libs/react-smooth.mjs";
import "../_libs/prop-types.mjs";
import "../_libs/fast-equals.mjs";
import "../_libs/victory-vendor.mjs";
import "../_libs/d3-scale.mjs";
import "../_libs/internmap.mjs";
import "../_libs/d3-array.mjs";
import "../_libs/d3-time-format.mjs";
import "../_libs/d3-time.mjs";
import "../_libs/d3-interpolate.mjs";
import "../_libs/d3-color.mjs";
import "../_libs/d3-format.mjs";
import "../_libs/recharts-scale.mjs";
import "../_libs/decimal.js-light.mjs";
import "../_libs/eventemitter3.mjs";
function TaxaFilterBar() {
  const { filters, setFilters } = useObservations();
  const { lang } = useI18n();
  const toggleTaxa = (key) => {
    setFilters((prev) => {
      const next = new Set(prev.taxa);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return { ...prev, taxa: next };
    });
  };
  const taxaButtons = [
    { key: "birds", label: "עופות", activeColor: "bg-sky-300 text-sky-900 border-sky-500 border-2 font-semibold", inactiveColor: "bg-gray-50 text-gray-500 border-gray-300 font-normal hover:bg-gray-100" },
    { key: "butterflies", label: "פרפרים", activeColor: "bg-orange-300 text-orange-900 border-orange-500 border-2 font-semibold", inactiveColor: "bg-gray-50 text-gray-500 border-gray-300 font-normal hover:bg-gray-100" },
    { key: "dragonflies", label: "שפיראים", activeColor: "bg-teal-300 text-teal-900 border-teal-500 border-2 font-semibold", inactiveColor: "bg-gray-50 text-gray-500 border-gray-300 font-normal hover:bg-gray-100" },
    { key: "mammals", label: "יונקים", activeColor: "bg-purple-300 text-purple-900 border-purple-500 border-2 font-semibold", inactiveColor: "bg-gray-50 text-gray-500 border-gray-300 font-normal hover:bg-gray-100" },
    { key: "other", label: "שאר המינים", activeColor: "bg-gray-300 text-gray-900 border-gray-500 border-2 font-semibold", inactiveColor: "bg-gray-50 text-gray-500 border-gray-300 font-normal hover:bg-gray-100" }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2 overflow-x-auto scrollbar-hide", children: taxaButtons.map(({ key, label, activeColor, inactiveColor }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    "button",
    {
      type: "button",
      onClick: () => toggleTaxa(key),
      className: `shrink-0 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm font-medium transition-all duration-200 ${filters.taxa.has(key) ? activeColor : inactiveColor}`,
      children: translateTaxa(label, lang)
    },
    key
  )) });
}
const GROUP_CONFIG = [
  { key: "community", color: "#000000", shape: "circle" },
  { key: "student", color: "#4A4A4A", shape: "cross" },
  { key: "ציבור רחב", color: "#B0B0B0", shape: "triangle" }
];
const GROUP_ORDER = GROUP_CONFIG.map((g) => g.key);
function getGroupSlot(rawKey) {
  const idx = GROUP_ORDER.indexOf(rawKey);
  return idx === -1 ? GROUP_CONFIG.length - 1 : idx;
}
function CircleDot(props) {
  const { cx = 0, cy = 0, stroke, r = 4 } = props;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx, cy, r, stroke, strokeWidth: 2, fill: stroke });
}
function CrossDot(props) {
  const { cx = 0, cy = 0, stroke } = props;
  const s = 4;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: cx - s, y1: cy - s, x2: cx + s, y2: cy + s, stroke, strokeWidth: 2.5 }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: cx + s, y1: cy - s, x2: cx - s, y2: cy + s, stroke, strokeWidth: 2.5 })
  ] });
}
function TriangleDot(props) {
  const { cx = 0, cy = 0, stroke } = props;
  const s = 5;
  const points = `${cx},${cy - s} ${cx - s},${cy + s} ${cx + s},${cy + s}`;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("polygon", { points, stroke, strokeWidth: 1.5, fill: stroke });
}
const DOT_RENDERERS = [CircleDot, CrossDot, TriangleDot];
const LEGEND_SYMBOLS = ["●", "×", "▲"];
function CustomLegend({ groups, lang }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs mt-1", children: groups.map((rawKey) => {
    const slot = getGroupSlot(rawKey);
    const cfg = GROUP_CONFIG[slot] ?? GROUP_CONFIG[GROUP_CONFIG.length - 1];
    const symbol = LEGEND_SYMBOLS[slot] ?? LEGEND_SYMBOLS[LEGEND_SYMBOLS.length - 1];
    const label = translateGroupName(rawKey, lang);
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1", style: { color: cfg.color }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontWeight: 700 }, children: symbol }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "#374151" }, children: label })
    ] }, rawKey);
  }) });
}
function shouldShowDot(index, total) {
  if (total === 0) return false;
  const interval = Math.max(1, Math.round(total / 7));
  return index % interval === 0;
}
function TimeSeriesChart({ data }) {
  const { lang } = useI18n();
  const { rawCounts, allSortKeys, allGroups } = reactExports.useMemo(() => {
    const rawCounts2 = /* @__PURE__ */ new Map();
    const allGroups2 = /* @__PURE__ */ new Set();
    for (const o of data) {
      const d = o.observed_on;
      if (!d || d.length < 10) continue;
      const parts = d.split("/");
      if (parts.length !== 3) continue;
      const monthNum = parseInt(parts[1], 10);
      const yearFull = parseInt(parts[2], 10);
      if (isNaN(monthNum) || monthNum < 1 || monthNum > 12 || isNaN(yearFull)) continue;
      const sortKey = yearFull * 100 + monthNum;
      const yearShort = parts[2].slice(-2);
      const label = `${translateMonth(monthNum, lang)}-${yearShort}`;
      const group = o.user_category || "ציבור רחב";
      allGroups2.add(group);
      if (!rawCounts2.has(sortKey)) {
        rawCounts2.set(sortKey, { label, counts: /* @__PURE__ */ new Map() });
      }
      const entry = rawCounts2.get(sortKey);
      entry.counts.set(group, (entry.counts.get(group) ?? 0) + 1);
    }
    const allSortKeys2 = Array.from(rawCounts2.keys()).sort((a, b) => a - b);
    return { rawCounts: rawCounts2, allSortKeys: allSortKeys2, allGroups: Array.from(allGroups2) };
  }, [data, lang]);
  const chartData = reactExports.useMemo(() => {
    return allSortKeys.map((sortKey) => {
      const entry = rawCounts.get(sortKey);
      const point = { monthYear: entry.label, sortKey };
      for (const group of allGroups) {
        point[group] = entry.counts.get(group) ?? 0;
      }
      return point;
    });
  }, [rawCounts, allSortKeys, allGroups]);
  const sortedGroups = reactExports.useMemo(
    () => [...allGroups].sort((a, b) => getGroupSlot(a) - getGroupSlot(b)),
    [allGroups]
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-hidden rounded-lg border bg-card h-full flex flex-col", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-2 pt-2 pb-1 flex-1 min-h-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(LineChart, { data: chartData, margin: { top: 4, right: 8, bottom: 4, left: 4 }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "#E5E7EB" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      XAxis,
      {
        dataKey: "monthYear",
        minTickGap: 70,
        interval: "preserveStartEnd",
        tick: { fontSize: 10, dy: 8 },
        height: 48
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { tick: { fontSize: 10 }, width: 44, tickCount: 7 }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Tooltip,
      {
        formatter: (value, rawKey) => [
          value,
          translateGroupName(rawKey, lang)
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Legend, { content: () => /* @__PURE__ */ jsxRuntimeExports.jsx(CustomLegend, { groups: sortedGroups, lang }) }),
    sortedGroups.map((rawKey) => {
      const slot = getGroupSlot(rawKey);
      const cfg = GROUP_CONFIG[slot] ?? GROUP_CONFIG[GROUP_CONFIG.length - 1];
      const DotRenderer = DOT_RENDERERS[slot] ?? DOT_RENDERERS[DOT_RENDERERS.length - 1];
      const total = chartData.length;
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        Line,
        {
          type: "monotone",
          dataKey: rawKey,
          stroke: cfg.color,
          strokeWidth: 1.5,
          connectNulls: true,
          dot: (props) => {
            if (!shouldShowDot(props.index ?? 0, total)) return /* @__PURE__ */ jsxRuntimeExports.jsx("g", {}, props.index);
            return /* @__PURE__ */ jsxRuntimeExports.jsx(DotRenderer, { ...props, stroke: cfg.color });
          },
          activeDot: { r: 6, stroke: cfg.color, fill: cfg.color }
        },
        rawKey
      );
    })
  ] }) }) }) });
}
function parseObsTimestamp(dateStr) {
  if (!dateStr || dateStr.length < 10) return NaN;
  const parts = dateStr.split("/");
  if (parts.length !== 3) return NaN;
  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1;
  const year = parseInt(parts[2], 10);
  if (isNaN(day) || isNaN(month) || isNaN(year)) return NaN;
  return new Date(year, month, day).getTime();
}
function areaMatches(selectedAreas, area) {
  if (selectedAreas.size === 0) return true;
  if (area === null) return selectedAreas.has("other_areas");
  return selectedAreas.has(area);
}
function Dashboard() {
  const { t, lang } = useI18n();
  const { observations, filters } = useObservations();
  const filtered = reactExports.useMemo(() => {
    return observations.filter((o) => {
      if (filters.dateRange) {
        const ts = parseObsTimestamp(o.observed_on);
        if (isNaN(ts) || ts < filters.dateRange.start || ts > filters.dateRange.end) {
          return false;
        }
      }
      if (filters.researchOnly) {
        if (!o.quality_grade || o.quality_grade !== "research") {
          return false;
        }
      }
      if (filters.time.size > 0) {
        if (!o.observed_on || o.observed_on.length < 10) {
          return false;
        }
        const parts = o.observed_on.split("/");
        if (parts.length !== 3) {
          return false;
        }
        const year = parts[2];
        const month = parts[1];
        const entry = filters.time.get(year);
        if (!entry) {
          return false;
        }
        if (entry.size > 0 && !entry.has(month)) {
          return false;
        }
      }
      if (filters.taxa.size > 0) {
        const tg = getTaxaGroup(o);
        if (!filters.taxa.has(tg)) {
          return false;
        }
      }
      if (filters.groups.size > 0) {
        if (!o.user_category) {
          return false;
        }
        if (!filters.groups.has(o.user_category)) {
          return false;
        }
      }
      if (filters.areas.size > 0) {
        const area = getObservationArea(o.latitude, o.longitude);
        if (!areaMatches(filters.areas, area)) {
          return false;
        }
      }
      if (filters.speciesTypes.size > 0) {
        const type = getSpeciesClassification(o);
        if (!filters.speciesTypes.has(type)) {
          return false;
        }
      }
      return true;
    });
  }, [observations, filters]);
  const summary = reactExports.useMemo(() => {
    const observers = /* @__PURE__ */ new Set();
    const species = /* @__PURE__ */ new Set();
    for (const o of filtered) {
      if (o.user_login) observers.add(o.user_login);
      if (o.scientific_name) species.add(o.scientific_name);
    }
    return { rows: filtered.length, observers: observers.size, species: species.size };
  }, [filtered]);
  const chartData = reactExports.useMemo(() => {
    return observations.filter((o) => {
      if (filters.dateRange) {
        const ts = parseObsTimestamp(o.observed_on);
        if (isNaN(ts) || ts < filters.dateRange.start || ts > filters.dateRange.end) {
          return false;
        }
      }
      if (filters.researchOnly) {
        if (!o.quality_grade || o.quality_grade !== "research") {
          return false;
        }
      }
      if (filters.time.size > 0) {
        if (!o.observed_on || o.observed_on.length < 10) {
          return false;
        }
        const parts = o.observed_on.split("/");
        if (parts.length !== 3) {
          return false;
        }
        const year = parts[2];
        const month = parts[1];
        const entry = filters.time.get(year);
        if (!entry) {
          return false;
        }
        if (entry.size > 0 && !entry.has(month)) {
          return false;
        }
      }
      if (filters.taxa.size > 0) {
        const tg = getTaxaGroup(o);
        if (!filters.taxa.has(tg)) {
          return false;
        }
      }
      if (filters.areas.size > 0) {
        const area = getObservationArea(o.latitude, o.longitude);
        if (!areaMatches(filters.areas, area)) {
          return false;
        }
      }
      if (filters.speciesTypes.size > 0) {
        const type = getSpeciesClassification(o);
        if (!filters.speciesTypes.has(type)) {
          return false;
        }
      }
      return true;
    });
  }, [observations, filters]);
  const metricsData = reactExports.useMemo(() => {
    return observations.filter((o) => {
      if (filters.dateRange) {
        const ts = parseObsTimestamp(o.observed_on);
        if (isNaN(ts) || ts < filters.dateRange.start || ts > filters.dateRange.end) {
          return false;
        }
      }
      if (filters.researchOnly) {
        if (!o.quality_grade || o.quality_grade !== "research") {
          return false;
        }
      }
      if (filters.time.size > 0) {
        if (!o.observed_on || o.observed_on.length < 10) {
          return false;
        }
        const parts = o.observed_on.split("/");
        if (parts.length !== 3) {
          return false;
        }
        const year = parts[2];
        const month = parts[1];
        const entry = filters.time.get(year);
        if (!entry) {
          return false;
        }
        if (entry.size > 0 && !entry.has(month)) {
          return false;
        }
      }
      if (filters.taxa.size > 0) {
        const tg = getTaxaGroup(o);
        if (!filters.taxa.has(tg)) {
          return false;
        }
      }
      if (filters.areas.size > 0) {
        const area = getObservationArea(o.latitude, o.longitude);
        if (!areaMatches(filters.areas, area)) {
          return false;
        }
      }
      if (filters.speciesTypes.size > 0) {
        const type = getSpeciesClassification(o);
        if (!filters.speciesTypes.has(type)) {
          return false;
        }
      }
      return true;
    });
  }, [observations, filters]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "flex h-full w-full flex-col overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative shrink-0 flex items-center min-h-[3.5rem] w-full px-4 py-0.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg font-semibold tabular-nums leading-none", children: summary.rows.toLocaleString() }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground leading-tight", children: t("totalRows") })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg font-semibold tabular-nums leading-none", children: summary.observers.toLocaleString() }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground leading-tight", children: t("uniqueObservers") })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg font-semibold tabular-nums leading-none", children: summary.species.toLocaleString() }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground leading-tight", children: t("uniqueSpecies") })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute left-1/2 -translate-x-1/2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TaxaFilterBar, {}) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-[58%] shrink-0 px-2 pt-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full w-full rounded-lg shadow-sm overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ObservationMap, { data: filtered }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-h-0 px-2 pt-2 pb-1 grid grid-cols-1 lg:grid-cols-2 gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(MetricsTable, { data: metricsData }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TimeSeriesChart, { data: chartData })
    ] })
  ] });
}
export {
  Dashboard
};
