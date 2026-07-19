import fs from "fs";
import Papa from "papaparse";

const merlinText = fs.readFileSync("./public/MERLIN butterflies and mammals observations for Zohar.csv", "utf8");
const merlinData = Papa.parse(merlinText, { header: true, skipEmptyLines: true }).data;
const merlinSpecies = new Set(merlinData.map(r => r.scientificName).filter(Boolean));
const merlinObservers = new Set(merlinData.map(r => r.personName || r.recordedBy).filter(Boolean));

const tzText = fs.readFileSync("./public/Tzipori_2325.csv", "utf8");
const tzData = Papa.parse(tzText, { header: true, skipEmptyLines: true }).data;

const masterText = fs.readFileSync("./src/lib/master-species-map.ts", "utf8");
const missing = [...merlinSpecies].filter(s => !masterText.includes(`"${s}"`));

console.log("=== DATA INGESTION ===");
console.log("Merlin rows:", merlinData.length);
console.log("Merlin unique species:", merlinSpecies.size);
console.log("Merlin unique observers:", merlinObservers.size, [...merlinObservers]);
console.log("Tzipori rows:", tzData.length);
console.log("Combined expected rows:", merlinData.length + tzData.length);

console.log("\n=== TAXONOMY COMPLETENESS ===");
console.log("Merlin species missing from master map:", missing.length);
if (missing.length > 0) console.log(missing.join("\n"));

const genericInMaster = [...merlinSpecies].filter(s => masterText.includes(`scientific_name: "${s}"`) && masterText.includes("isGeneric: true"));
console.log("Merlin species marked isGeneric=true in master map:", genericInMaster.length);

console.log("\n=== SAMPLE MERLIN SPECIES ===");
const sample = merlinData.slice(0, 5).map(r => ({ sci: r.scientificName, heb: r.vernacularName, family: r.family, obs: r.personName }));
console.log(JSON.stringify(sample, null, 2));
