import React, { FC } from "react";
import CloudinaryImage from "./CloudinaryImage";
import { SpeciesInfo } from "../types";

interface FeaturedImageProps {
  species: SpeciesInfo;
  width: number;
  height: number;
}

const FeaturedImage: FC<FeaturedImageProps> = ({ species, width, height }) => {
  return (
    <CloudinaryImage
      alt={species.title}
      width={width}
      height={height}
      style={{ width, height }}
      path={species.featuredImage.url}
      crop="fill"
    />
  );
};

export default FeaturedImage;
