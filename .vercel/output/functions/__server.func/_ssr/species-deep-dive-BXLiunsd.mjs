import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useObservations, s as speciesMap, T as TAXA_GROUP_KEYS, d as getTaxaGroup, o as observationMatchesSelectedAreas, e as getSpeciesClassification, g as getTaxonDetails, f as cn, b as translateMonth } from "./index-CC16MYGY.mjs";
import { u as useI18n } from "./router-vXyDQAMe.mjs";
import { O as ObservationMap } from "./observation-map-BTWk0vjf.mjs";
import "../_libs/papaparse.mjs";
import "../_libs/leaflet.mjs";
import { a as Search, M as Minus, A as ArrowUpLeft, b as ArrowUpRight, c as ArrowDownLeft, d as ArrowDownRight } from "../_libs/lucide-react.mjs";
import { R as ResponsiveContainer, L as LineChart, C as CartesianGrid, X as XAxis, Y as YAxis, T as Tooltip, a as Legend, b as Line } from "../_libs/recharts.mjs";
import "../_libs/turf__boolean-point-in-polygon.mjs";
import "../_libs/point-in-polygon-hao.mjs";
import "../_libs/robust-predicates.mjs";
import "../_libs/turf__invariant.mjs";
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
new Map(
  speciesMap.map((entry) => [entry.Scientific_Name, entry])
);
const SPECIES_MAP = new Map(
  speciesMap.map((entry) => [entry.Scientific_Name, entry])
);
new Map(SPECIES_MAP);
const Input = reactExports.forwardRef(
  ({ className, type, ...props }, ref) => {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        type,
        className: cn(
          "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        ),
        ref,
        ...props
      }
    );
  }
);
Input.displayName = "Input";
const CHIP_SPECIES_NAMES = new Set(
  speciesMap.filter((entry) => !entry.isGeneric).map((entry) => entry.Scientific_Name)
);
function getSeasonalStatus(records) {
  const months = /* @__PURE__ */ new Map();
  for (const record of records) {
    const month = Number(record.observed_on.split("/")[1]);
    if (month >= 1 && month <= 12) months.set(month, (months.get(month) ?? 0) + 1);
  }
  const peak = [...months.entries()].sort((a, b) => b[1] - a[1])[0];
  if (!peak || peak[1] / records.length < 0.3) return "יציב שנתית";
  if ([12, 1, 2].includes(peak[0])) return "חורף";
  if ([3, 4, 5].includes(peak[0])) return "אביב";
  if ([6, 7, 8].includes(peak[0])) return "קיץ";
  return "סתיו";
}
function getTopSpecies(data, prioritySpecies, priorityCategory) {
  const bySpecies = /* @__PURE__ */ new Map();
  for (const observation of data) {
    if (!observation.scientific_name || !CHIP_SPECIES_NAMES.has(observation.scientific_name)) continue;
    const records = bySpecies.get(observation.scientific_name) ?? [];
    records.push(observation);
    bySpecies.set(observation.scientific_name, records);
  }
  const insights = [...bySpecies.entries()].map(([scientificName, records]) => {
    const annual = /* @__PURE__ */ new Map();
    let research = 0;
    for (const record of records) {
      const year = Number(record.observed_on.split("/")[2]);
      if (!Number.isNaN(year)) annual.set(year, (annual.get(year) ?? 0) + 1);
      if (record.quality_grade === "research") research += 1;
    }
    const annualEntries = [...annual.entries()].sort((a, b) => a[0] - b[0]);
    const firstCount = annualEntries[0]?.[1] ?? 0;
    const lastCount = annualEntries.at(-1)?.[1] ?? 0;
    const trend = lastCount > firstCount ? "up" : lastCount < firstCount ? "down" : "stable";
    const metadata = SPECIES_MAP.get(scientificName);
    return {
      scientificName,
      hebrewName: metadata?.Hebrew_Name && metadata.Hebrew_Name !== "N/A" ? metadata.Hebrew_Name : scientificName,
      englishName: metadata?.English_Name && metadata.English_Name !== "N/A" ? metadata.English_Name : scientificName,
      observations: records.length,
      researchPct: research / records.length * 100,
      trend,
      annualBreakdown: annualEntries.map(([year, count]) => `${year}: ${count}`).join(", "),
      seasonalStatus: getSeasonalStatus(records)
    };
  });
  const byCount = (a, b) => b.observations - a.observations || a.hebrewName.localeCompare(b.hebrewName, "he");
  const selected = insights.filter((insight) => prioritySpecies.has(insight.scientificName)).sort(byCount);
  const category = priorityCategory ? insights.filter((insight) => !prioritySpecies.has(insight.scientificName) && getTaxaGroup(bySpecies.get(insight.scientificName)[0]) === priorityCategory).sort(byCount) : [];
  const remaining = insights.filter((insight) => !prioritySpecies.has(insight.scientificName) && !category.includes(insight)).sort(byCount);
  return [...selected, ...category, ...remaining].slice(0, 5);
}
function TrendIcon({ trend, rtl, title }) {
  const icon = trend === "stable" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { className: "h-4 w-4 text-orange-500", strokeWidth: 2.5 }) : trend === "up" ? rtl ? /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpLeft, { className: "h-4 w-4 text-emerald-600", strokeWidth: 2.5 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "h-4 w-4 text-emerald-600", strokeWidth: 2.5 }) : rtl ? /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowDownLeft, { className: "h-4 w-4 text-rose-600", strokeWidth: 2.5 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowDownRight, { className: "h-4 w-4 text-rose-600", strokeWidth: 2.5 });
  return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { title, children: icon });
}
function SpeciesInsightsTable({
  data,
  prioritySpecies,
  priorityCategory
}) {
  const { lang } = useI18n();
  const rows = reactExports.useMemo(
    () => getTopSpecies(data, prioritySpecies, priorityCategory),
    [data, prioritySpecies, priorityCategory]
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full rounded-lg border bg-card shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "h-full w-full table-fixed text-xs", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "h-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b bg-secondary/60 text-[10px] font-semibold text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "w-[30%] px-3 py-1 text-start", children: "שם המין" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "w-[15%] px-2 py-1 text-center", children: "מספר תצפיות" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "w-[20%] px-2 py-1 text-center", children: "מגמה שנתית" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "w-[17%] px-2 py-1 text-center", children: "דרגת מחקר" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "w-[18%] px-2 py-1 text-center", children: "עונה פעילה" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "h-[calc(100%-2rem)]", children: rows.map((row) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "h-1/5 border-b border-border/60 last:border-0 hover:bg-secondary/30", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "truncate px-3 py-1 align-middle text-start font-medium", children: lang === "he" ? row.hebrewName : row.englishName }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-2 py-1 text-center align-middle tabular-nums", children: row.observations.toLocaleString() }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-2 py-1 text-center align-middle", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendIcon, { trend: row.trend, rtl: lang === "he", title: row.annualBreakdown }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-2 py-1 text-center align-middle tabular-nums", children: [
        row.researchPct.toFixed(1),
        "%"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-2 py-1 text-center align-middle", children: row.seasonalStatus })
    ] }, row.scientificName)) })
  ] }) });
}
const SPECIES_PALETTE = [
  "#2563eb",
  "#dc2626",
  "#16a34a",
  "#9333ea",
  "#ea580c",
  "#0891b2",
  "#be185d",
  "#4f46e5",
  "#ca8a04",
  "#059669"
];
const BACKGROUND_COLOR = "#737373";
const HEBREW_CATEGORY_LABELS = {
  mammals: "יונקים",
  birds: "עופות",
  butterflies: "פרפרים",
  dragonflies: "שפיראים",
  arthropods: "פרוקי רגליים",
  plants: "צמחים",
  other: "שאר המינים"
};
const HEBREW_LETTER_REGEX$1 = /[א-ת]/;
function getSpeciesLabel$1(scientific_name, lang) {
  const entry = SPECIES_MAP.get(scientific_name);
  if (!entry) return scientific_name;
  if (lang === "he") {
    if (entry.Hebrew_Name && entry.Hebrew_Name !== "N/A" && HEBREW_LETTER_REGEX$1.test(entry.Hebrew_Name)) {
      return entry.Hebrew_Name;
    }
    return scientific_name;
  }
  if (entry.English_Name && entry.English_Name !== "N/A") return entry.English_Name;
  return scientific_name;
}
function DeepDiveTimeSeriesChart({ allObservations, category, selectedSpecies, categoryColor }) {
  const { lang } = useI18n();
  const { chartData, seriesKeys, seriesColors, seriesLabels } = reactExports.useMemo(() => {
    function parseSortKey(dateStr) {
      if (!dateStr || dateStr.length < 10) return null;
      const parts = dateStr.split("/");
      if (parts.length !== 3) return null;
      const monthNum = parseInt(parts[1], 10);
      const yearFull = parseInt(parts[2], 10);
      if (isNaN(monthNum) || monthNum < 1 || monthNum > 12 || isNaN(yearFull)) return null;
      const sortKey = yearFull * 100 + monthNum;
      const yearShort = parts[2].slice(-2);
      const label = `${translateMonth(monthNum, lang)}-${yearShort}`;
      return { sortKey, label };
    }
    const isAllSpecies = selectedSpecies.size === 0;
    const countsMap = /* @__PURE__ */ new Map();
    const FOCUS_KEY = "focus";
    const BG_KEY = "background";
    if (isAllSpecies) {
      for (const o of allObservations) {
        const parsed = parseSortKey(o.observed_on);
        if (!parsed) continue;
        const { sortKey, label } = parsed;
        const isFocus = !category || getTaxaGroup(o) === category;
        const seriesKey = isFocus ? FOCUS_KEY : BG_KEY;
        if (!countsMap.has(sortKey)) {
          countsMap.set(sortKey, { label, counts: /* @__PURE__ */ new Map() });
        }
        const entry = countsMap.get(sortKey);
        entry.counts.set(seriesKey, (entry.counts.get(seriesKey) ?? 0) + 1);
      }
      const allSortKeys = Array.from(countsMap.keys()).sort((a, b) => a - b);
      const chartData2 = allSortKeys.map((sk) => {
        const entry = countsMap.get(sk);
        return {
          monthYear: entry.label,
          [FOCUS_KEY]: entry.counts.get(FOCUS_KEY) ?? 0,
          [BG_KEY]: entry.counts.get(BG_KEY) ?? 0
        };
      });
      const focusLabel = category ? HEBREW_CATEGORY_LABELS[category] : "כל הקטגוריות";
      const bgLabel = "שאר הקטגוריות";
      return {
        chartData: chartData2,
        seriesKeys: [FOCUS_KEY, BG_KEY],
        seriesColors: { [FOCUS_KEY]: categoryColor, [BG_KEY]: BACKGROUND_COLOR },
        seriesLabels: { [FOCUS_KEY]: focusLabel, [BG_KEY]: bgLabel }
      };
    } else {
      const selectedSet = selectedSpecies;
      const categoryObs = category ? allObservations.filter((o) => getTaxaGroup(o) === category) : allObservations;
      for (const o of categoryObs) {
        const parsed = parseSortKey(o.observed_on);
        if (!parsed) continue;
        const { sortKey, label } = parsed;
        if (!selectedSet.has(o.scientific_name)) continue;
        const seriesKey = o.scientific_name;
        if (!countsMap.has(sortKey)) {
          countsMap.set(sortKey, { label, counts: /* @__PURE__ */ new Map() });
        }
        const entry = countsMap.get(sortKey);
        entry.counts.set(seriesKey, (entry.counts.get(seriesKey) ?? 0) + 1);
      }
      const speciesKeys = Array.from(selectedSet);
      const allKeys = speciesKeys;
      const allSortKeys = Array.from(countsMap.keys()).sort((a, b) => a - b);
      const chartData2 = allSortKeys.map((sk) => {
        const entry = countsMap.get(sk);
        const point = { monthYear: entry.label };
        for (const key of allKeys) {
          point[key] = entry.counts.get(key) ?? 0;
        }
        return point;
      });
      const seriesColors2 = {};
      const seriesLabels2 = {};
      speciesKeys.forEach((sci, i) => {
        seriesColors2[sci] = SPECIES_PALETTE[i % SPECIES_PALETTE.length];
        seriesLabels2[sci] = getSpeciesLabel$1(sci, lang);
      });
      return {
        chartData: chartData2,
        seriesKeys: allKeys,
        seriesColors: seriesColors2,
        seriesLabels: seriesLabels2
      };
    }
  }, [allObservations, category, selectedSpecies, categoryColor, lang]);
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
        formatter: (value, key) => [
          value,
          seriesLabels[key] || key
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Legend,
      {
        content: () => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs mt-1", children: [...new Set(seriesKeys)].map((key) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "inline-block w-3 h-0.5 rounded",
              style: { backgroundColor: seriesColors[key] }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-700", children: seriesLabels[key] || key })
        ] }, key)) })
      }
    ),
    [...new Set(seriesKeys)].map((key) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      Line,
      {
        type: "monotone",
        dataKey: key,
        stroke: seriesColors[key],
        strokeWidth: key === "background" ? 3 : 2,
        strokeDasharray: key === "background" ? "4 3" : void 0,
        connectNulls: true,
        dot: false,
        activeDot: { r: 4, stroke: seriesColors[key], fill: seriesColors[key] }
      },
      key
    ))
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
const CATEGORY_COLORS = {
  mammals: { active: "bg-purple-300 text-purple-900 border-purple-500 border-2 font-semibold", inactive: "bg-gray-50 text-gray-500 border-gray-300 font-normal hover:bg-gray-100" },
  birds: { active: "bg-sky-300 text-sky-900 border-sky-500 border-2 font-semibold", inactive: "bg-gray-50 text-gray-500 border-gray-300 font-normal hover:bg-gray-100" },
  butterflies: { active: "bg-orange-300 text-orange-900 border-orange-500 border-2 font-semibold", inactive: "bg-gray-50 text-gray-500 border-gray-300 font-normal hover:bg-gray-100" },
  dragonflies: { active: "bg-teal-300 text-teal-900 border-teal-500 border-2 font-semibold", inactive: "bg-gray-50 text-gray-500 border-gray-300 font-normal hover:bg-gray-100" },
  arthropods: { active: "bg-red-300 text-red-900 border-red-500 border-2 font-semibold", inactive: "bg-gray-50 text-gray-500 border-gray-300 font-normal hover:bg-gray-100" },
  plants: { active: "bg-lime-300 text-lime-900 border-lime-500 border-2 font-semibold", inactive: "bg-gray-50 text-gray-500 border-gray-300 font-normal hover:bg-gray-100" },
  other: { active: "bg-gray-300 text-gray-900 border-gray-500 border-2 font-semibold", inactive: "bg-gray-50 text-gray-500 border-gray-300 font-normal hover:bg-gray-100" }
};
const DEFAULT_COLOR = { active: "bg-slate-300 text-slate-900 border-slate-500 border-2 font-semibold", inactive: "bg-gray-50 text-gray-500 border-gray-300 font-normal hover:bg-gray-100" };
const CATEGORY_HEX = {
  mammals: "#a855f7",
  birds: "#0ea5e9",
  butterflies: "#f97316",
  dragonflies: "#14b8a6",
  arthropods: "#dc2626",
  plants: "#65a30d",
  other: "#6b7280"
};
const categories = TAXA_GROUP_KEYS;
const HEBREW_LETTER_REGEX = /[א-ת]/;
function getSpeciesLabel(entry, lang) {
  if (lang === "he") {
    if (entry.Hebrew_Name && entry.Hebrew_Name !== "N/A" && HEBREW_LETTER_REGEX.test(entry.Hebrew_Name)) {
      return entry.Hebrew_Name;
    }
    return entry.Scientific_Name;
  }
  if (entry.English_Name && entry.English_Name !== "N/A") return entry.English_Name;
  return entry.Scientific_Name;
}
function SpeciesDeepDive() {
  const { t, lang } = useI18n();
  const {
    observations,
    filters,
    deepDive,
    deepDiveActions,
    observationMonitoringAreaIndex
  } = useObservations();
  const { category, species, search } = deepDive;
  const activeCategory = category;
  const { setDeepDiveCategory, toggleDeepDiveSpecies, clearDeepDiveSpecies, setDeepDiveSearch } = deepDiveActions;
  const groupedSpecies = reactExports.useMemo(() => {
    const grouped = {
      mammals: [],
      birds: [],
      butterflies: [],
      dragonflies: [],
      arthropods: [],
      plants: [],
      other: []
    };
    const categoryMapping = {
      "יונקים": "mammals",
      "עופות": "birds",
      "פרפרים": "butterflies",
      "שפיראים": "dragonflies",
      "פרוקי רגליים": "arthropods",
      "צמחים": "plants",
      "שאר המינים": "other"
    };
    const uniqueSpecies = new Map(speciesMap.map((entry) => [entry.Scientific_Name, entry]));
    for (const entry of uniqueSpecies.values()) {
      if (entry.isGeneric) continue;
      const group = categoryMapping[entry.Category] || "other";
      grouped[group].push({ ...entry, parentCategory: group });
    }
    for (const group of categories) {
      grouped[group].sort((a, b) => a.Scientific_Name.localeCompare(b.Scientific_Name));
    }
    return grouped;
  }, []);
  const speciesList = reactExports.useMemo(() => {
    const all = Object.values(groupedSpecies).flat();
    const associated = activeCategory ? all.filter((sp) => sp.parentCategory === activeCategory) : all;
    if (!search.trim()) return associated;
    const q = search.trim().toLowerCase();
    return associated.filter(
      (sp) => sp.Scientific_Name.toLowerCase().includes(q) || sp.Hebrew_Name && sp.Hebrew_Name !== "N/A" && sp.Hebrew_Name.toLowerCase().includes(q) || sp.English_Name && sp.English_Name !== "N/A" && sp.English_Name.toLowerCase().includes(q)
    );
  }, [activeCategory, search, groupedSpecies]);
  const globallyFilteredObservations = reactExports.useMemo(() => {
    return observations.filter((o) => {
      if (filters.dateRange) {
        const ts = parseObsTimestamp(o.observed_on);
        if (isNaN(ts) || ts < filters.dateRange.start || ts > filters.dateRange.end) return false;
      }
      if (filters.researchOnly && o.quality_grade !== "research") return false;
      if (filters.time.size > 0) {
        if (!o.observed_on || o.observed_on.length < 10) return false;
        const parts = o.observed_on.split("/");
        if (parts.length !== 3) return false;
        const entry = filters.time.get(parts[2]);
        if (!entry || entry.size > 0 && !entry.has(parts[1])) return false;
      }
      if (filters.taxa.size > 0 && !filters.taxa.has(getTaxaGroup(o))) return false;
      if (filters.groups.size > 0 && (!o.user_category || !filters.groups.has(o.user_category))) return false;
      if (!observationMatchesSelectedAreas(o, filters.areas, filters.monitoringAreas, observationMonitoringAreaIndex)) return false;
      if (filters.speciesTypes.size > 0 && !filters.speciesTypes.has(getSpeciesClassification(o))) return false;
      return true;
    });
  }, [observations, filters, observationMonitoringAreaIndex]);
  const deepDiveFiltered = reactExports.useMemo(() => {
    return globallyFilteredObservations.filter((o) => {
      if (category && getTaxaGroup(o) !== category) return false;
      if (species.size > 0 && !species.has(o.scientific_name)) return false;
      return true;
    });
  }, [globallyFilteredObservations, category, species]);
  const summary = reactExports.useMemo(() => {
    const observers = /* @__PURE__ */ new Set();
    const speciesSet = /* @__PURE__ */ new Set();
    let unidentified = 0;
    for (const o of deepDiveFiltered) {
      if (o.user_login) observers.add(o.user_login);
      const details = getTaxonDetails(o.scientific_name, o.iconic_taxon_name, o.common_name);
      if (details.isGeneric) {
        unidentified++;
      } else if (o.scientific_name) {
        speciesSet.add(o.scientific_name);
      }
    }
    return { rows: deepDiveFiltered.length, observers: observers.size, species: speciesSet.size, unidentified };
  }, [deepDiveFiltered]);
  const categoryObservationCounts = reactExports.useMemo(() => {
    const counts = {
      mammals: 0,
      birds: 0,
      butterflies: 0,
      dragonflies: 0,
      arthropods: 0,
      plants: 0,
      other: 0
    };
    for (const o of globallyFilteredObservations) {
      const group = getTaxaGroup(o);
      counts[group] += 1;
    }
    return counts;
  }, [globallyFilteredObservations]);
  const speciesObservationCounts = reactExports.useMemo(() => {
    const counts = /* @__PURE__ */ new Map();
    for (const o of globallyFilteredObservations) {
      if (activeCategory && getTaxaGroup(o) !== activeCategory || !o.scientific_name) continue;
      counts.set(o.scientific_name, (counts.get(o.scientific_name) ?? 0) + 1);
    }
    return counts;
  }, [globallyFilteredObservations, activeCategory]);
  const tableSpecies = reactExports.useMemo(
    () => new Set(getTopSpecies(globallyFilteredObservations, species, activeCategory).map((entry) => entry.scientificName)),
    [globallyFilteredObservations, species, activeCategory]
  );
  const activeColors = activeCategory ? CATEGORY_COLORS[activeCategory] || DEFAULT_COLOR : DEFAULT_COLOR;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "flex h-full w-full flex-col overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "shrink-0 flex items-center min-h-[3.5rem] w-full px-4 py-0.5 gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 shrink-0", children: [
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
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg font-semibold tabular-nums leading-none", children: summary.unidentified.toLocaleString() }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground leading-tight", children: t("unidentified") })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-1 flex-wrap items-center justify-center gap-2", children: categories.map((cat) => {
        const colors = CATEGORY_COLORS[cat] || DEFAULT_COLOR;
        const isActive = category === cat;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => setDeepDiveCategory(category === cat ? null : cat),
            className: `shrink-0 inline-flex items-center gap-1 rounded-full border px-3 py-1 text-sm font-medium transition-all duration-200 ${isActive ? colors.active : colors.inactive}`,
            children: [
              t(`tg_${cat}`),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "opacity-60 text-[10px]", children: [
                "(",
                categoryObservationCounts[cat].toLocaleString(),
                ")"
              ] })
            ]
          },
          cat
        );
      }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "h-[8%] shrink-0 flex items-center gap-3 px-4 py-1.5 border-b", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative shrink-0 w-44", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute start-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            value: search,
            onChange: (e) => setDeepDiveSearch(e.target.value),
            placeholder: t("searchSpecies"),
            className: "ps-7 h-7 text-xs"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 overflow-x-auto scrollbar-hide flex flex-nowrap items-center gap-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: clearDeepDiveSpecies,
            className: `shrink-0 inline-flex items-center rounded-full border px-3 py-1 text-xs transition-all duration-200 ${species.size === 0 ? activeColors.active : activeColors.inactive}`,
            children: t("all")
          }
        ),
        speciesList.filter((sp) => !activeCategory || (speciesObservationCounts.get(sp.Scientific_Name) ?? 0) > 0).sort((a, b) => (speciesObservationCounts.get(b.Scientific_Name) ?? 0) - (speciesObservationCounts.get(a.Scientific_Name) ?? 0)).map((sp) => {
          const count = speciesObservationCounts.get(sp.Scientific_Name) ?? 0;
          const isSelected = species.has(sp.Scientific_Name);
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => toggleDeepDiveSpecies(sp.Scientific_Name),
              title: sp.Scientific_Name,
              className: `shrink-0 inline-flex items-center rounded-full border px-2.5 py-1 text-xs transition-all duration-200 whitespace-nowrap ${isSelected ? activeColors.active : activeColors.inactive}`,
              children: [
                getSpeciesLabel(sp, lang),
                " (",
                count.toLocaleString(),
                ")"
              ]
            },
            sp.Scientific_Name
          );
        })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-[50%] shrink-0 px-2 pt-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full w-full rounded-lg shadow-sm overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      ObservationMap,
      {
        data: globallyFilteredObservations.filter((o) => !category || getTaxaGroup(o) === category),
        selectedSpecies: species
      }
    ) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-h-0 px-2 pt-2 pb-1 grid grid-cols-1 lg:grid-cols-2 gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        SpeciesInsightsTable,
        {
          data: globallyFilteredObservations,
          prioritySpecies: species,
          priorityCategory: activeCategory
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        DeepDiveTimeSeriesChart,
        {
          allObservations: globallyFilteredObservations,
          category: activeCategory,
          selectedSpecies: tableSpecies,
          categoryColor: activeCategory ? CATEGORY_HEX[activeCategory] : "#64748b"
        }
      )
    ] })
  ] });
}
export {
  SpeciesDeepDive
};
