import { speciesMap, type SpeciesInfo } from "./species-map";

export type SpeciesDictionaryEntry = SpeciesInfo;

/**
 * O(1) lookup maps pre-populated from the unified speciesMap dictionary.
 */
export const speciesDictionaryByScientificName = new Map<string, SpeciesDictionaryEntry>(
  speciesMap.map((entry) => [entry.Scientific_Name, entry])
);

export const SPECIES_MAP = new Map<string, SpeciesInfo>(
  speciesMap.map((entry) => [entry.Scientific_Name, entry])
);

/**
 * Pre-built O(1) Map for species metadata lookups.
 */
export const speciesInfoByScientificName = new Map<string, SpeciesInfo>(SPECIES_MAP);

export function lookupSpecies(scientificName: string): SpeciesDictionaryEntry | undefined {
  return speciesInfoByScientificName.get(scientificName);
}

export function getSpeciesHebrewName(scientificName: string): string | undefined {
  return lookupSpecies(scientificName)?.Hebrew_Name;
}

export function getSpeciesEnglishName(scientificName: string): string | undefined {
  return lookupSpecies(scientificName)?.English_Name;
}

export function getSpeciesCategory(scientificName: string): string | undefined {
  return lookupSpecies(scientificName)?.Category;
}
