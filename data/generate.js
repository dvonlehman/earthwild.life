require("dotenv").config();
const fs = require("fs-extra");
const yaml = require("js-yaml");
const uniq = require("lodash.uniq");
const mostCommon = require("most-common");

const buildSpeciesData = async speciesId => {
  const file = `${__dirname}/${speciesId}.json`;
  const geoFile = `${__dirname}/${speciesId}.geojson`;

  const [json, geoJson] = await Promise.all([
    fs.readJSON(file),
    fs.readJSON(geoFile)
  ]);

  return {
    speciesId: json.species_id,
    rationale: json.rationale,
    populationTrend: json.populationtrend,
    habitat: json.habitat,
    geographicRange: json.geographicrange,
    population: json.population,
    threats: uniq(
      json.threats.filter(t => t.code.split(".").length === 2).map(t => t.title)
    ),
    commonName: json.main_common_name,
    geoCoordinates: geoJson.geometry.coordinates,
    countries: json.countries
      .filter(c => c.presence === "Extant")
      .map(c => c.country)
  };
};

const main = async () => {
  const imagesList = await fs.readJson(__dirname + "/images.json");
  const speciesMetadata = yaml.safeLoad(
    fs.readFileSync(__dirname + "/species.yml", "utf-8")
  );

  const familyCodes = Object.keys(speciesMetadata);
  const speciesFamilyList = [];

  for (const family of familyCodes) {
    console.log(`Processing species family ${family}`);

    const images = imagesList.filter(image => image.tags.includes(family));
    let featuredImage;
    if (images.length > 0) {
      featuredImage = images.find(image => image.tags.includes("featured"));
      if (!featuredImage) featuredImage = images[0];
    }

    const speciesIds = speciesMetadata[family].speciesIds;

    // Load the RedList api result file for each species in the family
    const redListData = await Promise.all(speciesIds.map(buildSpeciesData));

    const speciesFamilyInfo = {
      family,
      ...speciesMetadata[family],
      featuredImage: featuredImage ? featuredImage.public_id : undefined,
      populationTrend: mostCommon(
        redListData.map(json => json.populationTrend),
        1
      )[0].token
    };

    speciesFamilyList.push(speciesFamilyInfo);

    // Write the species json file.
    const speciesFamilyDetails = {
      ...speciesFamilyInfo,
      images: images.map(img => ({
        url: img.public_id,
        width: img.width,
        height: img.height
      })),
      species: redListData.reduce(
        (accumulator, data) => ({ ...accumulator, [data.speciesId]: data }),
        {}
      )
    };

    await fs.writeFile(
      __dirname + "/../public/data/" + family + ".json",
      JSON.stringify(speciesFamilyDetails, null, 2)
    );
  }

  await fs.writeFile(
    __dirname + "/../public/data/species.json",
    JSON.stringify(speciesFamilyList, null, 2)
  );
};

main()
  .catch(err => {
    console.error(err);
    process.exit(1);
  })
  .then(() => process.exit());
