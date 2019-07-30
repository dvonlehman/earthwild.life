import { AllGeoJSON, Position } from "@turf/turf";

export interface SpeciesInfo {
  title: string;
  slug: string;
  featuredImage: Image;
  category: RedListCategory;
  geoCenterOfMass: Position;
}

export interface Image {
  url: string;
  width: number;
  height: number;
  speciesSlug: string;
  featured?: boolean;
  alt: string;
}

export type RedListCategory =
  | "Near Threatened"
  | "Vulnerable"
  | "Endangered"
  | "Critically Endangered"
  | "Unknown";

export type PopulationTrend = "Decreasing" | "Increasing" | "Stable";

export interface SubSpecies {
  id: number;
  rationale: string;
  category: RedListCategory;
  populationTrend: PopulationTrend;
  habitat: string;
  geographicRange: string;
  population: string;
  threats: string[];
  commonName: string;
  countries: string[];
  mapColor: string;
}

export interface Species extends SpeciesInfo {
  threats: string[];
  images: Image[];
  subSpeciesIds: number[];
  subSpecies: SubSpecies[];
  populationTrend: PopulationTrend;
  geoJson: AllGeoJSON;
  summary: {
    text: string;
    source: "wcs" | "redList";
  };
  urls: { [site: string]: string };
}

export interface GeoJsonProperties {
  subSpeciesId: number;
}

export interface AppContextProviderProps {
  // When using a simple user prop, the value was always undefined. Must be something
  // related to the lazy importing. Using a function does the trick.
  speciesList: SpeciesInfo[];
  currentSpecies?: Species;
  deviceType: "mobile" | "desktop";
}

export interface AppContext extends AppContextProviderProps {
  isLoading: boolean;
  setSelectedImage: (image: Image | undefined) => void;
  selectedImage?: Image;
  imageList: Image[];
}

export interface SpeciesProps {
  species: Species;
}
