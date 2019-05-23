import React from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import "./App.css";

const App: React.FC = () => {
  return (
    <div className="App">
      <LoadScript
        id="scriptLoader"
        googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_KEY as string}
      >
        <GoogleMap
          zoom={7}
          center={{
            lat: -3.745,
            lng: -38.523
          }}
        />
      </LoadScript>
    </div>
  );
};

export default App;
