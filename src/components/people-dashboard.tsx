import { useMemo } from "react";
import { useObservations, getTaxaGroup, getSpeciesClassification } from "@/lib/observations-store";
import { getObservationArea, type SurveyAreaKey } from "@/lib/survey-polygons";
import { ObservationMap } from "@/components/observation-map";

/** Parse DD/MM/YYYY to timestamp. Returns NaN for invalid dates. */
function parseObsTimestamp(dateStr: string): number {
  if (!dateStr || dateStr.length < 10) return NaN;
  const parts = dateStr.split('/');
  if (parts.length !== 3) return NaN;
  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1;
  const year = parseInt(parts[2], 10);
  if (isNaN(day) || isNaN(month) || isNaN(year)) return NaN;
  return new Date(year, month, day).getTime();
}

function areaMatches(selectedAreas: Set<SurveyAreaKey>, area: SurveyAreaKey | null): boolean {
  if (selectedAreas.size === 0) return true;
  if (area === null) return selectedAreas.has("other_areas");
  return selectedAreas.has(area);
}

export function PeopleDashboard() {
  const { observations, filters } = useObservations();

  const filtered = useMemo(() => {
    return observations.filter((o) => {
      if (filters.dateRange) {
        const ts = parseObsTimestamp(o.observed_on);
        if (isNaN(ts) || ts < filters.dateRange.start || ts > filters.dateRange.end) return false;
      }
      if (filters.researchOnly && o.quality_grade !== "research") return false;
      if (filters.time.size > 0) {
        if (!o.observed_on || o.observed_on.length < 10) return false;
        const parts = o.observed_on.split('/');
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

  return (
    <main className="flex h-full w-full flex-col overflow-hidden">
      <div className="flex-1 min-h-0 p-3">
        <ObservationMap data={filtered} />
      </div>
    </main>
  );
}
