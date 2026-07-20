import fs from "node:fs";
import Papa from "papaparse";

const normalize = (value) => String(value ?? "").trim();
const isValid = (value) => value && !["null", "nan"].includes(value.toLowerCase());
const mapPath = "src/lib/species-map.ts";
const merlinPath = "public/MERLIN all except Odonta observations for Zohar.csv";

let source = fs.readFileSync(mapPath, "utf8");
const existingSpecies = new Set(
  [...source.matchAll(/"scientific_name": "([^"]+)"/g)].map((match) =>
    match[1].trim().toLowerCase(),
  ),
);
const merlinRows = Papa.parse(fs.readFileSync(merlinPath, "utf8"), {
  header: true,
  skipEmptyLines: true,
}).data;

const familiesByCategory = {
  "עופות": new Set([
    "Columbidae",
    "Ardeidae",
    "Corvidae",
    "Cisticolidae",
    "Charadriidae",
    "Alcedinidae",
    "Hirundinidae",
    "Paridae",
    "Pycnonotidae",
    "Sylviidae",
    "Fringillidae",
    "Acrocephalidae",
    "Phasianidae",
    "Turdidae",
    "Accipitridae",
    "Cuculidae",
    "Laniidae",
    "Motacillidae",
    "Meropidae",
    "Nectariniidae",
  ]),
  "יונקים": new Set([
    "Canidae",
    "Mustelidae",
    "Hystricidae",
    "Herpestidae",
    "Leporidae",
    "Suidae",
  ]),
  "פרפרים": new Set([
    "Hesperiidae",
    "Pieridae",
    "Lycaenidae",
    "Papilionidae",
    "Nymphalidae",
  ]),
};

function categoryFor(family) {
  return (
    Object.entries(familiesByCategory).find(([, families]) => families.has(family))?.[0] ??
    "שאר המינים"
  );
}

const additions = new Map();
for (const row of merlinRows) {
  const scientificName = normalize(row.scientificName);
  if (!isValid(scientificName)) continue;

  const key = scientificName.toLowerCase();
  if (existingSpecies.has(key)) continue;
  existingSpecies.add(key);

  const category = categoryFor(normalize(row.family));
  const entry = {
    scientificName,
    hebrewName: normalize(row.vernacularName),
  };
  additions.set(category, [...(additions.get(category) ?? []), entry]);
}

for (const [category, entries] of additions) {
  entries.sort((a, b) => a.scientificName.localeCompare(b.scientificName));

  const categoryStart = source.indexOf(`  "${category}": [`);
  if (categoryStart === -1) throw new Error(`Category not found: ${category}`);

  const categoryEnd = source.indexOf("\n  ],", categoryStart);
  if (categoryEnd === -1) throw new Error(`Category end not found: ${category}`);

  const beforeCategoryEnd = source.slice(0, categoryEnd);
  const comma = beforeCategoryEnd.trimEnd().endsWith(",") ? "" : ",";
  const entryLines = entries
    .map(
      ({ scientificName, hebrewName }) =>
        `    { "scientific_name": ${JSON.stringify(scientificName)}, "hebrew_name": ${JSON.stringify(hebrewName)}, "english_name": "" },`,
    )
    .join("\n");

  source = `${beforeCategoryEnd}${comma}\n${entryLines}${source.slice(categoryEnd)}`;
}

fs.writeFileSync(mapPath, source);
console.log(
  JSON.stringify(
    Object.fromEntries([...additions].map(([category, entries]) => [category, entries.length])),
  ),
);
