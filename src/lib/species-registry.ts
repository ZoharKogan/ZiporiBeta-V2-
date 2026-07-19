export type SpeciesStatus = "invasive" | "rare" | "other";

export const SPECIES_REGISTRY: Record<string, SpeciesStatus> = {
  // Invasive species
  "Papilio demoleus": "invasive",
  "Myocastor coypus": "invasive",
  "Acridotheres tristis": "invasive",
  "Psittacula krameri": "invasive",
  "Myiopsitta monachus": "invasive",

  // Rare species
  "Borbo borbonica": "rare",
  "Crocothemis erythraea": "rare",
  "Felis chaus": "rare",
  "Lutra lutra": "rare",
  "Ischnura pumilio": "rare",
  "Anax imperator": "rare",
};

/** Case-insensitive lookup of a species classification. */
export function classifySpecies(scientificName: string): SpeciesStatus {
  const normalized = scientificName.trim().toLowerCase();
  for (const [name, status] of Object.entries(SPECIES_REGISTRY)) {
    if (name.toLowerCase() === normalized) {
      return status;
    }
  }
  return "other";
}
