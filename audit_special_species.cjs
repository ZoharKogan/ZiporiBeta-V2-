const fs = require("fs");
const path = require("path");

const csvPath = path.join(__dirname, "public", "Tzipori_2325.csv");
const raw = fs.readFileSync(csvPath, "utf-8");
const lines = raw.split(/\r?\n/).filter((line) => line.trim());
const headers = lines[0].split(",").map((h) => h.trim().replace(/^"|"$/g, ""));

const sciIndex = headers.indexOf("scientific_name");
if (sciIndex === -1) {
  console.error("scientific_name column not found in CSV");
  process.exit(1);
}

const parseRow = (line) => {
  const result = [];
  let current = "";
  let inQuotes = false;
  for (const char of line) {
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim().replace(/^"|"$/g, ""));
      current = "";
    } else {
      current += char;
    }
  }
  result.push(current.trim().replace(/^"|"$/g, ""));
  return result;
};

const specialSpecies = [
  // Invasive species
  { sci: "Papilio demoleus", he: "זנב סנונית הלימון", category: "invasive" },
  { sci: "Myocastor coypus", he: "נוטריה", category: "invasive" },
  { sci: "Acridotheres tristis", he: "מיינה הודית", category: "invasive" },
  { sci: "Psittacula krameri", he: "דררה", category: "invasive" },
  { sci: "Myiopsitta monachus", he: "תוכי נזירי", category: "invasive" },
  // Rare species
  { sci: "Borbo borbonica", he: "הספרית ביצות", category: "rare" },
  { sci: "Felis chaus", he: "חתול ביצות", category: "rare" },
  { sci: "Lutra lutra", he: "לוטרה", category: "rare" },
  { sci: "Ischnura pumilio", he: "שלחית זעירה", category: "rare" },
  { sci: "Anax imperator", he: "חניתית היאור", category: "rare" },
  { sci: "Crocothemis erythraea", he: "תכשיתית זוהרת", category: "rare" },
];

const counts = new Map(specialSpecies.map((s) => [s.sci, 0]));
const foundExact = new Set();
const foundPartial = new Set();

for (let i = 1; i < lines.length; i++) {
  const row = parseRow(lines[i]);
  const sciName = row[sciIndex] || "";
  const normalized = sciName.trim().toLowerCase();
  if (!normalized) continue;

  for (const special of specialSpecies) {
    const specialLower = special.sci.toLowerCase();
    if (normalized === specialLower) {
      counts.set(special.sci, (counts.get(special.sci) || 0) + 1);
      foundExact.add(special.sci);
    } else if (normalized.includes(specialLower)) {
      counts.set(special.sci, (counts.get(special.sci) || 0) + 1);
      foundPartial.add(special.sci);
    }
  }
}

console.log("| Special Species | Count in CSV | Found Status |");
console.log("|-----------------|--------------|--------------|");
let totalInvasive = 0;
let totalRare = 0;

for (const special of specialSpecies) {
  const count = counts.get(special.sci) || 0;
  let status = "Not found";
  if (count > 0) {
    if (foundExact.has(special.sci) && foundPartial.has(special.sci)) {
      status = "Exact + Partial match";
    } else if (foundExact.has(special.sci)) {
      status = "Exact match";
    } else if (foundPartial.has(special.sci)) {
      status = "Partial match";
    }
  }
  const display = `${special.sci} (${special.he})`;
  console.log(`| ${display.padEnd(47)} | ${String(count).padStart(12)} | ${status.padStart(12)} |`);

  if (special.category === "invasive") totalInvasive += count;
  if (special.category === "rare") totalRare += count;
}

console.log("\nSummary:");
console.log(`Total invasive observations: ${totalInvasive}`);
console.log(`Total rare observations: ${totalRare}`);
