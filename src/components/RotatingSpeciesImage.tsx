import React, { useState, useEffect } from "react";
import FeaturedImage from "./FeaturedImage";
import shuffle from "lodash/shuffle";
import { SpeciesInfo } from "../types";

interface RotatingSpeciesImageProps {
  species: SpeciesInfo[];
  dimensions: [number, number];
  height: number;
}

const RotatingSpeciesImage = (props: RotatingSpeciesImageProps) => {
  const [state, setState] = useState({
    shuffledSpecies: shuffle(props.species),
    speciesIndex: 0,
  });

  // Rotate through the species
  useEffect(() => {
    const timer = setInterval(() => {
      const index = state.speciesIndex;
      const speciesIndex =
        index === state.shuffledSpecies.length - 1 ? 0 : state.speciesIndex + 1;
      setState({ ...state, speciesIndex });
    }, 5000);
    return () => clearTimeout(timer);
  }, [state]);

  return (
    <FeaturedImage
      dimensions={props.dimensions}
      height={props.height}
      species={state.shuffledSpecies[state.speciesIndex]}
    />
  );
};

export default RotatingSpeciesImage;
