import { c as createRouter, a as createRootRoute, b as createFileRoute, l as lazyRouteComponent, H as HeadContent, S as Scripts, O as Outlet, u as useRouter, L as Link } from "../_libs/tanstack__react-router.mjs";
import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
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
const appCss = "/assets/styles-CbfC3J2G.css";
function reportLovableError(error, context = {}) {
  if (typeof window === "undefined") return;
  window.__lovableEvents?.captureException?.(
    error,
    {
      source: "react_error_boundary",
      route: window.location.pathname,
      ...context
    },
    {
      mechanism: "react_error_boundary",
      handled: false,
      severity: "error"
    }
  );
}
const dict = {
  appTitle: { he: "מערכת ניטור אקולוגי", en: "Ecological Monitoring Platform" },
  dashboard: { he: "לוח בקרה", en: "Dashboard" },
  admin: { he: "ניהול", en: "Admin Panel" },
  language: { he: "English", en: "עברית" },
  uploadCsv: { he: "העלאת קובץ CSV", en: "Upload iNaturalist CSV" },
  dropOrClick: { he: "גרור קובץ או לחץ לבחירה", en: "Drag a file or click to select" },
  parsed: { he: "תצפיות נטענו", en: "observations loaded" },
  filters: { he: "מסננים", en: "Filters" },
  time: { he: "זמן", en: "Time" },
  years: { he: "שנים", en: "Years" },
  months: { he: "חודשים", en: "Months" },
  taxa: { he: "טקסונים", en: "Taxa" },
  quality: { he: "איכות", en: "Quality" },
  tg_birds: { he: "עופות", en: "Birds" },
  tg_butterflies: { he: "פרפרים", en: "Butterflies" },
  tg_dragonflies: { he: "שפיראים", en: "Dragonflies" },
  tg_mammals: { he: "יונקים", en: "Mammals" },
  tg_other: { he: "שאר המינים", en: "Other Species" },
  researchOnly: { he: "דרגת מחקר", en: "Research Grade" },
  targetPop: { he: "אוכלוסיית יעד", en: "Target Population" },
  resetFilters: { he: "איפוס מסננים", en: "Reset Filters" },
  map: { he: "מפת תצפיות", en: "Observation Map" },
  metrics: { he: "מדדים מצרפיים", en: "Aggregation Metrics" },
  group: { he: "קבוצה", en: "Group" },
  daysMonitoring: { he: "ימי ניטור", en: "Days Monitoring" },
  observations: { he: "מס׳ תצפיות", en: "# Observations" },
  qualityPct: { he: "דרגת מחקר", en: "Research Grade" },
  distinctSpecies: { he: "סה״כ מינים", en: "Total Species" },
  invasiveSpecies: { he: "מינים פולשים", en: "Invasive Species" },
  rareSpecies: { he: "מינים נדירים", en: "Rare Species" },
  monitoringRate: { he: "קצב ניטור", en: "Monitoring Rate" },
  noData: { he: "אין נתונים. העלה קובץ CSV.", en: "No data yet. Upload a CSV file." },
  userGroups: { he: "קבוצות משתמשים", en: "User Groups" },
  rareDirectory: { he: "מינים נדירים", en: "Rare Species Directory" },
  taxonomicGroups: { he: "קבוצות טקסונומיות", en: "Taxonomic Groups" },
  userLogin: { he: "שם משתמש", en: "User Login" },
  groupName: { he: "קבוצה", en: "Group" },
  add: { he: "הוסף", en: "Add" },
  save: { he: "שמור", en: "Save" },
  cancel: { he: "ביטול", en: "Cancel" },
  edit: { he: "עריכה", en: "Edit" },
  delete: { he: "מחק", en: "Delete" },
  scientificName: { he: "שם מדעי", en: "Scientific Name" },
  notes: { he: "הערות", en: "Notes" },
  iconicTaxon: { he: "Iconic Taxon", en: "Iconic Taxon" },
  hebrewLabel: { he: "תווית עברית", en: "Hebrew Label" },
  englishLabel: { he: "תווית אנגלית", en: "English Label" },
  actions: { he: "פעולות", en: "Actions" },
  species: { he: "מין", en: "Species" },
  observer: { he: "מתצפת", en: "Observer" },
  date: { he: "תאריך", en: "Date" },
  qualityGrade: { he: "דרגת איכות", en: "Quality Grade" },
  general_public: { he: "קהל רחב", en: "General Public" },
  community: { he: "קהילה", en: "Community" },
  experts: { he: "מומחים", en: "Experts" },
  students: { he: "תלמידים", en: "Students" },
  professionals: { he: "אנשי מקצוע", en: "Professionals" },
  loading: { he: "טוען…", en: "Loading…" },
  confirmDelete: { he: "למחוק?", en: "Delete?" },
  totalRows: { he: "סך תצפיות מסוננות", en: "Filtered observations" },
  uniqueObservers: { he: "סה״כ מנטרים", en: "Total Monitors" },
  uniqueSpecies: { he: "סה״כ מינים", en: "Total Species" },
  speciesType: { he: "סוג מין", en: "Species Type" },
  otherSpecies: { he: "שאר המינים", en: "Other Species" },
  areas: { he: "אזורים", en: "Areas" },
  overview: { he: "מבט על", en: "Overview" },
  deepDive: { he: "מינים", en: "Species" },
  people: { he: "אנשים", en: "People" },
  all: { he: "הכל", en: "All" },
  searchSpecies: { he: "חיפוש מינים...", en: "Search species..." }
};
const groupKeyMap = {
  "General Public": "general_public",
  Community: "community",
  Experts: "experts",
  Students: "students",
  Professionals: "professionals"
};
const Ctx = reactExports.createContext(null);
function I18nProvider({ children }) {
  const [lang, setLangState] = reactExports.useState("he");
  reactExports.useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = localStorage.getItem("eco_lang");
    if (saved === "he" || saved === "en") setLangState(saved);
  }, []);
  reactExports.useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "he" ? "rtl" : "ltr";
    localStorage.setItem("eco_lang", lang);
  }, [lang]);
  const value = reactExports.useMemo(() => ({
    lang,
    dir: lang === "he" ? "rtl" : "ltr",
    setLang: setLangState,
    t: (k) => dict[k]?.[lang] ?? String(k),
    groupLabel: (g) => {
      const key = groupKeyMap[g];
      return key ? dict[key][lang] : g;
    }
  }), [lang]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Ctx.Provider, { value, children });
}
function useI18n() {
  const c = reactExports.useContext(Ctx);
  if (!c) throw new Error("useI18n must be used within I18nProvider");
  return c;
}
function NotFoundComponent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-7xl font-bold text-foreground", children: "404" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 text-xl font-semibold text-foreground", children: "Page not found" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "The page you're looking for doesn't exist or has been moved." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Link,
      {
        to: "/",
        className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
        children: "Go home"
      }
    ) })
  ] }) });
}
function ErrorComponent({ error, reset }) {
  console.error(error);
  const router2 = useRouter();
  reactExports.useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-semibold tracking-tight text-foreground", children: "This page didn't load" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Something went wrong on our end. You can try refreshing or head back home." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-wrap justify-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => {
            router2.invalidate();
            reset();
          },
          className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
          children: "Try again"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: "/",
          className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
          children: "Go home"
        }
      )
    ] })
  ] }) });
}
const Route$1 = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Lovable App" },
      { name: "description", content: "Lovable Generated Project" },
      { name: "author", content: "Lovable" },
      { property: "og:title", content: "Lovable App" },
      { property: "og:description", content: "Lovable Generated Project" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@Lovable" }
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss
      }
    ]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("head", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(I18nProvider, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-screen overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}) }) });
}
const $$splitComponentImporter = () => import("./index-DpIpUFdL.mjs").then((n) => n.i);
const Route = createFileRoute("/")({
  ssr: false,
  head: () => ({
    meta: [{
      title: "Ecological Monitoring Dashboard"
    }, {
      name: "description",
      content: "Interactive analytics dashboard for iNaturalist ecological observations."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const IndexRoute = Route.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$1
});
const rootRouteChildren = {
  IndexRoute
};
const routeTree = Route$1._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const router2 = createRouter({
    routeTree,
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  router as r,
  useI18n as u
};
