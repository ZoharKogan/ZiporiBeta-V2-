/**
 * Merge new Merlin species into master-species-map.ts.
 * Reads public/MERLIN butterflies and mammals observations for Zohar.csv
 * and adds any missing scientific names to src/lib/master-species-map.ts.
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import Papa from "papaparse";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

const MERLIN_PATH = path.join(ROOT, "public", "MERLIN butterflies and mammals observations for Zohar.csv");
const MAP_PATH = path.join(ROOT, "src", "lib", "master-species-map.ts");

const FAMILY_TO_CATEGORY = {
  Hesperiidae: "פרפרים",
  Pieridae: "פרפרים",
  Lycaenidae: "פרפרים",
  Papilionidae: "פרפרים",
  Nymphalidae: "פרפרים",
  Mustelidae: "יונקים",
  Hystricidae: "יונקים",
  Canidae: "יונקים",
  Herpestidae: "יונקים",
  Leporidae: "יונקים",
  Suidae: "יונקים",
};

// 1. Load Merlin CSV
const merlinText = fs.readFileSync(MERLIN_PATH, "utf-8");
const merlinParsed = Papa.parse(merlinText, { header: true, skipEmptyLines: true });

const merlinSpecies = new Map();
for (const row of merlinParsed.data) {
  const sci = (row.scientificName || "").trim();
  const family = (row.family || "").trim();
  let heb = (row.vernacularName || "").trim();
  // Use the first name if multiple separated by | or /
  heb = heb.split(/\s*[|/]\s*/)[0] || "";
  if (!sci) continue;
  if (!merlinSpecies.has(sci)) {
    merlinSpecies.set(sci, { family, heb });
  }
}
console.log(`Loaded ${merlinSpecies.size} unique Merlin species`);

// 2. Read current master map
const mapText = fs.readFileSync(MAP_PATH, "utf-8");
const entryRegex = /m\(\{ scientific_name: "([^"]+)", canonical_category: "([^"]*)", hebrew_name: "([^"]*)", english_name: "([^"]*)", isGeneric: (true|false) \}\)/g;
const entries = [...mapText.matchAll(entryRegex)].map((m) => ({
  scientific_name: m[1],
  canonical_category: m[2],
  hebrew_name: m[3],
  english_name: m[4],
  isGeneric: m[5] === "true",
}));
console.log(`Parsed ${entries.length} entries from master-species-map.ts`);

const existingSci = new Set(entries.map((e) => e.scientific_name.toLowerCase()));
let added = 0;

for (const [sci, info] of merlinSpecies) {
  if (existingSci.has(sci.toLowerCase())) continue;
  const category = FAMILY_TO_CATEGORY[info.family] || "שאר המינים";
  entries.push({
    scientific_name: sci,
    canonical_category: category,
    hebrew_name: info.heb,
    english_name: "",
    isGeneric: false,
  });
  existingSci.add(sci.toLowerCase());
  added++;
}

console.log(`Added ${added} new species from Merlin`);

// 3. Sort and rewrite
entries.sort((a, b) => a.scientific_name.localeCompare(b.scientific_name));

const lines = entries.map(
  (e) =>
    `  m({ scientific_name: ${JSON.stringify(e.scientific_name)}, canonical_category: ${JSON.stringify(
      e.canonical_category
    )}, hebrew_name: ${JSON.stringify(e.hebrew_name)}, english_name: ${JSON.stringify(
      e.english_name
    )}, isGeneric: ${e.isGeneric ? "true" : "false"} })`
);

const fileContent = `/**
 * Master species map generated from public/Tzipori_2325.csv and enriched from species_master_list.csv.
 * Additionally merged with species from MERLIN butterflies and mammals observations for Zohar.csv.
 *
 * This is the single source of truth used by taxonomy-engine.ts.
 * Each entry maps a scientific_name to its canonical Hebrew category and display names.
 * isGeneric=true marks observations that are not identified to species level.
 */

export type MasterSpeciesEntry = {
  scientific_name: string;
  canonical_category: string;
  hebrew_name: string;
  english_name: string;
  isGeneric: boolean;
};

function m(entry: MasterSpeciesEntry): MasterSpeciesEntry {
  return entry;
}

export const masterSpeciesMap: MasterSpeciesEntry[] = [
${lines.join(",\n")}
];
`;

fs.writeFileSync(MAP_PATH, fileContent, "utf-8");
console.log(`Wrote ${entries.length} entries to ${MAP_PATH}`);
