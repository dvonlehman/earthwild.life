import dotenv from "dotenv";

import fs from "fs-extra";
import yaml from "js-yaml";
import * as turf from "@turf/turf";
import { countBy, entries, uniq } from "lodash";
import { Geometry, Feature, FeatureCollection } from "geojson";
import { AllGeoJSON } from "@turf/turf";

import { Species, SubSpecies, SpeciesInfo, GeoJsonProperties } from "../types";

dotenv.config({ path: process.cwd + "/.env.local" });

type SpeciesMetadata = Pick<
  Species,
  "title" | "summary" | "urls" | "subSpeciesIds"
>;

const MAP_COLORS: string[] = [
  "#f7fbff",
  "#deebf7",
  "#c6dbef",
  "#9ecae1",
  "#6baed6",
  "#4292c6",
  "#2171b5",
  "#08519c",
  "#08306b",
].reverse();

// const roundLatLng = val => {
//   return parseFloat(val.toFixed(4));
// };

// const convertFeature = feature => {
//   let minLatitude;
//   let maxLatitude;
//   let minLongitude;
//   let maxLongitude;

//   const processPoint = (pointArray, index) => {
//     const latitude = pointArray[index][0];
//     const longitude = pointArray[index][1];

//     if (!minLatitude || latitude < minLatitude) {
//       minLatitude = latitude;
//     }
//     if (!maxLatitude || latitude > maxLatitude) {
//       maxLatitude = latitude;
//     }

//     if (!minLongitude || longitude < minLongitude) {
//       minLongitude = longitude;
//     }
//     if (!maxLongitude || longitude > maxLongitude) {
//       maxLongitude = longitude;
//     }

//     pointArray[index] = [roundLatLng(latitude), roundLatLng(longitude)];
//   };

//   if (feature.geometry.type === "MultiPolygon") {
//     for (let i = 0; i < feature.geometry.coordinates.length; i += 1) {
//       for (let j = 0; j < feature.geometry.coordinates[i].length; j += 1) {
//         for (let k = 0; k < feature.geometry.coordinates[i][j].length; k++) {
//           processPoint(feature.geometry.coordinates[i][j], k);
//         }
//       }
//     }
//   } else {
//     for (let i = 0; i < feature.geometry.coordinates.length; i += 1) {
//       for (let j = 0; j < feature.geometry.coordinates[i].length; j += 1) {
//         processPoint(feature.geometry.coordinates[i], j);
//       }
//     }
//   }

//   return {
//     type: "Feature",
//     properties: {
//       bounds: [
//         [roundLatLng(minLatitude), roundLatLng(minLongitude)],
//         [roundLatLng(maxLatitude), roundLatLng(maxLongitude)]
//       ]
//     },
//     geometry: {
//       type: feature.geometry.type,
//       coordinates: feature.geometry.coordinates
//     }
//   };
// };
const mostCommon = (values: string[], num: number): string[] => {
  const orderedValues = entries(countBy(values)).map(e => e[0]);
  return orderedValues.slice(0, num);
};

const loadSubSpecies = async (
  subSpeciesId: number,
  mapColor: string
): Promise<SubSpecies> => {
  console.log(`Load sub-species ${subSpeciesId}`);
  const file = `data/${subSpeciesId}.json`;

  const json = await fs.readJSON(file);

  return {
    id: json.species_id,
    rationale: json.rationale,
    populationTrend: json.populationtrend,
    habitat: json.habitat,
    geographicRange: json.geographicrange,
    population: json.population,
    threats: uniq(
      json.threats
        .filter((t: any) => t.code.split(".").length === 2)
        .map((t: any) => t.title)
    ),
    commonName: json.main_common_name,
    countries: json.countries
      .filter((c: any) => c.presence === "Extant")
      .map((c: any) => c.country),
    mapColor,
  };
};

// Load the GeoJSON features that describe the polygons where this species lives
const loadGeoFeatures = async (
  subSpeciesId: number
): Promise<Feature<Geometry, GeoJsonProperties>[]> => {
  const geoFile = `data/${subSpeciesId}.geojson`;
  const json = (await fs.readJSON(geoFile)) as FeatureCollection<
    Geometry,
    GeoJsonProperties
  >;
  return json.features.map(f => ({ ...f, properties: { subSpeciesId } }));
};

const generateSpeciesJson = async (
  slug: string,
  speciesMetadata: SpeciesMetadata,
  imagesList: any[]
): Promise<SpeciesInfo> => {
  console.log(`Processing species ${slug}`);

  const geoJson: FeatureCollection<Geometry, GeoJsonProperties> = {
    type: "FeatureCollection",
    features: [],
  };

  const images = imagesList.filter(image => image.tags.includes(slug));
  let featuredImage;
  if (images.length > 0) {
    featuredImage = images.find(image => image.tags.includes("featured"));
    if (!featuredImage) featuredImage = images[0];
  }

  const subSpeciesIds = speciesMetadata.subSpeciesIds;
  const subSpecies: SubSpecies[] = [];

  // Load the RedList api result file for each species in the family
  for (let i = 0; i < subSpeciesIds.length; i += 1) {
    const subSpeciesId = subSpeciesIds[i];

    const [speciesRedListInfo, speciesGeoFeatures] = await Promise.all([
      loadSubSpecies(subSpeciesId, MAP_COLORS[i]),
      loadGeoFeatures(subSpeciesId),
    ]);

    subSpecies.push({ ...speciesRedListInfo, mapColor: MAP_COLORS[i] });
    geoJson.features.push(...speciesGeoFeatures);
  }

  // Gather the top most common threats across all sub-species
  const threats = mostCommon(
    subSpecies.reduce<string[]>(
      (allThreats, json) => [...allThreats, ...json.threats],
      []
    ),
    5
  );

  const speciesInfo: SpeciesInfo = {
    slug,
    title: speciesMetadata.title,
    featuredImage: featuredImage ? featuredImage.public_id : undefined,
    populationTrend: mostCommon(
      subSpecies.map(json => json.populationTrend),
      1
    )[0],
  };

  geoJson.bbox = turf.bbox(geoJson as AllGeoJSON);

  // Write the species json file.
  const speciesDetails: Species = {
    ...speciesInfo,
    ...speciesMetadata,
    images: images.map(img => ({
      url: img.public_id,
      width: img.width,
      height: img.height,
    })),
    geoJson,
    subSpecies,
    subSpeciesIds,
    threats,
  };

  await fs.writeFile(
    "public/data/" + slug + ".json",
    JSON.stringify(speciesDetails, null, 2)
  );

  return speciesInfo;
};

const main = async () => {
  await fs.ensureDir("public/data");

  const imagesList = await fs.readJson("data/images.json");
  const speciesMetadata = yaml.safeLoad(
    fs.readFileSync("data/species.yml", "utf-8")
  ) as { [slug: string]: SpeciesMetadata };

  const speciesSlugs = Object.keys(speciesMetadata);
  const speciesList: SpeciesInfo[] = [];

  for (const slug of speciesSlugs) {
    const speciesInfo = await generateSpeciesJson(
      slug,
      speciesMetadata[slug],
      imagesList
    );

    speciesList.push(speciesInfo);
  }

  await fs.writeFile(
    "public/data/species.json",
    JSON.stringify(speciesList, null, 2)
  );
};

main()
  .catch(err => {
    console.error(err);
    process.exit(1);
  })
  .then(() => process.exit());
