import fs from 'node:fs';

const json = JSON.parse(fs.readFileSync('tmp-species-output.json', 'utf8'));

const lines = [];
for (const category of Object.keys(json).sort()) {
  lines.push(`# ${category} (${json[category].length})`);
  for (const item of json[category]) {
    const he = item.hebrew_name ? ` — ${item.hebrew_name}` : '';
    lines.push(`- ${item.scientific_name}${he}`);
  }
  lines.push('');
}

fs.writeFileSync('tmp-species-output.md', lines.join('\n'), 'utf8');
console.log(`Wrote ${lines.length} lines to tmp-species-output.md`);
