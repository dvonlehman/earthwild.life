import React, { Component } from "react";
import {
  default as MapboxGL,
  MapboxOptions,
  LngLatBoundsLike
} from "mapbox-gl";
import { Species } from "../types";
import { BBox } from "geojson";

import "mapbox-gl/dist/mapbox-gl.css";

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN || "";

(MapboxGL as any).accessToken = MAPBOX_TOKEN;

const WORLD_BOUNDS: LngLatBoundsLike = [[-167.1, -70.6], [195, 84.7]];
const getMaxBounds = (bbox: BBox): [[number, number], [number, number]] => {
  return [[bbox[0], bbox[1]], [bbox[2], bbox[3]]];
};

interface Props {
  species?: Species;
}

const GEOJSON_SOURCE = "species-geojson";

class Map extends Component<Props> {
  constructor(props: Props) {
    super(props);
    this.mapRef = React.createRef();
  }

  map?: MapboxGL.Map;
  mapRef: React.RefObject<HTMLDivElement>;

  loadSpeciesMapSource(species: Species) {
    const map = this.map;
    if (!map) return;

    console.log(`Load map data for species ${species.slug}`);

    const source = {
      type: "geojson",
      data: species.geoJson
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
          "fill-outline-color": subSpecies.mapColor
        },
        filter: ["==", ["get", "subSpeciesId"], subSpecies.id]
      });
    });
  }

  componentDidMount() {
    if (!this.mapRef.current) return;

    const mapOptions: MapboxOptions = {
      container: this.mapRef.current,
      style: "mapbox://styles/mapbox/outdoors-v10",
      fitBoundsOptions: { padding: 20 },
      scrollZoom: false,
      boxZoom: false,
      failIfMajorPerformanceCaveat: true
    };

    if (this.props.species) {
      mapOptions.bounds = getMaxBounds(this.props.species.geoJson.bbox as BBox);
    } else {
      mapOptions.bounds = WORLD_BOUNDS;
      // mapOptions.bounds = [[65.958984, -100.353521], [-65.50585, 100.615985]];
      // mapOptions.fitWorld();
      // mapOptions.center = [0, 0];
      // mapOptions.zoom = 0;
    }

    // Create the mapbox map
    const map = new MapboxGL.Map(mapOptions);

    this.map = map;

    // Add the geoJson layers
    map.on("load", () => {
      if (this.props.species) {
        this.loadSpeciesMapSource(this.props.species);
      }
    });
  }

  componentDidUpdate(prevProps: Props) {
    const map = this.map;
    if (!map) return;

    if (prevProps.species) {
      const prevLayerIds = prevProps.species.subSpecies.map(s =>
        s.id.toString()
      );

      prevLayerIds.forEach(layerId => map.removeLayer(layerId));
      map.removeSource(GEOJSON_SOURCE);
    }

    if (this.props.species) {
      this.loadSpeciesMapSource(this.props.species);
      map.fitBounds(getMaxBounds(this.props.species.geoJson.bbox as BBox), {
        padding: 20
      });
    } else {
      map.fitBounds(WORLD_BOUNDS);
    }
  }

  render() {
    return (
      <div
        ref={this.mapRef}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          top: 0,
          bottom: 0
        }}
      />
    );
  }
}

export default Map;
