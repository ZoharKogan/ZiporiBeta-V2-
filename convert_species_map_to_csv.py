import csv, json, re, os

input_path = "src/lib/species-map.ts"
output_path = "species_map.csv"

with open(input_path, "r", encoding="utf-8") as f:
    content = f.read()

# Extract the JSON object after the interface declaration
match = re.search(r"export const speciesMap: Record<string, SpeciesInfo\[\]> = (\{[\s\S]*\});\s*$", content)
if not match:
    raise ValueError("Could not find speciesMap JSON object in the file")

data = json.loads(match.group(1))

with open(output_path, "w", newline="", encoding="utf-8-sig") as f:
    writer = csv.writer(f)
    writer.writerow(["iconic_taxon_name", "scientific_name", "hebrew_name", "english_name"])
    for taxon, entries in data.items():
        for entry in entries:
            writer.writerow([
                taxon,
                entry.get("scientific_name", ""),
                entry.get("hebrew_name", ""),
                entry.get("english_name", ""),
            ])

print(f"CSV written to {output_path}")
print(f"Categories: {len(data)}, Species: {sum(len(v) for v in data.values())}")
