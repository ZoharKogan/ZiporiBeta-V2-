import fs from "fs";
import Papa from "papaparse";

const merlinText = fs.readFileSync("./public/MERLIN butterflies and mammals observations for Zohar.csv", "utf8");
const merlinData = Papa.parse(merlinText, { header: true, skipEmptyLines: true }).data;
const merlinSpecies = [...new Set(merlinData.map((r) => r.scientificName).filter(Boolean))];
console.log("Merlin unique species:", merlinSpecies.length);

const masterText = fs.readFileSync("./src/lib/master-species-map.ts", "utf8");
const missing = merlinSpecies.filter((s) => !masterText.includes(s));
console.log("Missing in master map:", missing.length);
console.log(missing.join("\n"));
