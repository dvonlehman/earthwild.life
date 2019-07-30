import React from "react";
import ReactDOM from "react-dom";
import DesktopApp from "./DesktopApp";
import MobileApp from "./MobileApp";
import ContextProvider from "./context";
import { fetchSpeciesList, fetchSpecies } from "./api";
import { dimensions } from "./styles";

const main = async () => {
  let currentSpecies;
  const speciesList = await fetchSpeciesList();

  // If there is a species family in the hash, also load the species.
  let hash = document.location.hash;
  if (hash.length > 0) {
    hash = hash.substr(1);
    if (speciesList.some(s => s.slug === hash)) {
      currentSpecies = await fetchSpecies(hash);
    }
  }

  // Hide the initial loader statically rendered in index.html
  const loader = document.getElementById("loader");
  if (loader) loader.style.display = "none";

  const rootElement = document.getElementById("root");

  const deviceType =
    window.outerWidth < dimensions.desktopAppMinWindowWidth
      ? "mobile"
      : "desktop";
  const App = deviceType === "mobile" ? <MobileApp /> : <DesktopApp />;

  ReactDOM.render(
    <ContextProvider {...{ currentSpecies, speciesList, deviceType }}>
      {App}
    </ContextProvider>,
    rootElement
  );
};

main();
