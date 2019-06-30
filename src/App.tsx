/* eslint-disable react-hooks/exhaustive-deps */

import React, { FC, useEffect } from "react";
import { useContext } from "./context";
import Home from "./components/Home";
import throttle from "lodash.throttle";
import SpeciesLayout from "./components/SpeciesLayout";
import { fetchSpeciesFamily } from "./api";

const App: React.FC = props => {
  const context = useContext();

  async function onHashChange(event: any) {
    console.log("hash change", document.location.hash);
    let hash = document.location.hash;
    if (hash === "#" || hash.length === 0) {
      return context.setCurrentFamily(undefined);
    }

    hash = hash.substr(1);
    if (context.speciesFamilyList.some(f => f.family === hash)) {
      context.setIsLoading(true);

      const speciesFamily = await fetchSpeciesFamily(hash);
      context.setCurrentFamily(speciesFamily);
    }
  }

  // Monitor for hash changes
  useEffect(() => {
    window.addEventListener(
      "hashchange",
      throttle(onHashChange, 500, { leading: true, trailing: false }),
      false
    );
  }, []);

  // TODO: Render either the DesktopApp or the MobileApp depending on the screensize

  if (context.currentFamily) {
    return <SpeciesLayout />;
  } else {
    return <Home />;
  }
};

export default App;
