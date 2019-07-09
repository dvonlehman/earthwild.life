import { SpeciesInfo, Species } from "./types";

export async function fetchSpeciesList(): Promise<SpeciesInfo[]> {
  const resp = await fetch("/data/species.json");
  const speciesList = (await resp.json()) as SpeciesInfo[];
  return speciesList;
}

export async function fetchSpecies(slug: string): Promise<Species> {
  const resp = await fetch(`/data/${slug}.json`);
  const json = await resp.json();
  return json as Species;
}
