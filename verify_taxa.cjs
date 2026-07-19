/**
 * Verification: does the speciesMap + getTaxaGroup logic correctly classify
 * the 11 special species?
 */

const rawSpeciesMap = {
  "פרפרים": [
    { scientific_name: "Borbo borbonica" },
    { scientific_name: "Papilio demoleus" },
  ],
  "שפיראים": [
    { scientific_name: "Ischnura pumilio" },
    { scientific_name: "Anax imperator" },
    { scientific_name: "Crocothemis erythraea" },
    { scientific_name: "Trithemis annulata" },
    { scientific_name: "Odonata" },
  ],
  "עופות": [
    { scientific_name: "Aves" },
    { scientific_name: "Acridotheres tristis" },
    { scientific_name: "Psittacula krameri" },
    { scientific_name: "Myiopsitta monachus" },
  ],
  "יונקים": [
    { scientific_name: "Mammalia" },
    { scientific_name: "Myocastor coypus" },
    { scientific_name: "Felis chaus" },
    { scientific_name: "Lutra lutra" },
  ],
};

const CAT_TO_GROUP = {
  "פרפרים": "butterflies",
  "שפיראים": "dragonflies",
  "עופות": "birds",
  "יונקים": "mammals",
};

const sciToGroup = new Map();
for (const [cat, entries] of Object.entries(rawSpeciesMap)) {
  const group = CAT_TO_GROUP[cat];
  if (group) {
    for (const e of entries) {
      sciToGroup.set(e.scientific_name, group);
    }
  }
}

function getTaxaGroup(scientificName, iconicTaxonName) {
  const fromMap = sciToGroup.get(scientificName);
  if (fromMap) return fromMap;
  if (iconicTaxonName === "Aves") return "birds";
  if (iconicTaxonName === "Mammalia") return "mammals";
  return "other";
}

const tests = [
  { sci: "Crocothemis erythraea", iconic: "Insecta", expected: "dragonflies" },
  { sci: "Anax imperator",        iconic: "Insecta", expected: "dragonflies" },
  { sci: "Ischnura pumilio",      iconic: "Insecta", expected: "dragonflies" },
  { sci: "Acridotheres tristis",  iconic: "Aves",    expected: "birds" },
  { sci: "Psittacula krameri",    iconic: "Aves",    expected: "birds" },
  { sci: "Myiopsitta monachus",   iconic: "Aves",    expected: "birds" },
  { sci: "Myocastor coypus",      iconic: "Mammalia",expected: "mammals" },
  { sci: "Felis chaus",           iconic: "Mammalia",expected: "mammals" },
  { sci: "Lutra lutra",           iconic: "Mammalia",expected: "mammals" },
  { sci: "Papilio demoleus",      iconic: "Insecta", expected: "butterflies" },
  { sci: "Borbo borbonica",       iconic: "Insecta", expected: "butterflies" },
];

let pass = 0, fail = 0;
console.log("Species Verification Report");
console.log("=".repeat(60));
for (const t of tests) {
  const result = getTaxaGroup(t.sci, t.iconic);
  const ok = result === t.expected;
  console.log(`${ok ? "PASS" : "FAIL"} | ${t.sci.padEnd(28)} | got: ${result.padEnd(11)} | expected: ${t.expected}`);
  ok ? pass++ : fail++;
}
console.log("=".repeat(60));
console.log(`Result: ${pass}/${tests.length} passed${fail > 0 ? ` (${fail} FAILED)` : " — all correct"}`);
