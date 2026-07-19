import { createContext, useContext, useEffect, useMemo, useState, useCallback, type ReactNode } from "react";
import Papa from "papaparse";
import type { SurveyAreaKey } from "./survey-polygons";
import { SURVEY_AREA_KEYS } from "./survey-polygons";
import { getSpeciesHebrewName } from "./species-dictionary";
import { getTaxonCategory, getTaxonStatus } from "./taxonomy-engine";
export type { SurveyAreaKey };

export type Observation = {
  observed_on: string; // YYYY-MM-DD
  latitude: number;
  longitude: number;
  user_login: string;
  quality_grade: string;
  iconic_taxon_name: string;
  scientific_name: string;
  common_name?: string;
  taxon_order_name: string;
  user_category: string;
  establishment_means?: string;
};

// Group name translations (Hebrew -> English for language toggle)
const GROUP_TRANSLATIONS: Record<string, { he: string; en: string }> = {
  "קהילות מקוונות": { he: "קהילות מקוונות", en: "General Public" },
  "תלמידים": { he: "תלמידים", en: "Students" },
  "סטודנטים": { he: "תלמידים", en: "Students" },
  "קהילה": { he: "קהילות מקומיות", en: "Citizen science community" },
  "student": { he: "תלמידים", en: "Students" },
  "community": { he: "קהילות מקומיות", en: "Citizen science community" },
  "expert": { he: "ניטור מקצועי", en: "Professional Monitoring" },
  "professional": { he: "אנשי מקצוע", en: "Professionals" },
};

// Species name translations (Scientific names -> Hebrew common names)
const SPECIES_TRANSLATIONS: Record<string, string> = {
  // Add common species translations as needed
  "Passer domesticus": "דרור הבית",
  "Columba livia": "יונת הבית",
  "Hirundo rustica": "סנונית הרפתות",
  "Mus musculus": "עכבר הבית",
  "Rattus norvegicus": "חולד חום",
  "Papilio machaon": "פרפר הזנב הנץ",
  "Vanessa cardui": "פרפר הצלע",
  "Pieris rapae": "פרפר הכרוב",
  "Danaus plexippus": "מלך הפרפרים",
};

// Taxa translations (Hebrew -> English for language toggle)
const TAXA_TRANSLATIONS: Record<string, { he: string; en: string }> = {
  "יונקים": { he: "יונקים", en: "Mammals" },
  "עופות": { he: "עופות", en: "Birds" },
  "פרפרים": { he: "פרפרים", en: "Butterflies" },
  "שפיראים": { he: "שפיראים", en: "Dragonflies" },
  "פרוקי רגליים": { he: "פרוקי רגליים", en: "Arthropods" },
  "צמחים": { he: "צמחים", en: "Plants" },
  "שאר המינים": { he: "שאר המינים", en: "Other Species" },
};

// Month translations (1-12 -> Hebrew/English)
const MONTH_TRANSLATIONS: Record<number, { he: string; en: string }> = {
  1: { he: "ינואר", en: "Jan" },
  2: { he: "פברואר", en: "Feb" },
  3: { he: "מרץ", en: "Mar" },
  4: { he: "אפריל", en: "Apr" },
  5: { he: "מאי", en: "May" },
  6: { he: "יוני", en: "Jun" },
  7: { he: "יולי", en: "Jul" },
  8: { he: "אוגוסט", en: "Aug" },
  9: { he: "ספטמבר", en: "Sep" },
  10: { he: "אוקטובר", en: "Oct" },
  11: { he: "נובמבר", en: "Nov" },
  12: { he: "דצמבר", en: "Dec" },
};

export function translateGroupName(group: string, lang: "he" | "en" = "he"): string {
  const translation = GROUP_TRANSLATIONS[group];
  if (translation) {
    return translation[lang];
  }
  // If no translation found, return original
  return group;
}

export function translateSpeciesName(scientificName: string): string {
  return SPECIES_TRANSLATIONS[scientificName] || getSpeciesHebrewName(scientificName) || scientificName;
}

