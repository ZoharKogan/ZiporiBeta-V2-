import fs from 'node:fs';
import path from 'node:path';
import Papa from 'papaparse';

const ROOT = 'c:\\Users\\zohar\\Desktop\\eco-watch-insight-main\\eco-watch-insight-main';
const MD = path.join(ROOT, 'tmp-species-from-csvs.md');
const TS_OUT = path.join(ROOT, 'src', 'lib', 'species-map.ts');
const MASTER = path.join(ROOT, 'src', 'lib', 'master-species-map.ts');
const DICT = path.join(ROOT, 'species_dictionary.json');
const CSV = path.join(ROOT, 'species_master_list.csv');
const CURRENT = path.join(ROOT, 'src', 'lib', 'species-map.ts');

const cp1255Decoder = new TextDecoder('windows-1255');
const cp1255ToByte = new Map();
for (let b = 0; b <= 255; b++) {
  cp1255ToByte.set(cp1255Decoder.decode(new Uint8Array([b])), b);
}

function recoverHebrew(s) {
  const bytes = [];
  for (const ch of s) {
    if (!cp1255ToByte.has(ch)) return s;
    bytes.push(cp1255ToByte.get(ch));
  }
  const recovered = new TextDecoder('utf-8').decode(new Uint8Array(bytes));
  return recovered.includes('\uFFFD') ? s : recovered;
}

function parseMCall(line) {
  const obj = {};
  const re = /(\w+):\s*"([^"]*)"/g;
  let m;
  while ((m = re.exec(line)) !== null) {
    obj[m[1]] = m[2];
  }
  return obj;
}

function parseCurrentSpeciesMap(text) {
  const map = new Map();
  const catRe = /"([^"]+)":\s*\[/g;
  let cm;
  while ((cm = catRe.exec(text)) !== null) {
    const category = cm[1];
    const start = cm.index + cm[0].length;
    const end = text.indexOf(']', start);
    const block = text.slice(start, end);
    const objRe = /\{\s*"scientific_name":\s*"([^"]+)"(?:[\s\S]*?)\}/g;
    let om;
    while ((om = objRe.exec(block)) !== null) {
      const objText = om[0];
      const scientific_name = om[1];
      const he = (objText.match(/"hebrew_name":\s*"([^"]*)"/) || [])[1] ?? '';
      const en = (objText.match(/"english_name":\s*"([^"]*)"/) || [])[1] ?? '';
      const key = scientific_name.trim().toLowerCase();
      const existing = map.get(key) || {};
      map.set(key, {
        hebrew_name: he || existing.hebrew_name || '',
        english_name: en || existing.english_name || '',
        category: category,
      });
    }
  }
  return map;
}

function parseMasterSpeciesMap(text) {
  const map = new Map();
  const lines = text.split('\n');
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed.startsWith('m({') || !trimmed.endsWith('}),')) continue;
    const obj = parseMCall(trimmed);
    const sn = (obj.scientific_name || '').trim();
    if (!sn) continue;
    const key = sn.toLowerCase();
    const he = recoverHebrew(obj.hebrew_name || '');
    const en = obj.english_name || '';
    const isGeneric = obj.isGeneric === 'true';
    map.set(key, { scientific_name: sn, hebrew_name: he, english_name: en, isGeneric, category: obj.canonical_category || '' });
  }
  return map;
}

