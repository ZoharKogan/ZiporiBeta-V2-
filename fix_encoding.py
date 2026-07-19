import csv, json, os, re

# 1. טעינת הקובץ המאומת (species for Zohar.csv)
zohar_dict = {}
zohar_file = "species for Zohar.csv"
if os.path.exists(zohar_file):
    with open(zohar_file, 'r', encoding='utf-8-sig') as f:
        reader = csv.DictReader(f)
        for row in reader:
            sci_name = str(row.get('scientificName', '')).strip()
            heb_name = str(row.get('vernacularName', '')).strip()
            family = str(row.get('family', '')).strip()
            if sci_name and heb_name:
                zohar_dict[sci_name] = {'hebrew': heb_name, 'family': family, 'used': False}
    print(f"Loaded {len(zohar_dict)} verified species from {zohar_file}.")

# 2. פונקציית עזר לסיווג חכם
def get_category(taxon, family):
    # סיווג מותאם אישית
    butterfly_families = ['Papilionidae', 'Pieridae', 'Nymphalidae', 'Lycaenidae', 'Hesperiidae']
    dragonfly_families = ['Libellulidae', 'Coenagrionidae', 'Aeshnidae', 'Calopterygidae']
    
    if family in butterfly_families: return "פרפרים"
    if family in dragonfly_families: return "שפיראים"
    if taxon in ['Aves', 'Mammalia', 'Reptilia', 'Amphibia']: return taxon
    if taxon == 'Insecta': return "חרקים אחרים"
    return taxon if taxon else "כללי"

# 3. עיבוד המידע
obs_file = "Tzipori_2325.csv"
data = []
if os.path.exists(obs_file):
    with open(obs_file, 'r', encoding='utf-8-sig') as f:
        data = list(csv.DictReader(f))

mapping = {}

# מיזוג
for row in data:
    sci_name = str(row.get('scientific_name', '')).strip()
    taxon = str(row.get('iconic_taxon_name', '')).strip()
    fam_name = str(row.get('taxon_family_name', '')).strip()
    
    if not sci_name or sci_name == 'nan': continue
    
    if sci_name in zohar_dict:
        heb = zohar_dict[sci_name]['hebrew']
        cat = get_category(taxon, zohar_dict[sci_name]['family'])
        zohar_dict[sci_name]['used'] = True
    else:
        heb = str(row.get('common_name', '')).strip()
        cat = get_category(taxon, fam_name)
    
    if cat not in mapping: mapping[cat] = []
    if not any(s['scientific_name'] == sci_name for s in mapping[cat]):
        mapping[cat].append({"scientific_name": sci_name, "hebrew_name": heb, "english_name": ""})

# הוספת יתרת המינים מהקובץ המאומת
for sci, info in zohar_dict.items():
    if not info['used']:
        cat = get_category("Insecta", info['family'])
        if cat not in mapping: mapping[cat] = []
        mapping[cat].append({"scientific_name": sci, "hebrew_name": info['hebrew'], "english_name": ""})

# שמירה ל-TS ולאקסל
with open('src/lib/species-map.ts', 'w', encoding='utf-8') as f:
    f.write("export const speciesMap = " + json.dumps(mapping, ensure_ascii=False, indent=2) + ";")

with open('species_master_list.csv', 'w', encoding='utf-8-sig', newline='') as f:
    writer = csv.writer(f)
    writer.writerow(['Category', 'Scientific Name', 'Hebrew Name'])
    for cat, list_sp in mapping.items():
        for sp in list_sp:
            writer.writerow([cat, sp['scientific_name'], sp['hebrew_name']])

print("Done! Files updated.")