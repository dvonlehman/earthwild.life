import React, { FC } from "react";
import { buildUrl } from "./CloudinaryImage";
import { SpeciesInfo } from "../types";
import { makeStyles } from "@material-ui/core/styles";

interface FeaturedImageProps {
  species: SpeciesInfo;
  dimensions: [number, number];
  height: number;
  className?: string;
}

const useStyles = makeStyles({
  image: {
    width: "100%",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat"
  }
});

const FeaturedImage: FC<FeaturedImageProps> = ({
  species,
  dimensions,
  height
}) => {
  const classes = useStyles();

  const imageUrl = buildUrl({
    path: species.featuredImage.url,
    width: dimensions[0],
    height: dimensions[1],
    crop: "fill"
  });

  return (
    <div
      className={classes.image}
      style={{ backgroundImage: `url(${imageUrl})`, height }}
    />
  );

  // return (
  //   <CloudinaryImage
  //     alt={species.title}
  //     width={width}
  //     height={height}
  //     className={className}
  //     style={className ? undefined : { width, height }}
  //     path={species.featuredImage.url}
  //     crop="fill"
  //   />
  // );
};

export default FeaturedImage;
