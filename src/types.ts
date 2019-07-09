import { GeoJsonObject } from "geojson";

export interface SpeciesInfo {
  title: string;
  slug: string;
  speciesIds: string[];
  urls: { [key: string]: string };
  featuredImage: string;
  populationTrend: string;
}

export interface Image {
  url: string;
  width: number;
  height: number;
}

export interface SubSpecies {
  id: number;
  rationale: string;
  populationTrend: string;
  habitat: string;
  geographicRange: string;
  population: string;
  threats: string[];
  commonName: string;
  countries: string[];
}

export interface Species extends SpeciesInfo {
  images: Image[];
  subSpecies: SubSpecies[];
  geoJson: GeoJsonObject;
}

export interface AppContextProviderProps {
  // When using a simple user prop, the value was always undefined. Must be something
  // related to the lazy importing. Using a function does the trick.
  speciesList: SpeciesInfo[];
  currentSpecies?: Species;
}

export interface AppContext extends AppContextProviderProps {
  isLoading: boolean;
}
