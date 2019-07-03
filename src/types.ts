export interface SpeciesFamilyInfo {
  title: string;
  family: string;
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

export interface Species {
  speciesId: string;
  rationale: string;
  populationTrend: string;
  habitat: string;
  geographicRange: string;
  population: string;
  threats: string[];
  commonName: string;
  geoCoordinates: [number, number][][];
  countries: string[];
}

export interface SpeciesFamily extends SpeciesFamilyInfo {
  images: Image[];
  species: { [family: string]: Species };
}

export interface AppContext {
  speciesFamilyList: SpeciesFamilyInfo[];
  currentFamily?: SpeciesFamily;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  setCurrentFamily: (family: SpeciesFamily | undefined) => void;
}

