export type SpeciesStatus = "invasive" | "rare" | "other";

export const SPECIES_REGISTRY: Record<string, "invasive" | "rare"> = {
  // Invasive
  "papilio demoleus": "invasive",
  "myocastor coypus": "invasive",
  "acridotheres tristis": "invasive",
  "psittacula krameri": "invasive",
  "myiopsitta monachus": "invasive",
  "erigeron spp.": "invasive",
  "datura inoxia": "invasive",
  "solanum elaeagnifolium": "invasive",
  "ambrosia artemisiifolia": "invasive",
  "physalis angulata": "invasive",
  "amaranthus blitoides": "invasive",
  "amaranthus palmeri": "invasive",
  "amaranthus deflexus": "invasive",
  "xanthium strumarium": "invasive",
  "sesbania sesban": "invasive",
  "paspalum dilatatum": "invasive",
  "symphyotrichum subulatum": "invasive",
  "bidens pilosa": "invasive",
  "euphorbia graminea": "invasive",
  "xanthium spinosum": "invasive",
  "ricinus communis": "invasive",
  "euphorbia nutans": "invasive",
  "achyranthes aspera": "invasive",
  "physalis spp.": "invasive",
  "datura stramonium": "invasive",
  "erigeron canadensis": "invasive",
  "amaranthus spp.": "invasive",
  "ludwigia repens": "invasive",
  "xanthium spp.": "invasive",
  "paspalum spp.": "invasive",
  "leptocybe invasa": "invasive",

  // Rare
  "borbo borbonica": "rare",
  "crocothemis erythraea": "rare",
  "felis chaus": "rare",
  "lutra lutra": "rare",
  "ischnura pumilio": "rare",
  "anax imperator": "rare",
  "silene israelitica": "rare",
  "pelecanus onocrotalus": "rare",
  "limonium spp.": "rare",
  "acarolepis spp.": "rare",
  "tringa flavipes": "rare",
  "pandion haliaetus": "rare",
  "potamon potamios": "rare",
  "asparagus palaestinus": "rare",
};

export function classifySpecies(scientificName: string): SpeciesStatus {
  return SPECIES_REGISTRY[scientificName.trim().toLowerCase()] ?? "other";
}
