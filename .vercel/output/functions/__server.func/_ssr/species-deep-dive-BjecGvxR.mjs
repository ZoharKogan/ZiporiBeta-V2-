import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useObservations, T as TAXA_GROUP_KEYS, s as speciesMap, g as getTaxaGroup, e as cn, a as translateMonth } from "./index-DpIpUFdL.mjs";
import { u as useI18n } from "./router-BBaajQ2s.mjs";
import { O as ObservationMap } from "./observation-map-DO7VCnZW.mjs";
import { M as MetricsTable } from "./metrics-table-TmvPV5tC.mjs";
import "../_libs/papaparse.mjs";
import "../_libs/leaflet.mjs";
import { a as Search } from "../_libs/lucide-react.mjs";
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
const HEBREW_LETTER_REGEX$1 = /[א-ת]/;
function getSpeciesLabel$1(scientific_name, lang) {
  const entry = Object.values(speciesMap).flat().find((e) => e.Scientific_Name === scientific_name);
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
        const isFocus = getTaxaGroup(o) === category;
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
      const focusLabel = category;
      const bgLabel = lang === "he" ? "שאר הקטגוריות" : "All Others";
      return {
        chartData: chartData2,
        seriesKeys: [FOCUS_KEY, BG_KEY],
        seriesColors: { [FOCUS_KEY]: categoryColor, [BG_KEY]: BACKGROUND_COLOR },
        seriesLabels: { [FOCUS_KEY]: focusLabel, [BG_KEY]: bgLabel }
      };
    } else {
      const selectedSet = selectedSpecies;
      const categoryObs = allObservations.filter((o) => getTaxaGroup(o) === category);
      for (const o of categoryObs) {
        const parsed = parseSortKey(o.observed_on);
        if (!parsed) continue;
        const { sortKey, label } = parsed;
        const seriesKey = selectedSet.has(o.scientific_name) ? o.scientific_name : BG_KEY;
        if (!countsMap.has(sortKey)) {
          countsMap.set(sortKey, { label, counts: /* @__PURE__ */ new Map() });
        }
        const entry = countsMap.get(sortKey);
        entry.counts.set(seriesKey, (entry.counts.get(seriesKey) ?? 0) + 1);
      }
      const speciesKeys = Array.from(selectedSet);
      const allKeys = [...speciesKeys, BG_KEY];
      const allSortKeys = Array.from(countsMap.keys()).sort((a, b) => a - b);
      const chartData2 = allSortKeys.map((sk) => {
        const entry = countsMap.get(sk);
        const point = { monthYear: entry.label };
        for (const key of allKeys) {
          point[key] = entry.counts.get(key) ?? 0;
        }
        return point;
      });
      const seriesColors2 = { [BG_KEY]: BACKGROUND_COLOR };
      const seriesLabels2 = {
        [BG_KEY]: lang === "he" ? "שאר המינים בקטגוריה" : "Other species in category"
      };
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
        content: () => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs mt-1", children: seriesKeys.map((key) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1", children: [
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
    seriesKeys.map((key) => /* @__PURE__ */ jsxRuntimeExports.jsx(
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
const CATEGORY_COLORS = {
  birds: { active: "bg-sky-300 text-sky-900 border-sky-500 border-2 font-semibold", inactive: "bg-gray-50 text-gray-500 border-gray-300 font-normal hover:bg-gray-100" },
  butterflies: { active: "bg-orange-300 text-orange-900 border-orange-500 border-2 font-semibold", inactive: "bg-gray-50 text-gray-500 border-gray-300 font-normal hover:bg-gray-100" },
  dragonflies: { active: "bg-teal-300 text-teal-900 border-teal-500 border-2 font-semibold", inactive: "bg-gray-50 text-gray-500 border-gray-300 font-normal hover:bg-gray-100" },
  mammals: { active: "bg-purple-300 text-purple-900 border-purple-500 border-2 font-semibold", inactive: "bg-gray-50 text-gray-500 border-gray-300 font-normal hover:bg-gray-100" },
  other: { active: "bg-gray-300 text-gray-900 border-gray-500 border-2 font-semibold", inactive: "bg-gray-50 text-gray-500 border-gray-300 font-normal hover:bg-gray-100" }
};
const DEFAULT_COLOR = { active: "bg-slate-300 text-slate-900 border-slate-500 border-2 font-semibold", inactive: "bg-gray-50 text-gray-500 border-gray-300 font-normal hover:bg-gray-100" };
const CATEGORY_HEX = {
  birds: "#0ea5e9",
  butterflies: "#f97316",
  dragonflies: "#14b8a6",
  mammals: "#a855f7",
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
  const { observations, deepDive, deepDiveActions } = useObservations();
  const { category, species, search } = deepDive;
  const { setDeepDiveCategory, toggleDeepDiveSpecies, clearDeepDiveSpecies, setDeepDiveSearch } = deepDiveActions;
  reactExports.useEffect(() => {
    if (!category && categories.length > 0) {
      setDeepDiveCategory(categories[0]);
    }
  }, [category, setDeepDiveCategory]);
  const groupedSpecies = reactExports.useMemo(() => {
    const grouped = {
      birds: [],
      butterflies: [],
      dragonflies: [],
      mammals: [],
      other: []
    };
    const categoryMapping = {
      "עופות": "birds",
      "יונקים": "mammals",
      "פרפרים": "butterflies",
      "שפיראים": "dragonflies",
      "חרקים אחרים": "other",
      "שאר המינים": "other"
    };
    for (const entry of speciesMap) {
      const group = categoryMapping[entry.Category] || "other";
      grouped[group].push(entry);
    }
    for (const group of categories) {
      grouped[group].sort((a, b) => a.Scientific_Name.localeCompare(b.Scientific_Name));
    }
    return grouped;
  }, []);
  const speciesList = reactExports.useMemo(() => {
    if (!category) return [];
    const all = groupedSpecies[category] || [];
    if (!search.trim()) return all;
    const q = search.trim().toLowerCase();
    return all.filter(
      (sp) => sp.Scientific_Name.toLowerCase().includes(q) || sp.Hebrew_Name !== "N/A" && sp.Hebrew_Name.toLowerCase().includes(q) || sp.English_Name !== "N/A" && sp.English_Name.toLowerCase().includes(q)
    );
  }, [category, search, groupedSpecies]);
  const deepDiveFiltered = reactExports.useMemo(() => {
    if (!category) return [];
    return observations.filter((o) => {
      if (getTaxaGroup(o) !== category) return false;
      if (species.size > 0 && !species.has(o.scientific_name)) return false;
      return true;
    });
  }, [observations, category, species]);
  const summary = reactExports.useMemo(() => {
    const observers = /* @__PURE__ */ new Set();
    const speciesSet = /* @__PURE__ */ new Set();
    for (const o of deepDiveFiltered) {
      if (o.user_login) observers.add(o.user_login);
      if (o.scientific_name) speciesSet.add(o.scientific_name);
    }
    return { rows: deepDiveFiltered.length, observers: observers.size, species: speciesSet.size };
  }, [deepDiveFiltered]);
  const activeCategory = category;
  const activeColors = activeCategory ? CATEGORY_COLORS[activeCategory] || DEFAULT_COLOR : DEFAULT_COLOR;
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
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute left-1/2 -translate-x-1/2 flex items-center gap-2 overflow-x-auto scrollbar-hide", children: categories.map((cat) => {
        const colors = CATEGORY_COLORS[cat] || DEFAULT_COLOR;
        const isActive = category === cat;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => setDeepDiveCategory(cat),
            className: `shrink-0 inline-flex items-center gap-1 rounded-full border px-3 py-1 text-sm font-medium transition-all duration-200 ${isActive ? colors.active : colors.inactive}`,
            children: [
              t(`tg_${cat}`),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "opacity-60 text-[10px]", children: [
                "(",
                (groupedSpecies[cat] || []).length,
                ")"
              ] })
            ]
          },
          cat
        );
      }) })
    ] }),
    category && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "h-[8%] shrink-0 flex items-center gap-3 px-4 py-1.5 border-b", children: [
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
        speciesList.map((sp) => {
          const isSelected = species.has(sp.Scientific_Name);
          return /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => toggleDeepDiveSpecies(sp.Scientific_Name),
              title: sp.Scientific_Name,
              className: `shrink-0 inline-flex items-center rounded-full border px-2.5 py-1 text-xs transition-all duration-200 whitespace-nowrap ${isSelected ? activeColors.active : activeColors.inactive}`,
              children: getSpeciesLabel(sp, lang)
            },
            sp.Scientific_Name
          );
        })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-[52%] shrink-0 px-2 pt-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full w-full rounded-lg shadow-sm overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ObservationMap, { data: deepDiveFiltered }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-h-0 px-2 pt-2 pb-1 grid grid-cols-1 lg:grid-cols-2 gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(MetricsTable, { data: deepDiveFiltered }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        DeepDiveTimeSeriesChart,
        {
          allObservations: observations,
          category: activeCategory || "other",
          selectedSpecies: species,
          categoryColor: activeCategory ? CATEGORY_HEX[activeCategory] : "#64748b"
        }
      )
    ] })
  ] });
}
export {
  SpeciesDeepDive
};