function titleCaseScientific(sn) {
  return sn.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

function isGenericName(sn) {
  const w = sn.trim();
  if (!w.includes(' ')) return true;
  const lower = w.toLowerCase();
  if (/\b(family|subfamily|order|class|phylum|tribe|genus)\b/.test(lower)) return true;
  if (/\b(famil[yi]|subfamily|ordo|genus)\b/.test(lower)) return true;
  if (/\b(spp\.|sp\.|complex|group)\b/i.test(lower)) return true;
  if (/idae$|inae$|aceae$|ales$|oidea$|formes$|atae$|ini$|inae$|opsida$|phyta$|mycetes$|mycetidae$|myces$|idea$|oidea$|alia$|anae$|ae$/.test(w)) return true;
  return false;
}

// Read markdown list (canonical grouping)
const mdText = fs.readFileSync(MD, 'utf8');
const mdCategories = [];
let currentCategory = null;
let currentItems = [];
for (const line of mdText.split('\n')) {
  if (line.startsWith('# ')) {
    if (currentCategory) mdCategories.push({ category: currentCategory, items: currentItems });
    currentCategory = line.replace(/^#\s+/, '').replace(/\s*\(\d+\)\s*$/, '');
    currentItems = [];
  } else if (line.startsWith('- ')) {
    const rest = line.replace(/^-\s+/, '');
    const parts = rest.split(/\s+—\s+/);
    const scientific_name = parts[0].trim();
    const hebrew_name = parts[1] ? parts[1].trim() : '';
    currentItems.push({ scientific_name, hebrew_name });
  }
}
if (currentCategory) mdCategories.push({ category: currentCategory, items: currentItems });

// Read sources
const masterMap = parseMasterSpeciesMap(fs.readFileSync(MASTER, 'utf8'));
const currentMap = parseCurrentSpeciesMap(fs.readFileSync(CURRENT, 'utf8'));
const dictArr = JSON.parse(fs.readFileSync(DICT, 'utf8'));
const dictMap = new Map();
for (const e of dictArr) {
  const key = (e.Scientific_Name || e.scientific_name || '').trim().toLowerCase();
  if (!key) continue;
  const existing = dictMap.get(key) || {};
  dictMap.set(key, {
    hebrew_name: (e.Hebrew_Name || e.hebrew_name || existing.hebrew_name || '').trim(),
    english_name: (e.English_Name || e.english_name || existing.english_name || '').trim(),
  });
}
const csvText = fs.readFileSync(CSV, 'utf8');
const csvData = Papa.parse(csvText, { header: true, skipEmptyLines: true }).data;
const csvMap = new Map();
for (const row of csvData) {
  const sn = (row['Scientific Name'] || row.scientific_name || '').trim();
  const he = (row['Hebrew Name'] || row.hebrew_name || '').trim();
  if (!sn) continue;
  const key = sn.toLowerCase();
  const existing = csvMap.get(key) || {};
  csvMap.set(key, { hebrew_name: he || existing.hebrew_name || '' });
}

const overrides = {
  // Birds
  'acridotheres tristis tristis': { hebrew_name: 'מיינה מצויה (תת-מין)', english_name: 'Common Myna Subspecies' },
  'anas': { hebrew_name: 'ברווז (סוג)', english_name: 'Ducks' },
  'ardea': { hebrew_name: 'אנפה (סוג)', english_name: 'Herons' },
  'ardeinae': { hebrew_name: 'אנפות (תת-משפחה)', english_name: 'True Herons', isGeneric: true },
  'columba': { hebrew_name: 'יונה (סוג)', english_name: 'Pigeons' },
  'corvus': { hebrew_name: 'עורב (סוג)', english_name: 'Crows' },
  'garrulus glandarius': { hebrew_name: 'עורבני שחור-כיפה', english_name: 'Eurasian Jay' },
  'larus': { hebrew_name: 'שחף (סוג)', english_name: 'Gulls' },
  'saxicola': { hebrew_name: 'דוחל (סוג)', english_name: 'Stonechats' },
  'streptopelia': { hebrew_name: 'תור (סוג)', english_name: 'Turtle Doves' },
  // Mammals generic ranks
  'canis': { hebrew_name: 'כלב (סוג)', english_name: 'Canis' },
  'hystrix': { hebrew_name: 'דורבן (סוג)', english_name: 'Hystrix' },
  'nannospalax': { hebrew_name: 'חולד (סוג)', english_name: 'Nannospalax' },
  'vulpes': { hebrew_name: 'שועל (סוג)', english_name: 'Vulpes' },
  // Plants with blanks
  'agave': { hebrew_name: 'אגבה', english_name: 'Agave' },
  'alopecurus': { hebrew_name: 'זנב-שועל', english_name: 'Alopecurus' },
  'beta': { hebrew_name: 'סלק', english_name: 'Beta' },
  // Moths/insects requested
  'acanthovalva inconspicuaria': { hebrew_name: 'אקנתובלבה אינקונספיקואריה', english_name: 'Geometrid Moth' },
  'acontia lucida': { hebrew_name: 'אקונטיה לוסידה', english_name: 'Pale Shoulder Moth' },
  'adscita statices': { hebrew_name: 'אדסקיטה סטטיקס', english_name: 'The Forester Moth' },
  'aglossa aglossalis': { hebrew_name: 'אגלוסה אגלוסליס', english_name: 'Pyralid Moth' },
  'agriphila beieri': { hebrew_name: 'אגריפילה ביירי', english_name: 'Crambid Moth' },
  'odites kollarella': { hebrew_name: 'אודיטס קולרלה', english_name: 'Depressariid Moth' },
};

function resolveEntry(item, category) {
  const sn = item.scientific_name;
  const key = sn.toLowerCase();
  const master = masterMap.get(key) || {};
  const cur = currentMap.get(key) || {};
  const dict = dictMap.get(key) || {};
  const csv = csvMap.get(key) || {};
  const over = overrides[key] || {};

  // Hebrew priority: override > dictionary > current > csv > master recovered > markdown
  let he = over.hebrew_name || dict.hebrew_name || cur.hebrew_name || csv.hebrew_name || master.hebrew_name || item.hebrew_name || '';
  if (!he) {
    // generic rank heuristics
    if (!sn.includes(' ')) {
      he = sn + ' (סוג)';
    } else if (/idae$/i.test(sn)) {
      he = sn.replace(/idae$/i, '') + ' (משפחה)';
    } else if (/inae$/i.test(sn)) {
      he = sn.replace(/inae$/i, '') + ' (תת-משפחה)';
    } else if (/aceae$/i.test(sn)) {
      he = sn.replace(/aceae$/i, '') + ' (משפחה)';
    } else if (/ales$/i.test(sn)) {
      he = sn.replace(/ales$/i, '') + ' (סדרה)';
    } else if (/oidea$/i.test(sn)) {
      he = sn.replace(/oidea$/i, '') + ' (על-משפחה)';
    } else if (/formes$/i.test(sn)) {
      he = sn.replace(/formes$/i, '') + ' (סדרה)';
    } else {
      he = sn;
    }
  }

  // English priority: override > dictionary > current > master > title-case scientific
  let en = over.english_name || dict.english_name || cur.english_name || master.english_name || '';
  if (!en) {
    en = titleCaseScientific(sn);
  }

  let generic = false;
  if (over.isGeneric !== undefined) generic = over.isGeneric;
  else if (master.isGeneric) generic = true;
  else if (isGenericName(sn)) generic = true;

  const obj = { scientific_name: sn, hebrew_name: he, english_name: en };
  if (generic) obj.isGeneric = true;
  return obj;
}

const rawSpeciesMap = {};
let total = 0;
for (const cat of mdCategories) {
  rawSpeciesMap[cat.category] = cat.items.map(item => {
    total++;
    return resolveEntry(item, cat.category);
  });
}

// Generate file content
const lines = [];
lines.push('export type SpeciesInfo = {');
lines.push('  Scientific_Name: string;');
lines.push('  Category: string;');
lines.push('  Hebrew_Name: string;');
lines.push('  English_Name: string;');
lines.push('};');
lines.push('');
lines.push('const rawSpeciesMap = {');
for (const [category, entries] of Object.entries(rawSpeciesMap)) {
  lines.push(`  "${category}": [`);
  for (const e of entries) {
    const parts = [
      `"scientific_name": "${e.scientific_name}"`,
      `"hebrew_name": "${e.hebrew_name}"`,
      `"english_name": "${e.english_name}"`,
    ];
    if (e.isGeneric) parts.push('"isGeneric": true');
    lines.push(`    { ${parts.join(', ')} },`);
  }
  lines.push('  ],');
}
lines.push('};');
lines.push('');
lines.push('export const speciesMap: SpeciesInfo[] = Object.entries(rawSpeciesMap).flatMap(');
lines.push('  ([category, entries]) =>');
lines.push('    entries.map((entry) => ({');
lines.push('      Scientific_Name: entry.scientific_name,');
lines.push('      Category: category,');
lines.push('      Hebrew_Name: entry.hebrew_name,');
lines.push('      English_Name: entry.english_name,');
lines.push('    }))');
lines.push(');');

fs.writeFileSync(TS_OUT, lines.join('\n'), 'utf8');
console.log(`Wrote ${total} species to ${TS_OUT}`);

// Verify counts
for (const cat of mdCategories) {
  console.log(`${cat.category}: ${rawSpeciesMap[cat.category].length}`);
}
