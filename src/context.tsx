/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useEffect, useState, useCallback } from "react";
import throttle from "lodash/throttle";
import random from "lodash/random";
import {
  AppContext,
  AppContextProviderProps,
  Image,
  SpeciesInfo,
} from "./types";
import { fetchSpecies } from "./api";

// In order to make TS happy, we need to pass in a defaultValue.
const Context = React.createContext<AppContext>({
  speciesList: [],
  isLoading: false,
  selectedImage: undefined,
  deviceType: "desktop",
  setSelectedImage: () => {},
  imageList: [],
});

// Custom hook that components can use to access the AppContext
export function useContext(): AppContext {
  return React.useContext<AppContext>(Context);
}

let hashListenerRegistered = false;

const randomSpeciesImages = (speciesList: SpeciesInfo[]): Image[] => {
  let available = speciesList.map(s => s.featuredImage);
  const images = [];
  do {
    const idx = random(0, available.length - 1);
    images.push(available[idx]);
    available.splice(idx, 1);
  } while (images.length < 5);
  return images;
};

interface ContextState extends AppContextProviderProps {
  isLoading: boolean;
  selectedImage?: Image;
  imageList: Image[];
}

const AppContextProvider: FC<AppContextProviderProps> = props => {
  const [state, setState] = useState<ContextState>({
    ...props,
    isLoading: false,
    selectedImage: undefined,
    imageList: props.currentSpecies
      ? props.currentSpecies.images
      : randomSpeciesImages(props.speciesList),
  });

  const onHashChange = useCallback(async () => {
    console.log("hash change", document.location.hash);

    let slug: string | undefined = undefined;
    let hash = document.location.hash;
    if (hash.length > 1) {
      slug = hash.substr(1);
    }

    if (slug && state.speciesList.some(s => s.slug === slug)) {
      setState({ ...state, isLoading: true });

      const species = await fetchSpecies(slug);
      setState({
        ...state,
        currentSpecies: species,
        isLoading: false,
        selectedImage: undefined,
        imageList: species.images,
      });
    } else {
      setState({
        ...state,
        selectedImage: undefined,
        currentSpecies: undefined,
        imageList: randomSpeciesImages(props.speciesList),
      });
    }
  }, []);

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

  const setSelectedImage = (image: Image | undefined) =>
    setState({ ...state, selectedImage: image });

  return (
    <Context.Provider value={{ ...state, setSelectedImage }}>
      {props.children}
    </Context.Provider>
  );
};

// // Because we are lazy importing, the AppContextProvider must be the default export.
export default AppContextProvider;
