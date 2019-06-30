import { SpeciesFamilyInfo, SpeciesFamily } from "./types";

export async function fetchSpeciesFamilyList(): Promise<SpeciesFamilyInfo[]> {
  const resp = await fetch("/data/species.json");
  const speciesFamilyList = (await resp.json()) as SpeciesFamilyInfo[];
  return speciesFamilyList;
}

export async function fetchSpeciesFamily(
  family: string
): Promise<SpeciesFamily> {
  const resp = await fetch(`/data/${family}.json`);
  const json = await resp.json();
  return json as SpeciesFamily;
}