export function translateTaxa(taxa: string, lang: "he" | "en" = "he"): string {
  const translation = TAXA_TRANSLATIONS[taxa];
  if (translation) {
    return translation[lang];
  }
  return taxa;
}

export function translateMonth(monthNum: number, lang: "he" | "en" = "he"): string {
  const translation = MONTH_TRANSLATIONS[monthNum];
  if (translation) {
    return translation[lang];
  }
  return monthNum.toString();
}

/**
 * Parse observation dates from either:
 * - Tzipori format: DD/MM/YYYY or DD/MM/YYYY HH:mm
 * - Merlin format: M/D/YYYY or M/D/YYYY H:mm
 * Normalizes to DD/MM/YYYY (the internal format used by the rest of the app).
 * Returns empty string if unparseable.
 */
function parseObservedOn(value: string): string {
  const raw = (value || "").trim();
  if (!raw) return "";

  // Strip time portion if present
  const datePart = raw.split(/\s+/)[0];
  const parts = datePart.split("/");
  if (parts.length !== 3) return "";

  const first = parseInt(parts[0], 10);
  const second = parseInt(parts[1], 10);
  const year = parseInt(parts[2], 10);
  if (isNaN(first) || isNaN(second) || isNaN(year)) return "";

  let day: number;
  let month: number;

  if (second > 12) {
    // Second component cannot be a month: must be Merlin M/D/YYYY
    month = first;
    day = second;
  } else if (first > 12) {
    // First component cannot be a month: must be Tzipori DD/MM/YYYY
    day = first;
    month = second;
  } else if (parts[1].length === 2 && parts[1].startsWith("0")) {
    // Zero-padded month in second position: Tzipori DD/MM/YYYY
    day = first;
    month = second;
  } else {
    // Both components could be month/day. Merlin does not zero-pad months,
    // so a non-padded second part is most likely Merlin's M/D/YYYY.
    month = first;
    day = second;
  }

  if (month < 1 || month > 12 || day < 1 || day > 31) return "";

  const d = String(day).padStart(2, "0");
  const m = String(month).padStart(2, "0");
  return `${d}/${m}/${year}`;
}

function parseMerlinRow(row: Record<string, string>): Observation | null {
  const lat = parseFloat((row.decimalLatitudeStart || "").trim());
  const lon = parseFloat((row.decimalLongitudeStart || "").trim());
  const observedOn = parseObservedOn(row.timeStamp || "");

  if (!observedOn || isNaN(lat) || isNaN(lon)) return null;

  const userLogin = (row.personName || row.recordedBy || "").trim();
  if (!userLogin) return null;

  const family = (row.family || "").trim();
  let iconicTaxon = "";
  if (["Hesperiidae", "Pieridae", "Lycaenidae", "Papilionidae", "Nymphalidae"].includes(family)) {
    iconicTaxon = "Insecta";
  } else if (["Canidae", "Mustelidae", "Hystricidae", "Herpestidae", "Leporidae", "Suidae"].includes(family)) {
    iconicTaxon = "Mammalia";
  }

  return {
    observed_on: observedOn,
    latitude: lat,
    longitude: lon,
    user_login: userLogin,
    quality_grade: "research",
    iconic_taxon_name: iconicTaxon,
    scientific_name: (row.scientificName || "").trim(),
    common_name: (row.vernacularName || "").trim() || undefined,
    taxon_order_name: family,
    user_category: "expert",
  };
}

export const TAXA_GROUP_KEYS = [
  "mammals",
  "birds",
  "butterflies",
  "dragonflies",
  "arthropods",
  "plants",
  "other",
] as const;
export type TaxaGroupKey = (typeof TAXA_GROUP_KEYS)[number];

export type SpecialSpeciesEntry = { he: string; sci: string; tab: string };

export const INVASIVE_SPECIES: SpecialSpeciesEntry[] = [
  { he: "זנב סנונית הלימון", sci: "Papilio demoleus", tab: "פרפרים" },
  { he: "נוטרייה", sci: "Myocastor coypus", tab: "יונקים" },
  { he: "מיינה מצויה", sci: "Acridotheres tristis", tab: "עופות" },
  { he: "דררה מצויה", sci: "Psittacula krameri", tab: "עופות" },
  { he: "תוכי נזירי", sci: "Myiopsitta monachus", tab: "עופות" },
];

