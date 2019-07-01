import React, { Fragment } from "react";
import { GoogleMap, useLoadScript, Polygon } from "@react-google-maps/api";
import { makeStyles } from "@material-ui/styles";
import { useContext } from "../context";
import { Species } from "../types";

interface LatLng {
  lat: number;
  lng: number;
}

const useStyles = makeStyles({
  main: {
    display: "flex"
  }
});

const App: React.FC = props => {
  const classes = useStyles();
  const context = useContext();
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_KEY as string
  });

  if (!context.currentFamily) return null;

  const subSpecies = Object.values(context.currentFamily.species);

  const loadPolygonPaths = (points: [number, number]): LatLng[] => {
    const polygonPaths: LatLng[] = [];
    for (const point of points) {
      if (Array.isArray(point) && point.length === 2) {
        polygonPaths.push({ lat: point[1], lng: point[0] });
      }
    }
    return polygonPaths;
  };

  const renderSpeciesRanges = (species: Species) => {
    return (
      <Fragment key={species.speciesId}>
        {species.geoCoordinates.map((ranges, index) =>
          ranges.map(range => (
            <Polygon
              onLoad={polygon => {
                console.log("polygon: ", polygon);
              }}
              paths={loadPolygonPaths(range)}
              options={{
                fillColor: "lightblue",
                fillOpacity: 1,
                strokeColor: "red",
                strokeOpacity: 1,
                strokeWeight: 2,
                clickable: false,
                draggable: false,
                editable: false,
                geodesic: false,
                zIndex: 1
              }}
            />
          ))
        )}
      </Fragment>
    );
  };

  const renderMap = () => {
    // wrapping to a function is useful in case you want to access `window.google`
    // to eg. setup options or create latLng object, it won't be available otherwise
    // feel free to render directly if you don't need that
    return (
      <GoogleMap
        mapContainerStyle={{
          height: "100%",
          width: "100%"
        }}
        zoom={5}
        center={{ lat: 24.886, lng: -70.268 }}
      >
        {subSpecies.map(renderSpeciesRanges)}
      </GoogleMap>
    );
  };

  if (loadError) {
    return <div>Map cannot be loaded right now, sorry.</div>;
  }

  return isLoaded ? renderMap() : <span>Loading...</span>;
};

export default App;
