import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom";
import FullScreenLoader from "./components/FullScreenLoader";
import { SpeciesFamily, SpeciesFamilyInfo } from "./types";
import { fetchSpeciesFamilyList, fetchSpeciesFamily } from "./api";

let _speciesFamilyList: SpeciesFamilyInfo[];
let _currentSpeciesFamily: SpeciesFamily;

// Simulate a delay while fetching the user. The Suspense loading fallback
// will be display for as long as it takes to both load the bundle chunk and fetch the
// current user (and any other remote data needed to initially bootstrap the app).
// We don't have to worry about a loading indicator glitch where one loader appears
// while downloading the bundle, then another loader appears while fetching the
// initial app data. Just one continuous loading indicator until the app has everything
// it needs to render the initial view.
let AppContextProvider = lazy(async () => {
  _speciesFamilyList = await fetchSpeciesFamilyList();

  // If there is a species family in the hash, also load the species.
  let hash = document.location.hash;
  if (hash.length > 0) {
    hash = hash.substr(1);
    if (_speciesFamilyList.some(s => s.family === hash)) {
      _currentSpeciesFamily = await fetchSpeciesFamily(hash);
    }
  }

  return import("./context");
});

// Lazy import the App.
let App = lazy(() => import("./App"));

const rootElement = document.getElementById("root");

// TODO: Render the header here
ReactDOM.render(
  <Suspense fallback={<FullScreenLoader />}>
    <AppContextProvider
      getSpeciesFamilyList={() => _speciesFamilyList}
      getCurrentFamily={() => _currentSpeciesFamily}
    >
      <App />
    </AppContextProvider>
  </Suspense>,
  rootElement
);
