import React, { Component } from "react";
import * as MapboxGL from "mapbox-gl";
import { Species } from "../types";
import { BBox } from "geojson";

import "mapbox-gl/dist/mapbox-gl.css";

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN || "";

(MapboxGL as any).accessToken = MAPBOX_TOKEN;

const getMaxBounds = (bbox: BBox): [[number, number], [number, number]] => {
  return [[bbox[0], bbox[1]], [bbox[2], bbox[3]]];
};

interface Props {
  species: Species;
}

const GEOJSON_SOURCE = "species-geojson";

class Map extends Component<Props> {
  map?: MapboxGL.Map;

  loadSpeciesMapSource(species: Species) {
    const map = this.map;
    if (!map) return;

    console.log(`Load map data for species ${species.slug}`);

    const source = {
      type: "geojson",
      data: species.geoJson,
    } as MapboxGL.GeoJSONSourceRaw;
    map.addSource(GEOJSON_SOURCE, source);

    species.subSpecies.forEach(subSpecies => {
      console.log(`Add map layer for sub-species ${subSpecies.id}`);
      map.addLayer({
        id: subSpecies.id.toString(),
        type: "fill",
        source: GEOJSON_SOURCE,
        paint: {
          "fill-opacity": 0.7,
          "fill-color": subSpecies.mapColor,
          "fill-outline-color": subSpecies.mapColor,
        },
        filter: ["==", ["get", "subSpeciesId"], subSpecies.id],
      });
    });
  }

  componentDidMount() {
    // Create the mapbox map
    document.getElementById("mapboxMap");

    const map = new MapboxGL.Map({
      container: "mapboxMap", // container id
      style: "mapbox://styles/mapbox/outdoors-v10", // stylesheet location
      bounds: getMaxBounds(this.props.species.geoJson.bbox as BBox),
      fitBoundsOptions: { padding: 20 },
      scrollZoom: false,
      boxZoom: false,
    });

    this.map = map;

    // Add the geoJson layers
    map.on("load", () => {
      this.loadSpeciesMapSource(this.props.species);
    });
  }

  componentDidUpdate(prevProps: Props) {
    const map = this.map;
    if (!map) return;
    if (
      this.props.species &&
      this.props.species.slug !== prevProps.species.slug
    ) {
      const prevLayerIds = prevProps.species.subSpecies.map(s =>
        s.id.toString()
      );

      prevLayerIds.forEach(layerId => map.removeLayer(layerId));
      map.removeSource(GEOJSON_SOURCE);
      this.loadSpeciesMapSource(this.props.species);
      map.fitBounds(getMaxBounds(this.props.species.geoJson.bbox as BBox), {
        padding: 20,
      });
    }
  }

  render() {
    return <div id="mapboxMap" style={{ width: "100%", height: "100%" }} />;
  }
}

export default Map;
