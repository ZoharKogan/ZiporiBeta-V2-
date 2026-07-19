const fs = require('fs');
const path = require('path');

function replaceInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  content = content.replace(/master-species-map/g, 'species-map');
  content = content.replace(/masterSpeciesMap/g, 'speciesMap');
  content = content.replace(/MasterSpeciesEntry/g, 'SpeciesInfo');
  content = content.replace(/\.hebrew_name/g, '.Hebrew_Name');
  content = content.replace(/\.english_name/g, '.English_Name');
  content = content.replace(/\.canonical_category/g, '.Category');
  content = content.replace(/\.scientific_name/g, '.Scientific_Name');

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated: ${filePath}`);
  }
}

function walkDir(dir) {
  fs.readdirSync(dir).forEach(file => {
    let fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkDir(fullPath);
    } else if (fullPath.endsWith('.ts') || fullPath.endsWith('.tsx')) {
      replaceInFile(fullPath);
    }
  });
}

walkDir('./src');
const oldFile = './src/lib/master-species-map.ts';
if (fs.existsSync(oldFile)) {
  fs.unlinkSync(oldFile);
  console.log('Deleted old master-species-map.ts');
}
console.log('Refactoring complete.');
