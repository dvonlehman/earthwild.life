require("dotenv").config({ path: process.cwd() + "/.env.local" });

console.log(process.env.CLOUDINARY_URL);

const fs = require("fs-extra");
const cloudinary = require("cloudinary").v2;

const main = async () => {
  const images = await new Promise((resolve, reject) => {
    cloudinary.api.resources(
      { type: "upload", prefix: "species/", max_results: 500, tags: true },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );
  });

  fs.writeFileSync(
    __dirname + "/images.json",
    JSON.stringify(images.resources, null, 2)
  );
};

main()
  .catch(err => {
    console.error(err);
    process.exit(1);
  })
  .then(() => process.exit());