export const RARE_SPECIES: SpecialSpeciesEntry[] = [
  { he: "הספרית ביצות", sci: "Borbo borbonica", tab: "פרפרים" },
  { he: "חתול ביצות", sci: "Felis chaus", tab: "יונקים" },
  { he: "לוטרה", sci: "Lutra lutra", tab: "יונקים" },
  { he: "שלחית זעירה", sci: "Crocothemis erythraea", tab: "שפיראים" },
  { he: "חניתית היאור", sci: "Orthetrum chrysostigma", tab: "שפיראים" },
  { he: "תכשיטית זוהרת", sci: "Calopteryx syriaca", tab: "שפיראים" },
];

/** Maps the Hebrew tab label used in special-species lists to the internal TaxaGroupKey. */
const TAB_LABEL_TO_GROUP: Record<string, TaxaGroupKey> = {
  "יונקים": "mammals",
  "עופות": "birds",
  "פרפרים": "butterflies",
  "שפיראים": "dragonflies",
  "פרוקי רגליים": "arthropods",
  "צמחים": "plants",
  "שאר המינים": "other",
};

const _invasiveSciMap = new Map<string, TaxaGroupKey>(
  INVASIVE_SPECIES.map((s) => [s.sci, TAB_LABEL_TO_GROUP[s.tab] ?? "other"])
);
const _rareSciMap = new Map<string, TaxaGroupKey>(
  RARE_SPECIES.map((s) => [s.sci, TAB_LABEL_TO_GROUP[s.tab] ?? "other"])
);

/** Map an observation to one of our high-level dashboard groups.
 *  1. Look up the scientific_name via the taxonomy engine (unified dictionary).
 *  2. If not found, fall back to iconic_taxon_name (Aves/Mammalia → birds/mammals).
 *  3. Default → "other".
 */
export function getTaxaGroup(o: Observation): TaxaGroupKey {
  const sci = o.scientific_name;

  // 1. Taxonomy engine lookup (uses iconic_taxon_name + common_name for fallbacks)
  if (sci) {
    const category = getTaxonCategory(sci, o.iconic_taxon_name, o.common_name);
    if (category !== "שאר המינים") {
      return TAB_LABEL_TO_GROUP[category] ?? "other";
    }
  }

  // 2. Fallback taxonomy — strict elimination order to prevent double-counting.
  //    Butterflies and dragonflies are checked via dictionary lookup (step 1) first;
  //    Insecta/Arachnida only catches remaining arthropods after those are eliminated.
  const iconic = o.iconic_taxon_name;
  if (iconic === "Insecta" || iconic === "Arachnida") return "arthropods";
  if (iconic === "Plantae") return "plants";
  if (iconic === "Mammalia") return "mammals";
  if (iconic === "Aves") return "birds";

  // 3. Default
  return "other";
}

/** Classify an observation as invasive, rare, or other_species using the taxonomy engine.
 *  Any species not listed in the registry defaults to other_species.
 */
export function getSpeciesClassification(o: Observation): string {
  const status = getTaxonStatus(o.scientific_name);
  return status === "other" ? "other_species" : status;
}

/** time: year -> set of months. Empty set means "all months of that year". */
export type Filters = {
  time: Map<string, Set<string>>;
  taxa: Set<TaxaGroupKey>;
  groups: Set<string>;
  researchOnly: boolean;
  /** Empty set = no area filter (show all). Non-empty = only show observations inside selected areas. */
  areas: Set<SurveyAreaKey>;
  /** Empty set = no species type filter. Non-empty = only show observations matching selected species types. */
  speciesTypes: Set<string>;
  /** Date range filter: timestamps (ms). null = not initialised yet. */
  dateRange: { start: number; end: number } | null;
};

export type DeepDiveState = {
  category: string | null;
  species: Set<string>;
  search: string;
};

