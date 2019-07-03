import React, { FC, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import ReactMapboxGl, { GeoJSONLayer } from "react-mapbox-gl";
import * as MapboxGL from "mapbox-gl";
import geojson from "../geotest.json";
import geojson2 from "../geotest2.json";

// import {Layer, GeoJSONSource} from 'mapbox-gl';
// import ReactMapGL, {
//   Layer,
//   // NavigationControl,
//   // InteractiveMapProps,
//   ViewState
// } from "react-map-gl";
import useDimensions from "react-use-dimensions";
import { useContext } from "../context";
import { SpeciesFamily } from "../types";

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN || "";

const Map = ReactMapboxGl({ accessToken: MAPBOX_TOKEN });

const useStyles = makeStyles({
  root: {
    height: "100%"
  }
});

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
  "fill-color": "blue"
};

const fillLayout: MapboxGL.FillLayout = { visibility: "visible" };

const MapBoxMap: FC = props => {
  const context = useContext();
  const classes = useStyles();
  const [containerRef, containerSize] = useDimensions();

  const species = context.currentFamily as SpeciesFamily;

  const [state, setState] = useState({
    viewport: {
      zoom: 14,
      latitude: 37.776021,
      longitude: -122.4171949
    }
  });

  // calcCenter: (bounds: [[number, number], [number, number]])
  return (
    <div ref={containerRef} className={classes.root}>
      {containerSize && containerSize.width && containerSize.height && (
        <Map
          style={"mapbox://styles/mapbox/basic-v9" as any}
          center={[-77.01239, 38.91275]}
          containerStyle={{
            width: containerSize.width,
            height: containerSize.height
          }}
        >
          <GeoJSONLayer
            data={geojson}
            fillLayout={fillLayout}
            fillPaint={fillPaint}
            // circleOnClick={this.onClickCircle}
            // symbolLayout={symbolLayout}
            // symbolPaint={symbolPaint}
          />
          <GeoJSONLayer
            data={geojson2}
            fillLayout={fillLayout}
            fillPaint={{ "fill-color": "green", "fill-opacity": 0.5 }}
          />
        </Map>
      )}
    </div>
  );
};

export default MapBoxMap;
