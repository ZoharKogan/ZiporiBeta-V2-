import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useObservations, g as getTaxaGroup, c as getObservationArea, d as getSpeciesClassification } from "./index-DpIpUFdL.mjs";
import { O as ObservationMap } from "./observation-map-DO7VCnZW.mjs";
import "../_libs/papaparse.mjs";
import "../_libs/leaflet.mjs";
import "./router-BBaajQ2s.mjs";
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
import "../_libs/lucide-react.mjs";
import "../_libs/react-leaflet.mjs";
import "../_libs/react-leaflet__core.mjs";
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
function PeopleDashboard() {
  const { observations, filters } = useObservations();
  const filtered = reactExports.useMemo(() => {
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
        if (!entry) return false;
        if (entry.size > 0 && !entry.has(parts[1])) return false;
      }
      if (filters.taxa.size > 0 && !filters.taxa.has(getTaxaGroup(o))) return false;
      if (filters.groups.size > 0 && (!o.user_category || !filters.groups.has(o.user_category))) return false;
      if (filters.areas.size > 0 && !areaMatches(filters.areas, getObservationArea(o.latitude, o.longitude))) return false;
      if (filters.speciesTypes.size > 0 && !filters.speciesTypes.has(getSpeciesClassification(o))) return false;
      return true;
    });
  }, [observations, filters]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "flex h-full w-full flex-col overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 min-h-0 p-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ObservationMap, { data: filtered }) }) });
}
export {
  PeopleDashboard
};
