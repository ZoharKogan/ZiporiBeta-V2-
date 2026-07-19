import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useI18n } from "./router-BBaajQ2s.mjs";
import { b as translateGroupName, f as classifySpecies } from "./index-DpIpUFdL.mjs";
function computeRow(records) {
  const observations = records.length;
  if (observations === 0) {
    return { daysMonitoring: 0, observations: 0, qualityPct: 0, distinctSpecies: 0, invasiveSpecies: 0, rareSpecies: 0, monitoringRate: 0 };
  }
  const uniqueDates = /* @__PURE__ */ new Set();
  const species = /* @__PURE__ */ new Set();
  const invasiveSpeciesSet = /* @__PURE__ */ new Set();
  const rareSpeciesSet = /* @__PURE__ */ new Set();
  let research = 0;
  for (const r of records) {
    uniqueDates.add(r.observed_on);
    if (r.scientific_name) {
      species.add(r.scientific_name);
      const status = classifySpecies(r.scientific_name);
      if (status === "invasive") {
        invasiveSpeciesSet.add(r.scientific_name);
      }
      if (status === "rare") {
        rareSpeciesSet.add(r.scientific_name);
      }
    }
    if (r.quality_grade === "research") research++;
  }
  const daysMonitoring = uniqueDates.size;
  return {
    daysMonitoring,
    observations,
    qualityPct: research / observations * 100,
    distinctSpecies: species.size,
    invasiveSpecies: invasiveSpeciesSet.size,
    rareSpecies: rareSpeciesSet.size,
    monitoringRate: daysMonitoring > 0 ? observations / daysMonitoring : 0
  };
}
function MetricsTable({
  data
}) {
  const { t, lang } = useI18n();
  const rows = reactExports.useMemo(() => {
    const grouped = /* @__PURE__ */ new Map();
    for (const o of data) {
      const category = o.user_category || "ציבור רחב";
      if (!grouped.has(category)) {
        grouped.set(category, []);
      }
      grouped.get(category).push(o);
    }
    if (!grouped.has("מומחים") && !grouped.has("experts")) {
      grouped.set("מומחים", []);
    }
    const order = ["קהילה", "community", "מומחים", "experts", "תלמידים", "סטודנטים", "student", "ציבור רחב"];
    const sortedEntries = Array.from(grouped.entries()).sort((a, b) => {
      const aIndex = order.findIndex((key) => a[0].includes(key)) ?? 999;
      const bIndex = order.findIndex((key) => b[0].includes(key)) ?? 999;
      return aIndex - bIndex;
    });
    return sortedEntries.map(([group, observations]) => ({
      group: translateGroupName(group, lang),
      ...computeRow(observations)
    }));
  }, [data, lang]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-hidden rounded border bg-card h-full flex flex-col", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 min-h-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full h-full text-xs", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "bg-secondary/50 text-[11px] uppercase tracking-wide text-muted-foreground border-b-2 border-gray-200", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-2 py-1 text-center font-semibold", children: t("group") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-2 py-1 text-center font-semibold", children: t("daysMonitoring") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-2 py-1 text-center font-semibold", children: t("observations") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-2 py-1 text-center font-semibold", children: t("monitoringRate") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-2 py-1 text-center font-semibold", children: t("qualityPct") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-2 py-1 text-center font-semibold", children: t("distinctSpecies") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-2 py-1 text-center font-semibold", children: t("invasiveSpecies") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-2 py-1 text-center font-semibold", children: t("rareSpecies") })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: rows.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-gray-100 hover:bg-secondary/30", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-2 py-1 font-medium text-xs text-center", children: r.group }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-2 py-1 text-center tabular-nums text-xs", children: r.daysMonitoring.toLocaleString() }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-2 py-1 text-center tabular-nums text-xs", children: r.observations.toLocaleString() }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-2 py-1 text-center tabular-nums text-xs", children: r.monitoringRate.toFixed(1) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-2 py-1 text-center tabular-nums text-xs", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "rounded bg-emerald-soft px-1.5 py-0.5 text-[color:var(--accent-foreground)] text-[10px]", children: [
        r.qualityPct.toFixed(1),
        "%"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-2 py-1 text-center tabular-nums text-xs", children: r.distinctSpecies.toLocaleString() }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-2 py-1 text-center tabular-nums text-xs", children: r.invasiveSpecies.toLocaleString() }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-2 py-1 text-center tabular-nums text-xs", children: r.rareSpecies.toLocaleString() })
    ] }, r.group)) })
  ] }) }) });
}
export {
  MetricsTable as M
};
