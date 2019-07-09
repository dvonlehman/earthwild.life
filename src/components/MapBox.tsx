import React, { FC } from "react";
import { makeStyles } from "@material-ui/styles";
import ReactMapboxGl, { GeoJSONLayer } from "react-mapbox-gl";
import * as MapboxGL from "mapbox-gl";
import useDimensions from "react-use-dimensions";
import { useContext } from "../context";
import { Species } from "../types";
import { FeatureCollection, BBox } from "geojson";

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN || "";

const Map = ReactMapboxGl({ accessToken: MAPBOX_TOKEN });

const useStyles = makeStyles({
  root: {
    height: "100%",
  },
});

const getMaxBounds = (bbox: BBox): [[number, number], [number, number]] => {
  return [[bbox[0], bbox[1]], [bbox[2], bbox[3]]];
};

// const symbolLayout: MapboxGL.SymbolLayout = {
//   "text-field": "{place}",
//   "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
//   "text-offset": [0, 0.6],
//   "text-anchor": "top"
// };
// const symbolPaint: MapboxGL.SymbolPaint = {
//   "text-color": "white"
// };

const fillPaint: MapboxGL.FillPaint = {
  "fill-opacity": 0.5,
  "fill-color": "blue",
};

const fillLayout: MapboxGL.FillLayout = { visibility: "visible" };

const MapBoxMap: FC = props => {
  const context = useContext();
  const classes = useStyles();
  const [containerRef, containerSize] = useDimensions();

  const species = context.currentSpecies as Species;

  const subSpeciesGeoJson = (subSpeciesId: number): FeatureCollection => {
    const features = (species.geoJson as FeatureCollection).features.filter(
      f => f.properties && f.properties.subSpeciesId === subSpeciesId
    );

    return {
      type: "FeatureCollection",
      features,
    };
  };

  // <GeoJSONLayer
  //           data={geojson}
  //           fillLayout={fillLayout}
  //           fillPaint={fillPaint}
  // circleOnClick={this.onClickCircle}
  // symbolLayout={symbolLayout}
  // symbolPaint={symbolPaint}
  // />

  if (!species.geoJson.bbox) {
    return null;
  }

  const fitBounds = getMaxBounds(species.geoJson.bbox);

  return (
    <div ref={containerRef} className={classes.root}>
      {containerSize && containerSize.width && containerSize.height && (
        <Map
          style={"mapbox://styles/mapbox/basic-v9" as any}
          fitBounds={fitBounds}
          fitBoundsOptions={{ padding: 20 }}
          containerStyle={{
            width: containerSize.width,
            height: containerSize.height,
          }}
        >
          {species.subSpecies.map(subSpecies => (
            <GeoJSONLayer
              key={subSpecies.id}
              data={subSpeciesGeoJson(subSpecies.id)}
              fillPaint={fillPaint}
              fillLayout={fillLayout}
            />
          ))}
        </Map>
      )}
    </div>
  );
};

export default MapBoxMap;