type DeepDiveActions = {
  setDeepDiveCategory: (category: string | null) => void;
  toggleDeepDiveSpecies: (scientificName: string) => void;
  clearDeepDiveSpecies: () => void;
  setDeepDiveSearch: (query: string) => void;
};

type Ctx = {
  observations: Observation[];
  setObservations: (o: Observation[]) => void;
  filters: Filters;
  setFilters: (f: Filters | ((prev: Filters) => Filters)) => void;
  toggleSpeciesType: (type: string) => void;
  setDateRange: (start: number, end: number) => void;
  /** Absolute bounds of the loaded dataset (min/max timestamps). null until data loads. */
  datasetBounds: { start: number; end: number } | null;
  deepDive: DeepDiveState;
  deepDiveActions: DeepDiveActions;
};

const ObservationsCtx = createContext<Ctx | null>(null);

export function ObservationsProvider({ children }: { children: ReactNode }) {
  const [observations, setObservations] = useState<Observation[]>([]);
  const [filters, setFilters] = useState<Filters>({
    time: new Map(),
    taxa: new Set(["mammals", "birds", "butterflies", "dragonflies", "arthropods", "plants", "other"]),
    groups: new Set(),
    researchOnly: false,
    areas: new Set<SurveyAreaKey>(SURVEY_AREA_KEYS),
    speciesTypes: new Set(["invasive", "rare", "other_species"]),
    dateRange: null,
  });

  /** Absolute min/max timestamps of the whole dataset. Set once on data load. */
  const [datasetBounds, setDatasetBounds] = useState<{ start: number; end: number } | null>(null);

  // Deep Dive isolated state
  const [deepDive, setDeepDive] = useState<DeepDiveState>({
    category: null,
    species: new Set(),
    search: "",
  });

  const toggleSpeciesType = useCallback((type: string) => {
    setFilters((prev) => {
      const next = new Set(prev.speciesTypes);
      if (next.has(type)) next.delete(type);
      else next.add(type);
      return { ...prev, speciesTypes: next };
    });
  }, []);

  /** Slider moved → update dateRange AND sync year checkboxes. */
  const setDateRange = useCallback((start: number, end: number) => {
    setFilters((prev) => {
      const startDate = new Date(start);
      const endDate = new Date(end);
      const startYear = startDate.getFullYear();
      const endYear = endDate.getFullYear();
      const nextTime = new Map<string, Set<string>>();
      for (let y = startYear; y <= endYear; y++) {
        nextTime.set(String(y), new Set());
      }
      return { ...prev, dateRange: { start, end }, time: nextTime };
    });
  }, []);

  const deepDiveActions = useMemo<DeepDiveActions>(() => ({
    setDeepDiveCategory: (category) =>
      setDeepDive({ category, species: new Set(), search: "" }),
    toggleDeepDiveSpecies: (scientificName) =>
      setDeepDive((prev) => {
        const next = new Set(prev.species);
        if (next.has(scientificName)) next.delete(scientificName);
        else next.add(scientificName);
        return { ...prev, species: next };
      }),
    clearDeepDiveSpecies: () =>
      setDeepDive((prev) => ({ ...prev, species: new Set() })),
    setDeepDiveSearch: (query) =>
      setDeepDive((prev) => ({ ...prev, search: query })),
  }), []);

  useEffect(() => {
    // Skip data loading during SSR
    if (typeof window === "undefined") return;

    const loadData = async () => {
      try {
        // Load user groups CSV
        const userGroupsResponse = await fetch("/user_groups.csv");
        const userGroupsText = await userGroupsResponse.text();
        const userGroupsData = Papa.parse<Record<string, string>>(userGroupsText, {
          header: true,
          skipEmptyLines: true,
        }).data;

        const userGroupMap = new Map<string, string>(
          userGroupsData.map((row) => [row.user_login, row.group])
        );

        // Load main observations CSV
        const observationsResponse = await fetch("/Tzipori_2325.csv");
        const observationsText = await observationsResponse.text();
        const observationsData = Papa.parse<Record<string, string>>(observationsText, {
          header: true,
          skipEmptyLines: true,
        }).data;

        // Join data: add user_category to each observation
        const tziporiObservations: Observation[] = observationsData
          .map((row) => {
            const lat = parseFloat((row.latitude || "").trim());
            const lon = parseFloat((row.longitude || "").trim());
            const observedOn = parseObservedOn(row.observed_on || "");

            if (!observedOn || isNaN(lat) || isNaN(lon)) return null;

            const userLogin = (row.user_login || "").trim();
            const userCategory = userGroupMap.get(userLogin) || "קהילות מקוונות";

            const observation: Observation = {
              observed_on: observedOn,
              latitude: lat,
              longitude: lon,
              user_login: userLogin,
              quality_grade: (row.quality_grade || "").trim().toLowerCase(),
              iconic_taxon_name: (row.iconic_taxon_name || "").trim(),
              scientific_name: (row.scientific_name || "").trim(),
              common_name: (row.common_name || "").trim() || undefined,
              taxon_order_name: (row.taxon_order_name || "").trim(),
              user_category: userCategory,
              establishment_means: (row.establishment_means || "").trim().toLowerCase() || undefined,
            };
            return observation;
          })
          .filter((obs): obs is Observation => obs !== null);

        // Load Merlin expert observations CSV
        const merlinResponse = await fetch("/MERLIN butterflies and mammals observations for Zohar.csv");
        const merlinText = await merlinResponse.text();
        const merlinData = Papa.parse<Record<string, string>>(merlinText, {
          header: true,
          skipEmptyLines: true,
        }).data;

        const merlinObservations: Observation[] = merlinData
          .map(parseMerlinRow)
          .filter((obs): obs is Observation => obs !== null);

        const joinedObservations = [...tziporiObservations, ...merlinObservations];
        setObservations(joinedObservations);

        // Compute absolute dataset date bounds and initialise default filters
        let minTs = Infinity;
        let maxTs = -Infinity;
        const yearsInData = new Set<string>();
        const groupsInData = new Set<string>();
        for (const obs of joinedObservations) {
          const d = obs.observed_on;
          if (!d || d.length < 10) continue;
          const parts = d.split('/');
          if (parts.length !== 3) continue;
          const day = parseInt(parts[0], 10);
          const month = parseInt(parts[1], 10) - 1; // JS months 0-indexed
          const year = parseInt(parts[2], 10);
          if (isNaN(day) || isNaN(month) || isNaN(year)) continue;
          const ts = new Date(year, month, day).getTime();
          if (ts < minTs) minTs = ts;
          if (ts > maxTs) maxTs = ts;
          yearsInData.add(parts[2]);
          if (obs.user_category) groupsInData.add(obs.user_category);
        }

        if (minTs !== Infinity) {
          const startYear = new Date(minTs).getFullYear();
          const endYear = new Date(maxTs).getFullYear();
          const boundsStart = new Date(startYear, 0, 1).getTime();
          const boundsEnd = new Date(endYear, 11, 31, 23, 59, 59, 999).getTime();
          setDatasetBounds({ start: boundsStart, end: boundsEnd });

          // Default: all years checked, dateRange spans full dataset
          const defaultTime = new Map<string, Set<string>>();
          for (const y of yearsInData) {
            defaultTime.set(y, new Set());
          }
          groupsInData.add("expert"); // Always include Professional Monitoring
          setFilters((prev) => ({
            ...prev,
            time: defaultTime,
            dateRange: { start: boundsStart, end: boundsEnd },
            groups: new Set(groupsInData),
          }));
        }
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };

    loadData();
  }, []);

  const value = useMemo(
    () => ({ observations, setObservations, filters, setFilters, toggleSpeciesType, setDateRange, datasetBounds, deepDive, deepDiveActions }),
    [observations, filters, toggleSpeciesType, setDateRange, datasetBounds, deepDive, deepDiveActions],
  );
  return <ObservationsCtx.Provider value={value}>{children}</ObservationsCtx.Provider>;
}

export function useObservations() {
  const c = useContext(ObservationsCtx);
  if (!c) throw new Error("useObservations must be used within ObservationsProvider");
  return c;
}
