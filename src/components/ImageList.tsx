import React, { useState, MouseEvent } from "react";
import { makeStyles } from "@material-ui/styles";
import classNames from "classnames";
import CloudinaryImage from "./CloudinaryImage";
import { dimensions, colors } from "../styles";
import { useContext } from "../context";

const IMAGE_HEIGHT = dimensions.imagesPaneHeight - 40;
const MAX_IMAGE_WIDTH = 150;
const useStyles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  list: {
    margin: 0,
    padding: 0,
    display: "flex",
    alignItems: "center",
    listStyleType: "none",
    height: "100%",

    "& li": {
      marginRight: 10,
      borderBottom: "solid 3px transparent",
    },
    "& li.inactive": {
      opacity: 0.7,
    },
    "& li.selected": {
      opacity: 1,
      borderBottomColor: colors.white,
    },
    "& li:last-child": {
      marginRight: 0,
    },
  },
  image: {
    height: IMAGE_HEIGHT,
    border: 0,
    padding: 0,
    margin: 0,
    cursor: "pointer",
    outline: "none",

    "& img": {
      height: IMAGE_HEIGHT,
    },
  },
});

const ImageList = () => {
  const classes = useStyles();
  const context = useContext();

  const [mouseIsOver, setMouseIsOver] = useState(false);

  const onMouseEnter = (e: MouseEvent) => {
    setMouseIsOver(true);
  };

  const onMouseLeave = (e: MouseEvent) => {
    setMouseIsOver(false);
  };

  if (!context.currentSpecies) return null;
  const { currentSpecies: species, selectedImage } = context;

  return (
    <div className={classes.root}>
      <ul
        className={classes.list}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {species.images.map((image, i) => {
          const isSelected = selectedImage && image.url === selectedImage.url;
          const width = Math.min(
            Math.round((image.width / image.height) * IMAGE_HEIGHT),
            MAX_IMAGE_WIDTH
          );

          return (
            <li
              key={image.url}
              className={classNames({
                inactive: !isSelected && !mouseIsOver,
                selected: isSelected,
              })}
            >
              <button
                className={classes.image}
                style={{ width }}
                onClick={() => context.setSelectedImage(image)}
              >
                <CloudinaryImage
                  style={{ width }}
                  alt={`${species.title} ${i}`}
                  path={image.url}
                  width={width}
                  height={IMAGE_HEIGHT}
                  crop="fill"
                />
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ImageList;
