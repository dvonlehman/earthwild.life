const fetch = require("node-fetch");
const fs = require("fs");

const API_URL = "https://apiv3.iucnredlist.org/api/v3/";
const API_TOKEN =
  "9bb4facb6d23f48efbf424bb05c0c1ef1cf6f468393bc745d42179ac4aca5fee";

async function fetchSpeciesData(apiPath) {
  const url = `${API_URL}${apiPath}?token=${API_TOKEN}`;

  console.log(url);

  const result = await fetch(url);
  const json = await result.json();
  return json.result;
}

async function main() {
  const speciesId = process.argv[2];
  const [
    basicData,
    narrativeData,
    threatData,
    countryData,
    historicalData,
    habitatData
  ] = await Promise.all([
    fetchSpeciesData(`species/id/${speciesId}`),
    fetchSpeciesData(`species/narrative/id/${speciesId}`),
    fetchSpeciesData(`threats/species/id/${speciesId}`),
    fetchSpeciesData(`species/countries/id/${speciesId}`),
    fetchSpeciesData(`species/history/id/${speciesId}`),
    fetchSpeciesData(`habitats/species/id/${speciesId}`)
  ]);

  const combinedJson = {
    ...basicData[0],
    ...narrativeData[0],
    threats: threatData,
    countries: countryData,
    historical: historicalData,
    habitats: habitatData
  };

  fs.writeFileSync(
    `${__dirname}/${speciesId}.json`,
    JSON.stringify(combinedJson, null, 2)
  );
}

main()
  .catch(err => {
    console.error(err);
    process.exit(1);
  })
  .then(() => process.exit());
