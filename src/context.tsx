import React, { FC, useEffect, useState, useCallback } from "react";
import { throttle } from "lodash";
import { AppContext, AppContextProviderProps } from "./types";
import { fetchSpecies } from "./api";

// In order to make TS happy, we need to pass in a defaultValue.
const Context = React.createContext<AppContext>({
  speciesList: [],
  isLoading: false,
});

// Custom hook that components can use to access the AppContext
export function useContext(): AppContext {
  return React.useContext<AppContext>(Context);
}

let hashListenerRegistered = false;

const AppContextProvider: FC<AppContextProviderProps> = props => {
  const [state, setState] = useState({ ...props, isLoading: false });

  const onHashChange = useCallback(
    async function onHashChange(event: any) {
      console.log("hash change", document.location.hash);

      let hash = document.location.hash;
      if (hash === "#" || hash.length === 0) {
        setState({ ...state, currentSpecies: undefined });
      }

      hash = hash.substr(1);
      if (state.speciesList.some(s => s.slug === hash)) {
        setState({ ...state, isLoading: true });

        const species = await fetchSpecies(hash);
        setState({ ...state, currentSpecies: species, isLoading: false });
      }
    },
    [state]
  );

  // Monitor for hash changes
  useEffect(() => {
    // Make sure we don't register multiple event listeners
    if (hashListenerRegistered) return;

    console.log("Register hash change listener");
    window.addEventListener(
      "hashchange",
      throttle(onHashChange, 500, { leading: true, trailing: false }),
      false
    );
    hashListenerRegistered = true;
  }, [onHashChange]);

  return (
    <Context.Provider value={{ ...state }}>{props.children}</Context.Provider>
  );
};

// // Because we are lazy importing, the AppContextProvider must be the default export.
export default AppContextProvider;
