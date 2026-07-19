import { useMemo } from "react";
import { useI18n } from "@/lib/i18n";
import { useObservations, type TaxaGroupKey, type SurveyAreaKey, translateGroupName, translateMonth } from "@/lib/observations-store";
import { SURVEY_AREA_KEYS, AREA_COLORS, translateArea } from "@/lib/survey-polygons";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1">
      <h3 className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{title}</h3>
      <div className="space-y-0.5">{children}</div>
    </div>
  );
}

function Check({
  checked,
  onChange,
  label,
  indeterminate,
}: {
  checked: boolean;
  onChange: (b: boolean) => void;
  label: string;
  indeterminate?: boolean;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2 rounded-md px-1.5 py-0.5 text-xs font-normal hover:bg-secondary">
      <input
        type="checkbox"
        checked={checked}
        ref={(el) => {
          if (el) el.indeterminate = !!indeterminate && !checked;
        }}
        onChange={(e) => onChange(e.target.checked)}
        className="h-3 w-3 rounded border-border accent-[color:var(--primary)]"
      />
      <span className="truncate">{label}</span>
    </label>
  );
}

export function FilterSidebar() {
  const { t, lang } = useI18n();
  const { observations, filters, setFilters, toggleSpeciesType, datasetBounds } = useObservations();

  // Derive unique user categories from observations, always including the canonical expert key
  const uniqueUserCategories = useMemo(() => {
    const categories = new Set<string>();
    for (const obs of observations) {
      if (obs.user_category) {
        categories.add(obs.user_category);
      }
    }
    categories.add("expert"); // Always show Professional Monitoring even if no data yet
    // Fixed display order
    const order = ["expert", "קהילה", "community", "תלמידים", "סטודנטים", "student", "קהילות מקוונות"];
    return Array.from(categories).sort((a, b) => {
      const ai = order.findIndex((k) => a.includes(k));
      const bi = order.findIndex((k) => b.includes(k));
      return (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi);
    });
  }, [observations]);

  // Extract unique years from observations (DD/MM/YYYY format)
  const uniqueYears = useMemo(() => {
    const years = new Set<string>();
    for (const o of observations) {
      const d = o.observed_on;
      if (!d || d.length < 10) continue;
      const parts = d.split('/');
      if (parts.length === 3) {
        const year = parts[2];
        if (year && year.length === 4) {
          years.add(year);
        }
      }
    }
    return Array.from(years).sort();
  }, [observations]);

  const toggleYear = (year: string) => {
    setFilters((prev) => {
      const next = new Map(prev.time);
      if (next.has(year)) next.delete(year);
      else next.set(year, new Set()); // empty = all months of year

      // Sync dateRange to span Jan 1 of earliest selected year – Dec 31 of latest
      let dateRange: { start: number; end: number } | null = prev.dateRange;
      if (next.size > 0) {
        const selectedYears = Array.from(next.keys()).map(Number).sort((a, b) => a - b);
        const earliest = selectedYears[0];
        const latest = selectedYears[selectedYears.length - 1];
        dateRange = {
          start: new Date(earliest, 0, 1).getTime(),
          end: new Date(latest, 11, 31, 23, 59, 59, 999).getTime(),
        };
      } else if (datasetBounds) {
        dateRange = datasetBounds;
      }
      return { ...prev, time: next, dateRange };
    });
  };

  const toggleMonth = (month: string) => {
    setFilters((prev) => {
      const next = new Map(prev.time);
      // If month is selected, add it to all selected years
      // If month is deselected, remove it from all selected years
      const monthNum = month.padStart(2, '0');
      
      if (next.size === 0) {
        // No years selected, can't toggle months
        return prev;
      }
      
      let monthSelectedInAnyYear = false;
      for (const [year, months] of next.entries()) {
        if (months.has(monthNum)) {
          monthSelectedInAnyYear = true;
          break;
        }
      }
      
      if (monthSelectedInAnyYear) {
        // Remove month from all years
        for (const [year, months] of next.entries()) {
          months.delete(monthNum);
          if (months.size === 0) next.delete(year);
        }
      } else {
        // Add month to all selected years
        for (const year of next.keys()) {
          const months = new Set(next.get(year) ?? []);
          months.add(monthNum);
          next.set(year, months);
        }
      }
      
      return { ...prev, time: next };
    });
  };

  const toggleTaxa = (key: TaxaGroupKey) => {
    setFilters((prev) => {
      const next = new Set(prev.taxa);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return { ...prev, taxa: next };
    });
  };

  const toggleGroup = (g: string) => {
    setFilters((prev) => {
      const next = new Set(prev.groups);
      if (next.has(g)) next.delete(g);
      else next.add(g);
      return { ...prev, groups: next };
    });
  };

  const toggleArea = (key: SurveyAreaKey) => {
    setFilters((prev) => {
      const next = new Set(prev.areas);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return { ...prev, areas: next };
    });
  };

  const monthName = (m: string) => {
    const monthNum = parseInt(m, 10);
    if (isNaN(monthNum) || monthNum < 1 || monthNum > 12) return m;
    return translateMonth(monthNum, lang);
  };

  return (
    <aside className="flex h-full w-48 shrink-0 flex-col gap-3 overflow-y-auto bg-card px-3 py-2">
      <h2 className="text-xs font-bold">{t("filters")}</h2>

      <Section title={t("years")}>
        {uniqueYears.length === 0 && <p className="px-1 text-xs text-muted-foreground">—</p>}
        {uniqueYears.map((year) => {
          const yearEntry = filters.time.get(year);
          const yearActive = yearEntry !== undefined;
          const hasSpecific = !!yearEntry && yearEntry.size > 0;
          return (
            <Check
              key={year}
              checked={yearActive && !hasSpecific}
              indeterminate={hasSpecific}
              onChange={() => toggleYear(year)}
              label={year}
            />
          );
        })}
      </Section>

      <Section title={t("quality")}>
        <Check
          checked={filters.researchOnly}
          onChange={(b) => setFilters((p) => ({ ...p, researchOnly: b }))}
          label={t("researchOnly")}
        />
      </Section>

      <Section title={t("speciesType")}>
        <Check
          checked={filters.speciesTypes.has("invasive")}
          onChange={() => toggleSpeciesType("invasive")}
          label={t("invasiveSpecies")}
        />
        <Check
          checked={filters.speciesTypes.has("rare")}
          onChange={() => toggleSpeciesType("rare")}
          label={t("rareSpecies")}
        />
        <Check
          checked={filters.speciesTypes.has("other_species")}
          onChange={() => toggleSpeciesType("other_species")}
          label={t("otherSpecies")}
        />
      </Section>

      <Section title={t("targetPop")}>
        {uniqueUserCategories.map((g) => (
          <Check
            key={g}
            checked={filters.groups.has(g)}
            onChange={() => toggleGroup(g)}
            label={translateGroupName(g, lang)}
          />
        ))}
      </Section>

      <Section title={t("areas")}>
        {SURVEY_AREA_KEYS.map((key) => (
          <label
            key={key}
            className="flex cursor-pointer items-center gap-2 rounded-md px-1.5 py-0.5 text-xs font-normal hover:bg-secondary"
          >
            <input
              type="checkbox"
              checked={filters.areas.has(key)}
              onChange={() => toggleArea(key)}
              className="h-3 w-3 rounded border-border accent-[color:var(--primary)]"
            />
            <span className="truncate">{translateArea(key, lang)}</span>
            {filters.areas.has(key) && (
              <span
                className="ml-auto h-2 w-2 rounded-full shrink-0"
                style={{ backgroundColor: AREA_COLORS[key] }}
              />
            )}
          </label>
        ))}
      </Section>
    </aside>
  );
}
