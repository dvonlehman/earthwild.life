require("dotenv").config();
const fs = require("fs-extra");
const yaml = require("js-yaml");
const uniq = require("lodash.uniq");
const mostCommon = require("most-common");
const turf = require("@turf/turf");
const bbox = require("geojson-bbox");
const geojsonExtent = require("@mapbox/geojson-extent");

const roundLatLng = val => {
  return parseFloat(val.toFixed(4));
};

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

const loadRedListData = async speciesId => {
  const file = `${__dirname}/${speciesId}.json`;

  const json = await fs.readJSON(file);

  return {
    id: json.species_id,
    rationale: json.rationale,
    populationTrend: json.populationtrend,
    habitat: json.habitat,
    geographicRange: json.geographicrange,
    population: json.population,
    threats: uniq(
      json.threats.filter(t => t.code.split(".").length === 2).map(t => t.title)
    ),
    commonName: json.main_common_name,
    countries: json.countries
      .filter(c => c.presence === "Extant")
      .map(c => c.country),
  };
};

// Load the GeoJSON features that describe the polygons where this species lives
const loadGeoFeatures = async subSpeciesId => {
  const geoFile = `${__dirname}/${subSpeciesId}.geojson`;
  const json = await fs.readJSON(geoFile);
  return json.features.map(f => ({ ...f, properties: { subSpeciesId } }));
};

const generateSpeciesJson = async (slug, speciesMetadata, imagesList) => {
  console.log(`Processing species ${slug}`);

  const geoJson = {
    type: "FeatureCollection",
    features: [],
  };

  const images = imagesList.filter(image => image.tags.includes(slug));
  let featuredImage;
  if (images.length > 0) {
    featuredImage = images.find(image => image.tags.includes("featured"));
    if (!featuredImage) featuredImage = images[0];
  }

  const subSpeciesIds = speciesMetadata[slug].speciesIds;
  const subSpecies = [];

  // Load the RedList api result file for each species in the family
  for (const subSpeciesId of subSpeciesIds) {
    const [speciesRedListInfo, speciesGeoFeatures] = await Promise.all([
      loadRedListData(subSpeciesId),
      loadGeoFeatures(subSpeciesId),
    ]);

    subSpecies.push(speciesRedListInfo);
    geoJson.features.push(...speciesGeoFeatures);
  }

  const speciesInfo = {
    slug,
    ...speciesMetadata[slug],
    featuredImage: featuredImage ? featuredImage.public_id : undefined,
    populationTrend: mostCommon(
      subSpecies.map(json => json.populationTrend),
      1
    )[0].token,
  };

  geoJson.bbox = turf.bbox(geoJson);
  // geoJson.bbox = geojsonExtent.bboxify(geoJson);

  // Write the species json file.
  const speciesDetails = {
    ...speciesInfo,
    images: images.map(img => ({
      url: img.public_id,
      width: img.width,
      height: img.height,
    })),
    geoJson,
    subSpecies,
  };

  await fs.writeFile(
    __dirname + "/../public/data/" + slug + ".json",
    JSON.stringify(speciesDetails, null, 2)
  );

  return speciesInfo;
};

const main = async () => {
  const imagesList = await fs.readJson(__dirname + "/images.json");
  const speciesMetadata = yaml.safeLoad(
    fs.readFileSync(__dirname + "/species.yml", "utf-8")
  );

  const speciesSlugs = Object.keys(speciesMetadata);
  const speciesList = [];

  for (const slug of speciesSlugs) {
    const speciesInfo = await generateSpeciesJson(
      slug,
      speciesMetadata,
      imagesList
    );

    speciesList.push(speciesInfo);
  }

  await fs.writeFile(
    __dirname + "/../public/data/species.json",
    JSON.stringify(speciesList, null, 2)
  );
};

main()
  .catch(err => {
    console.error(err);
    process.exit(1);
  })
  .then(() => process.exit());
