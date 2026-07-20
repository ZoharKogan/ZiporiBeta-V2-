import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useI18n } from "./router-CXD7leDz.mjs";
import { u as useObservations, g as getTaxaGroup, d as getObservationArea, e as getSpeciesClassification, b as translateMonth } from "./index-CFoMiIRD.mjs";
import { O as ObservationMap } from "./observation-map-BOxGldgJ.mjs";
import "../_libs/papaparse.mjs";
import "../_libs/leaflet.mjs";
import { R as ResponsiveContainer, L as LineChart, C as CartesianGrid, X as XAxis, Y as YAxis, T as Tooltip, a as Legend, b as Line } from "../_libs/recharts.mjs";
import { M as Minus, A as ArrowUpLeft, b as ArrowUpRight, c as ArrowDownLeft, d as ArrowDownRight } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
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
function parseDate(dateStr) {
  if (!dateStr || dateStr.length < 10) return null;
  const parts = dateStr.split("/");
  if (parts.length !== 3) return null;
  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10);
  const year = parseInt(parts[2], 10);
  if ([year, month, day].some((n) => Number.isNaN(n))) return null;
  return new Date(year, month - 1, day);
}
function formatObservations(count, lang) {
  if (lang === "he") return count.toLocaleString("he-IL");
  return count.toLocaleString();
}
function getPreferredSeason(records) {
  const months = /* @__PURE__ */ new Map();
  for (const record of records) {
    const month = Number(record.observed_on.split("/")[1]);
    if (month >= 1 && month <= 12) {
      months.set(month, (months.get(month) ?? 0) + 1);
    }
  }
  const total = records.length;
  const peak = [...months.entries()].sort((a, b) => b[1] - a[1])[0];
  if (!peak || total === 0) return "-";
  if (peak[1] / total < 0.3) return "יציב שנתית";
  if ([12, 1, 2].includes(peak[0])) return "חורף";
  if ([3, 4, 5].includes(peak[0])) return "אביב";
  if ([6, 7, 8].includes(peak[0])) return "קיץ";
  return "סתיו";
}
function TrendIcon({
  trend,
  rtl,
  title
}) {
  const icon = trend === "stable" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { className: "h-4 w-4 text-amber-500", strokeWidth: 2.5 }) : trend === "up" ? rtl ? /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpLeft, { className: "h-4 w-4 text-emerald-600", strokeWidth: 2.5 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "h-4 w-4 text-emerald-600", strokeWidth: 2.5 }) : rtl ? /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowDownLeft, { className: "h-4 w-4 text-rose-600", strokeWidth: 2.5 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowDownRight, { className: "h-4 w-4 text-rose-600", strokeWidth: 2.5 });
  return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { title, children: icon });
}
function UserAnalyticsTable({
  observations,
  topN = 5
}) {
  const { lang } = useI18n();
  const rows = reactExports.useMemo(() => {
    if (observations.length === 0) return [];
    const byUser = /* @__PURE__ */ new Map();
    for (const o of observations) {
      const list = byUser.get(o.user_login) ?? [];
      list.push(o);
      byUser.set(o.user_login, list);
    }
    const userMetrics = Array.from(byUser.entries()).map(([user_login, obs]) => {
      const total = obs.length;
      const isExpert = obs[0]?.user_subcategory === "expert";
      const research = obs.filter((o) => o.quality_grade === "research").length;
      const researchGradePct = total > 0 ? research / total * 100 : 0;
      const yearCounts = /* @__PURE__ */ new Map();
      for (const o of obs) {
        const d = parseDate(o.observed_on);
        if (!d) continue;
        const y = d.getFullYear();
        yearCounts.set(y, (yearCounts.get(y) || 0) + 1);
      }
      const years = Array.from(yearCounts.keys()).sort((a, b) => a - b);
      const latestYear = years[years.length - 1] ?? 0;
      const previousYear = years[years.length - 2] ?? latestYear - 1;
      const latestYearCount = yearCounts.get(latestYear) || 0;
      const previousYearCount = yearCounts.get(previousYear) || 0;
      return {
        user_login,
        total,
        latestYear,
        latestYearCount,
        previousYearCount,
        researchGradePct,
        isExpert,
        season: getPreferredSeason(obs)
      };
    });
    return userMetrics.sort((a, b) => b.total - a.total).slice(0, topN);
  }, [observations, topN]);
  if (rows.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-full items-center justify-center text-xs text-muted-foreground", children: lang === "he" ? "אין נתונים לבחירה זו" : "No data for the current selection" });
  }
  const labels = {
    userName: { he: "שם משתמש", en: "User Name" },
    observations: { he: "מספר תצפיות", en: "Observations" },
    annualTrend: { he: "מגמה שנתית", en: "Annual Trend" },
    seasonalStatus: { he: "סטטוס עונתי", en: "Seasonal Status" },
    researchGrade: { he: "דירוג מחקרי", en: "Research Grade" }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-lg border bg-card shadow-sm overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full table-fixed text-xs", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "h-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b bg-secondary/60 text-[10px] font-semibold text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "w-[30%] px-3 py-1 text-start", children: labels.userName[lang] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "w-[15%] px-2 py-1 text-center", children: labels.observations[lang] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "w-[20%] px-2 py-1 text-center", children: labels.annualTrend[lang] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "w-[17%] px-2 py-1 text-center", children: labels.researchGrade[lang] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "w-[18%] px-2 py-1 text-center", children: labels.seasonalStatus[lang] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: rows.map((row) => {
      const trend = row.latestYearCount > row.previousYearCount ? "up" : row.latestYearCount < row.previousYearCount ? "down" : "stable";
      const previousYear = row.latestYear - 1;
      const trendTitle = `${row.latestYear}: ${formatObservations(row.latestYearCount, lang)} | ${previousYear}: ${formatObservations(row.previousYearCount, lang)}`;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "tr",
        {
          className: "border-b border-border/60 last:border-0 hover:bg-secondary/30",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "td",
              {
                className: "truncate px-3 py-1 align-middle text-start font-medium",
                title: row.user_login,
                children: row.user_login
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-2 py-1 text-center align-middle tabular-nums", children: formatObservations(row.total, lang) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-2 py-1 text-center align-middle", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendIcon, { trend, rtl: lang === "he", title: trendTitle }) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-2 py-1 text-center align-middle tabular-nums", children: row.isExpert ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "-" }) : `${Math.round(row.researchGradePct)}%` }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-2 py-1 text-center align-middle", children: row.season })
          ]
        },
        row.user_login
      );
    }) })
  ] }) });
}
const USER_PALETTE = [
  "#2563eb",
  "#dc2626",
  "#16a34a",
  "#9333ea",
  "#ea580c",
  "#0891b2",
  "#be185d",
  "#4f46e5"
];
function parseSortKey(dateStr) {
  if (!dateStr || dateStr.length < 10) return null;
  const parts = dateStr.split("/");
  if (parts.length !== 3) return null;
  const month = parseInt(parts[1], 10);
  const year = parseInt(parts[2], 10);
  if (Number.isNaN(year) || Number.isNaN(month) || month < 1 || month > 12) return null;
  return {
    sortKey: year * 100 + month,
    label: `${translateMonth(month, "he")}-${String(year).slice(-2)}`
  };
}
function UserActivityChart({ observations, users }) {
  const { lang } = useI18n();
  const { chartData, seriesKeys, seriesColors } = reactExports.useMemo(() => {
    const countsMap = /* @__PURE__ */ new Map();
    for (const o of observations) {
      if (!users.includes(o.user_login)) continue;
      const parsed = parseSortKey(o.observed_on);
      if (!parsed) continue;
      const { sortKey, label } = parsed;
      if (!countsMap.has(sortKey)) {
        countsMap.set(sortKey, { label, counts: /* @__PURE__ */ new Map() });
      }
      const entry = countsMap.get(sortKey);
      entry.counts.set(o.user_login, (entry.counts.get(o.user_login) ?? 0) + 1);
    }
    const allSortKeys = Array.from(countsMap.keys()).sort((a, b) => a - b);
    const chartData2 = allSortKeys.map((sk) => {
      const entry = countsMap.get(sk);
      const point = { monthYear: entry.label };
      for (const user of users) {
        point[user] = entry.counts.get(user) ?? 0;
      }
      return point;
    });
    const seriesColors2 = {};
    users.forEach((user, i) => {
      seriesColors2[user] = USER_PALETTE[i % USER_PALETTE.length];
    });
    return { chartData: chartData2, seriesKeys: users, seriesColors: seriesColors2 };
  }, [observations, users]);
  if (chartData.length === 0 || users.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-full items-center justify-center text-xs text-muted-foreground rounded-lg border bg-card", children: lang === "he" ? "אין נתוני פעילות לחמשת המובילים" : "No activity data for top users" });
  }
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
        formatter: (value, key) => [value, key]
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
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-700 truncate max-w-[120px]", children: key })
        ] }, key)) })
      }
    ),
    seriesKeys.map((key) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      Line,
      {
        type: "monotone",
        dataKey: key,
        stroke: seriesColors[key],
        strokeWidth: 2,
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
  if (Number.isNaN(year) || Number.isNaN(month) || Number.isNaN(day)) return NaN;
  return new Date(year, month, day).getTime();
}
function areaMatches(selectedAreas, area) {
  if (selectedAreas.size === 0) return true;
  if (area === null) return selectedAreas.has("other_areas");
  return selectedAreas.has(area);
}
const GROUPS = [
  { key: "expert", label: "ניטור מקצועי", match: (o) => o.user_category === "expert" },
  { key: "zevulun", label: "זבולון", match: (o) => o.user_subcategory === "zevulun" },
  { key: "yizrael", label: "יזרעאל", match: (o) => o.user_subcategory === "yizrael" },
  { key: "mechnistim", label: "מכניסטים", match: (o) => o.user_subcategory === "mechnistim" },
  { key: "student", label: "תלמידים", match: (o) => o.user_category === "student" },
  {
    key: "public",
    label: "קהילות מקוונות",
    match: (o) => o.user_category === "online_communities" && o.user_subcategory === "community"
  }
];
const ACTIVE_CHIP = "bg-sky-300 text-sky-900 border-sky-500 border-2 font-semibold";
const INACTIVE_CHIP = "bg-gray-50 text-gray-500 border-gray-300 font-normal hover:bg-gray-100";
const USER_ACTIVE_CHIP = "bg-sky-200 text-sky-900 border-sky-400 border-2 font-semibold";
const USER_INACTIVE_CHIP = "bg-gray-50 text-gray-500 border-gray-300 font-normal hover:bg-gray-100";
function PeopleDashboard() {
  const { t } = useI18n();
  const { observations, filters, resetVersion } = useObservations();
  const [selectedGroup, setSelectedGroup] = reactExports.useState(null);
  const [selectedUser, setSelectedUser] = reactExports.useState(null);
  const globallyFilteredObservations = reactExports.useMemo(() => {
    return observations.filter((o) => {
      if (filters.dateRange) {
        const ts = parseObsTimestamp(o.observed_on);
        if (Number.isNaN(ts) || ts < filters.dateRange.start || ts > filters.dateRange.end)
          return false;
      }
      if (filters.researchOnly && o.quality_grade !== "research") return false;
      if (filters.time.size > 0) {
        if (!o.observed_on || o.observed_on.length < 10) return false;
        const parts = o.observed_on.split("/");
        if (parts.length !== 3) return false;
        const entry = filters.time.get(parts[2]);
        if (!entry) return false;
        if (entry.size > 0 && !entry.has(parts[1])) return false;
      }
      if (filters.taxa.size > 0 && !filters.taxa.has(getTaxaGroup(o))) return false;
      if (filters.areas.size > 0 && !areaMatches(filters.areas, getObservationArea(o.latitude, o.longitude)))
        return false;
      if (filters.speciesTypes.size > 0 && !filters.speciesTypes.has(getSpeciesClassification(o)))
        return false;
      return true;
    });
  }, [observations, filters]);
  const groupObservations = reactExports.useMemo(() => {
    const selectedGroupDef = GROUPS.find((g) => g.key === selectedGroup);
    if (!selectedGroupDef) return globallyFilteredObservations;
    return globallyFilteredObservations.filter(selectedGroupDef.match);
  }, [globallyFilteredObservations, selectedGroup]);
  const displayObservations = reactExports.useMemo(() => {
    if (!selectedUser) return groupObservations;
    return groupObservations.filter((o) => o.user_login === selectedUser);
  }, [groupObservations, selectedUser]);
  const summary = reactExports.useMemo(() => {
    const observers = /* @__PURE__ */ new Set();
    for (const o of displayObservations) {
      if (o.user_login) observers.add(o.user_login);
    }
    return { rows: displayObservations.length, observers: observers.size };
  }, [displayObservations]);
  const groupCounts = reactExports.useMemo(() => {
    const counts = /* @__PURE__ */ new Map();
    for (const group of GROUPS) {
      let count = 0;
      for (const o of globallyFilteredObservations) {
        if (group.match(o)) count++;
      }
      counts.set(group.key, count);
    }
    return counts;
  }, [globallyFilteredObservations]);
  const userChipList = reactExports.useMemo(() => {
    const counts = /* @__PURE__ */ new Map();
    for (const o of groupObservations) {
      counts.set(o.user_login, (counts.get(o.user_login) ?? 0) + 1);
    }
    return Array.from(counts.entries()).sort((a, b) => b[1] - a[1]).map(([user, count]) => ({ user, count }));
  }, [groupObservations]);
  const topUserLogins = reactExports.useMemo(() => {
    const counts = /* @__PURE__ */ new Map();
    for (const o of displayObservations) {
      counts.set(o.user_login, (counts.get(o.user_login) ?? 0) + 1);
    }
    return Array.from(counts.entries()).sort((a, b) => b[1] - a[1]).slice(0, 5).map(([user]) => user);
  }, [displayObservations]);
  const handleGroupClick = (key) => {
    if (selectedGroup === key) {
      setSelectedGroup(null);
    } else {
      setSelectedGroup(key);
    }
    setSelectedUser(null);
  };
  const handleUserClick = (user) => {
    if (selectedUser === user) {
      setSelectedUser(null);
    } else {
      setSelectedUser(user);
    }
  };
  reactExports.useEffect(() => {
    setSelectedGroup(null);
    setSelectedUser(null);
  }, [resetVersion]);
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
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-1 flex-wrap items-center justify-center gap-2", children: GROUPS.map((group) => {
        const isActive = selectedGroup === group.key;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => handleGroupClick(group.key),
            className: `shrink-0 inline-flex items-center gap-1 rounded-full border px-3 py-1 text-sm font-medium transition-all duration-200 ${isActive ? ACTIVE_CHIP : INACTIVE_CHIP}`,
            children: [
              group.label,
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "opacity-60 text-[10px]", children: [
                "(",
                (groupCounts.get(group.key) ?? 0).toLocaleString(),
                ")"
              ] })
            ]
          },
          group.key
        );
      }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-[8%] shrink-0 flex items-center gap-3 px-4 py-1.5 border-b", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 overflow-x-auto scrollbar-hide flex flex-nowrap items-center gap-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => setSelectedUser(null),
          className: `shrink-0 inline-flex items-center rounded-full border px-3 py-1 text-xs transition-all duration-200 ${selectedUser === null ? USER_ACTIVE_CHIP : USER_INACTIVE_CHIP}`,
          children: t("all")
        }
      ),
      userChipList.map(({ user, count }) => {
        const isSelected = selectedUser === user;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => handleUserClick(user),
            title: user,
            className: `shrink-0 inline-flex items-center rounded-full border px-2.5 py-1 text-xs transition-all duration-200 whitespace-nowrap ${isSelected ? USER_ACTIVE_CHIP : USER_INACTIVE_CHIP}`,
            children: [
              user,
              " (",
              count.toLocaleString(),
              ")"
            ]
          },
          user
        );
      })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-[50%] shrink-0 px-2 pt-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full w-full rounded-lg shadow-sm overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ObservationMap, { data: displayObservations }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-h-0 px-2 pt-2 pb-1 grid grid-cols-1 lg:grid-cols-2 gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(UserAnalyticsTable, { observations: displayObservations, topN: 5 }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(UserActivityChart, { observations: displayObservations, users: topUserLogins })
    ] })
  ] });
}
export {
  PeopleDashboard
};
