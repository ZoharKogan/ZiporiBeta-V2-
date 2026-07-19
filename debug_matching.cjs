const fs = require('fs');
const Papa = require('papaparse');
const path = require('path');

const base = __dirname;
const csvPath = path.join(base, 'public', 'Tzipori_2325.csv');
const speciesMapPath = path.join(base, 'src', 'lib', 'species-map.ts');

// Parse CSV
const csvText = fs.readFileSync(csvPath, 'utf8');
const parsed = Papa.parse(csvText, { header: true, skipEmptyLines: true });
const rows = parsed.data;

// Extract rawSpeciesMap object from species-map.ts (it's valid JSON) and rebuild the flat speciesMap array
const tsText = fs.readFileSync(speciesMapPath, 'utf8');
const rawMatch = tsText.match(/const rawSpeciesMap = (\{[\s\S]*?\n\});/);
if (!rawMatch) {
  console.error('Could not extract rawSpeciesMap from species-map.ts');
  process.exit(1);
}
const rawSpeciesMap = JSON.parse(rawMatch[1]);
const speciesMap = Object.entries(rawSpeciesMap).flatMap(([category, entries]) =>
  (entries || []).map((entry) => ({
    Scientific_Name: entry.scientific_name,
    Category: category,
    Hebrew_Name: entry.hebrew_name,
    English_Name: entry.english_name,
  }))
);
const speciesMapBySci = new Map(speciesMap.map((e) => [e.Scientific_Name, e.Category]));

const categoryToGroup = {
  'עופות': 'birds',
  'יונקים': 'mammals',
  'פרפרים': 'butterflies',
  'שפיראים': 'dragonflies',
};

function resolveGroup(row) {
  const sci = row.scientific_name ? row.scientific_name.trim() : '';
  if (sci) {
    const cat = speciesMapBySci.get(sci);
    if (cat) return categoryToGroup[cat] || 'other';
  }
  return 'other';
}

const summary = { birds: 0, mammals: 0, butterflies: 0, dragonflies: 0, other: 0 };
const uniqueSpeciesPerGroup = {
  birds: new Set(),
  mammals: new Set(),
  butterflies: new Set(),
  dragonflies: new Set(),
  other: new Set(),
};

const matchedButterflies = new Map();
const matchedDragonflies = new Map();
const failedInsects = new Map(); // sci -> { count, order, iconic, inMapCategory }

rows.forEach((row) => {
  const sci = (row.scientific_name || '').trim();
  if (!sci) return;

  const group = resolveGroup(row);
  summary[group]++;
  uniqueSpeciesPerGroup[group].add(sci);

  const order = (row.taxon_order_name || '').trim();
  const iconic = (row.iconic_taxon_name || '').trim();
  const mapCategory = speciesMapBySci.get(sci) || null;

  const isInsecta = order === 'Lepidoptera' || order === 'Odonata' || iconic === 'Insecta';
  if (!isInsecta) return;

  if (group === 'butterflies') {
    matchedButterflies.set(sci, (matchedButterflies.get(sci) || 0) + 1);
  } else if (group === 'dragonflies') {
    matchedDragonflies.set(sci, (matchedDragonflies.get(sci) || 0) + 1);
  } else {
    // Failed: expected insect (possibly butterfly/dragonfly) but resolved to 'other'
    const existing = failedInsects.get(sci);
    if (existing) {
      existing.count++;
    } else {
      failedInsects.set(sci, { count: 1, order, iconic, inMapCategory: mapCategory });
    }
  }
});

console.log('=== Map-only resolution summary (based on speciesMap lookup) ===');
console.log('Group            | Observations | Unique species');
console.log('-----------------|-------------|---------------');
console.log(`birds            | ${summary.birds.toString().padStart(12)} | ${uniqueSpeciesPerGroup.birds.size.toString().padStart(14)}`);
console.log(`mammals          | ${summary.mammals.toString().padStart(12)} | ${uniqueSpeciesPerGroup.mammals.size.toString().padStart(14)}`);
console.log(`butterflies      | ${summary.butterflies.toString().padStart(12)} | ${uniqueSpeciesPerGroup.butterflies.size.toString().padStart(14)}`);
console.log(`dragonflies      | ${summary.dragonflies.toString().padStart(12)} | ${uniqueSpeciesPerGroup.dragonflies.size.toString().padStart(14)}`);
console.log(`other            | ${summary.other.toString().padStart(12)} | ${uniqueSpeciesPerGroup.other.size.toString().padStart(14)}`);
console.log(`Total            | ${rows.length.toString().padStart(12)} |`);
console.log('');

console.log('=== Successful butterfly matches (in speciesMap as butterflies) ===');
console.log(`Unique species: ${matchedButterflies.size}, Observations: ${[...matchedButterflies.values()].reduce((a, b) => a + b, 0)}`);
[...matchedButterflies.entries()].sort((a, b) => b[1] - a[1]).forEach(([sci, count]) => {
  console.log(`  ${count.toString().padStart(3)}x ${sci}`);
});
console.log('');

console.log('=== Successful dragonfly matches (in speciesMap as dragonflies) ===');
console.log(`Unique species: ${matchedDragonflies.size}, Observations: ${[...matchedDragonflies.values()].reduce((a, b) => a + b, 0)}`);
[...matchedDragonflies.entries()].sort((a, b) => b[1] - a[1]).forEach(([sci, count]) => {
  console.log(`  ${count.toString().padStart(3)}x ${sci}`);
});
console.log('');

console.log('=== FAILED Insecta matches (Lepidoptera / Odonata / Insecta that fell to "other") ===');
console.log(`Unique species: ${failedInsects.size}, Total observations: ${[...failedInsects.values()].reduce((a, v) => a + v.count, 0)}`);
console.log('(Format: count order iconic mapCategory scientific_name)');
const categoryLabel = {
  'פרפרים': 'butterflies',
  'שפיראים': 'dragonflies',
  'עופות': 'birds',
  'יונקים': 'mammals',
  'חרקים אחרים': 'other_insects',
};
[...failedInsects.entries()].sort((a, b) => b[1].count - a[1].count).forEach(([sci, info]) => {
  const order = info.order || '?';
  const iconic = info.iconic || '?';
  const mapCat = info.inMapCategory ? categoryLabel[info.inMapCategory] || info.inMapCategory : 'NOT_IN_MAP';
  console.log(`  ${info.count.toString().padStart(3)}x ${order.padEnd(12)} ${iconic.padEnd(10)} ${mapCat.padEnd(14)} ${sci}`);
});
