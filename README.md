## Data Preparation

- Download 980mb zip file of geo data from Red List
- Use [these instructions](https://ben.balter.com/2013/06/26/how-to-convert-shapefiles-to-geojson-for-use-on-github/) to convert `.shp` file to `.geojson`: `ogr2ogr -f GeoJSON -t_srs crs:84 mammals.geojson MAMMALS.shp`. This creates a massive 3.6gb `MAMMALS.geojson` file.
- Extract the geo json entry for each species by running `bash extract_species_geo.sh species_id`. This will create a much smaller species file, i.e. `7140.json`.

## References

- https://react-google-maps-api-docs.netlify.com/#polygon
