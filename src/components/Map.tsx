import React from "react";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import { makeStyles } from "@material-ui/styles";
import "./App.css";

const useStyles = makeStyles({
  main: {
    display: "flex"
  }
});

const App: React.FC = props => {
  const classes = useStyles();

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_KEY as string
  });

  const renderMap = () => {
    // wrapping to a function is useful in case you want to access `window.google`
    // to eg. setup options or create latLng object, it won't be available otherwise
    // feel free to render directly if you don't need that
    return (
      <div className={classes.main}>
        {/* <GoogleMap
          mapContainerStyle={{
            height: "100vh",
            width: "100vw"
          }}
          zoom={5}
          center={{ lat: 24.886, lng: -70.268 }}
        /> */}
      </div>
    );
  };

  if (loadError) {
    return <div>Map cannot be loaded right now, sorry.</div>;
  }

  return isLoaded ? renderMap() : <span>Loading...</span>;
};

export default App;
