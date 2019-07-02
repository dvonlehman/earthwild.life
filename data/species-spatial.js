const LineByLineReader = require("line-by-line");
const fs = require("fs-extra");
const simplify = require("@spatial/simplify");

const speciesId = process.argv[2];

const lr = new LineByLineReader(__dirname + "/MAMMALS.geojson");

lr.on("error", function(err) {
  console.error(err);
  process.exit(1);
});

const features = [];

lr.on("line", function(line) {
  // 'line' contains the current line without the trailing newline character.
  if (line.includes(`"id_no": ${speciesId}`)) {
    console.log(`Found line for species_id ${speciesId}`);
    if (line.endsWith(",")) line = line.slice(0, -1);

    let feature = JSON.parse(line);

    feature = simplify(feature, {
      highQuality: true,
      mutate: true,
      tolerance: 0.01
    });

    features.push(feature);
  }
});

lr.on("end", function() {
  fs.writeJsonSync(
    __dirname + `/${speciesId}.geojson`,
    {
      type: "FeatureCollection",
      features
    },
    { spaces: 2 }
  );

  process.exit();
});
