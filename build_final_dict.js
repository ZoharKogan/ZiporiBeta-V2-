const fs = require('fs');
const Papa = require('papaparse');
const path = require('path');

const base = __dirname;
const csvText = fs.readFileSync(path.join(base, 'public/Tzipori_2325.csv'), 'utf8');
const parsed = Papa.parse(csvText, { header: true, skipEmptyLines: true });
const rows = parsed.data;

const dict = JSON.parse(fs.readFileSync(path.join(base, 'species_dictionary.json'), 'utf8'));
const dictMap = new Map();
dict.forEach((e) => dictMap.set(e.Scientific_Name, e));

const butterflyTaxa = new Set(['Lepidoptera', 'Papilionoidea', 'Hesperioidea']);
const butterflyFamilies = new Set([
  'Nymphalidae', 'Pieridae', 'Lycaenidae', 'Hesperiidae', 'Papilionidae',
  'Noctuidae', 'Erebidae', 'Geometridae', 'Pyralidae',
]);
const dragonflyTaxa = new Set(['Odonata', 'Zygoptera', 'Anisoptera']);
const dragonflyFamilies = new Set([
  'Libellulidae', 'Aeshnidae', 'Gomphidae', 'Coenagrionidae', 'Calopterygidae',
  'Lestidae', 'Corduliidae', 'Platycnemididae',
]);

const HEBREW = /[א-ת]/;

function classify(r) {
  const sci = r.scientific_name ? r.scientific_name.trim() : '';
  const iconic = r.iconic_taxon_name ? r.iconic_taxon_name.trim() : '';
  const order = r.taxon_order_name ? r.taxon_order_name.trim() : '';

  if (dictMap.has(sci)) {
    return dictMap.get(sci).Category;
  }
  if (iconic === 'Aves') return 'עופות';
  if (iconic === 'Mammalia') return 'יונקים';
  if (butterflyTaxa.has(order) || butterflyFamilies.has(sci)) return 'פרפרים';
  if (dragonflyTaxa.has(order) || dragonflyFamilies.has(sci)) return 'שפיראים';
  return 'שאר המינים';
}

function getNames(sci, r) {
  if (dictMap.has(sci)) {
    const e = dictMap.get(sci);
    return { Hebrew_Name: e.Hebrew_Name, English_Name: e.English_Name };
  }
  const common = r.common_name ? r.common_name.trim() : '';
  if (HEBREW.test(common)) {
    return { Hebrew_Name: common, English_Name: sci };
  }
  if (common) {
    return { Hebrew_Name: sci, English_Name: common };
  }
  return { Hebrew_Name: sci, English_Name: sci };
}

const speciesInfo = new Map();
rows.forEach((r) => {
  const sci = r.scientific_name ? r.scientific_name.trim() : '';
  if (!sci) return;
  if (!speciesInfo.has(sci)) {
    const cat = classify(r);
    const names = getNames(sci, r);
    speciesInfo.set(sci, {
      Scientific_Name: sci,
      Category: cat,
      Hebrew_Name: names.Hebrew_Name,
      English_Name: names.English_Name,
      count: 0,
    });
  }
  speciesInfo.get(sci).count += 1;
});

const categories = ['עופות', 'יונקים', 'פרפרים', 'שפיראים', 'שאר המינים'];
const summary = categories.map((cat) => {
  const species = Array.from(speciesInfo.values()).filter((s) => s.Category === cat);
  const count = species.length;
  const obs = species.reduce((sum, s) => sum + s.count, 0);
  return { Category: cat, Count: count, Observations: obs };
});

const escapeCsv = (s) => {
  const str = String(s == null ? '' : s);
  if (str.includes(',') || str.includes('"') || str.includes('\n')) {
    return '"' + str.replace(/"/g, '""') + '"';
  }
  return str;
};

const outLines = ['Scientific_Name,Category,Hebrew_Name,English_Name'];
Array.from(speciesInfo.values())
  .sort((a, b) => a.Scientific_Name.localeCompare(b.Scientific_Name))
  .forEach((s) => {
    outLines.push([s.Scientific_Name, s.Category, s.Hebrew_Name, s.English_Name].map(escapeCsv).join(','));
  });

fs.writeFileSync(path.join(base, 'final_species_dictionary.csv'), outLines.join('\n'), 'utf8');

console.log('=== final_species_dictionary.csv Summary ===');
console.log('Category          | Count of Species | Total Observations');
console.log('-----------------------------------------------------------');
summary.forEach((s) => {
  console.log(
    (s.Category + '              ').slice(0, 18) +
      '| ' +
      (s.Count + '                ').slice(0, 17) +
      '| ' +
      s.Observations
  );
});
console.log(
  'Total             | ' +
    summary.reduce((a, s) => a + s.Count, 0) +
    '             | ' +
    summary.reduce((a, s) => a + s.Observations, 0)
);
