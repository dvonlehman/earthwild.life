import React, { Component } from "react";
import {
  default as MapboxGL,
  MapboxOptions,
  LngLatBoundsLike,
  GeoJSONSourceRaw
} from "mapbox-gl";
import { Point } from "geojson";
import { Species, SpeciesInfo } from "../types";
import { BBox } from "@turf/turf";

import "mapbox-gl/dist/mapbox-gl.css";
import { colors } from "../styles";

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN || "";

(MapboxGL as any).accessToken = MAPBOX_TOKEN;

const WORLD_BOUNDS: LngLatBoundsLike = [[-167.1, -70.6], [195, 84.7]];
const getMaxBounds = (bbox: BBox): [[number, number], [number, number]] => {
  return [[bbox[0], bbox[1]], [bbox[2], bbox[3]]];
};

const WORLD_MARKERS_LAYER = "worldMarkers";
const GEOJSON_SOURCE = "species-geojson";

interface Props {
  species?: Species;
  speciesList: SpeciesInfo[];
}

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

  loadSpeciesWorldMarkers() {
    const map = this.map;
    if (!map) return;

    if (!map.getSource(WORLD_MARKERS_LAYER)) {
      const geoJson: GeoJSONSourceRaw = {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: this.props.speciesList.map(s => {
            return {
              type: "Feature",
              geometry: {
                type: "Point",
                coordinates: s.geoCenterOfMass
              },
              properties: {
                title: s.title,
                slug: s.slug
              }
            };
          })
        }
      };

      map.addSource(WORLD_MARKERS_LAYER, geoJson);
    }

    map.addLayer({
      id: WORLD_MARKERS_LAYER,
      type: "circle",
      source: WORLD_MARKERS_LAYER,
      interactive: true,
      paint: {
        "circle-color": colors.red,
        "circle-radius": 6
      },
      layout: {
        visibility: "visible"
      }
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
      dragPan: false,
      customAttribution:
        "Geospatial data from <a href='https://www.iucnredlist.org/' target='_blank'>IUCN RedList</a>"
    };

    if (this.props.species) {
      mapOptions.bounds = getMaxBounds(this.props.species.geoJson.bbox as BBox);
    } else {
      mapOptions.bounds = WORLD_BOUNDS;
    }

    // Create the mapbox map
    const map = new MapboxGL.Map(mapOptions);
    map.getCanvas().style.cursor = "pointer";

    this.map = map;

    // Create a popup, but don't add it to the map yet.
    const popup = new MapboxGL.Popup({
      closeButton: false,
      closeOnClick: false
    });

    // Add the geoJson layers
    map.on("load", () => {
      if (this.props.species) {
        this.loadSpeciesMapSource(this.props.species);
      } else {
        this.loadSpeciesWorldMarkers();
      }
    });

    map.on("click", WORLD_MARKERS_LAYER, ev => {
      popup.remove();

      const features = ev.features;
      if (!features || features.length === 0) return;
      const properties = features[0].properties;
      if (!properties) return;

      const slug = properties.slug;
      document.location.hash = slug;
    });

    map.on("mouseenter", WORLD_MARKERS_LAYER, ev => {
      if (!ev) return;

      map.getCanvas().style.cursor = "pointer";

      if (!ev.features || ev.features.length === 0) return;

      const feature = ev.features[0];
      if (!feature.properties) return;

      const coordinates = (feature.geometry as Point).coordinates;
      const title = feature.properties.title;

      popup
        .setLngLat([coordinates[0], coordinates[1]])
        .setHTML(`<strong>${title}</strong>`)
        .addTo(map);
    });

    map.on("mouseleave", WORLD_MARKERS_LAYER, e => {
      map.getCanvas().style.cursor = "default";
      popup.remove();
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
    } else {
      map.removeLayer(WORLD_MARKERS_LAYER);
      map.removeSource(WORLD_MARKERS_LAYER);
    }

    if (this.props.species) {
      this.loadSpeciesMapSource(this.props.species);
      map.fitBounds(getMaxBounds(this.props.species.geoJson.bbox as BBox), {
        padding: 20
      });
    } else {
      this.loadSpeciesWorldMarkers();
      map.fitBounds(WORLD_BOUNDS);
    }
  }

  render() {
    return (
      <>
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
      </>
    );
  }
}

export default Map;
