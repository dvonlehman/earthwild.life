import React from "react";
import { useContext } from "../context";
import { makeStyles } from "@material-ui/styles";
import { colors } from "../styles";
import { buildUrl } from "./CloudinaryImage";
import { ReactComponent as ArrowBack } from "../icons/arrow-back.svg";
import { ReactComponent as ArrowForward } from "../icons/arrow-forward.svg";
import { ReactComponent as CloseIcon } from "../icons/close.svg";

const useStyles = makeStyles({
  root: {
    position: "absolute",
    zIndex: 100,
    backgroundColor: colors.dark,
    top: 0,
    bottom: 0,
    width: "100%",
    display: "flex",
    justifyContent: "center",

    "& button": {
      backgroundColor: "transparent",
      border: "none",
      outline: "none",
      cursor: "pointer",

      "& svg": {
        fill: colors.mediumGray,
      },
      "&:hover": {
        "& svg": {
          fill: colors.white,
        },
      },
    },
  },
  gutter: {
    width: 100,
    display: "flex",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  arrow: {
    "& svg": {
      width: 48,
      height: 48,
    },
  },
  image: {
    height: "100%",
    flexGrow: 1,
    backgroundSize: "contain",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  },
  close: {
    position: "absolute",
    margin: 0,
    padding: 0,
    right: 25,
    top: 0,

    "& svg": {
      width: 36,
      height: 36,
    },
  },
});

const MAX_WIDTH = 1000;

const ImageCarousel = () => {
  const context = useContext();
  const classes = useStyles();
  const { currentSpecies, selectedImage } = context;
  if (!currentSpecies || !selectedImage) return null;

  const width = Math.min(selectedImage.width, MAX_WIDTH);
  const height = Math.round(selectedImage.width / selectedImage.height / width);
  const url = buildUrl({ path: selectedImage.url, width, height });

  const onBackClick = () => {
    const currentIndex = currentSpecies.images.findIndex(
      img => img.url === selectedImage.url
    );
    let nextIndex: number;
    if (currentIndex === 0) {
      nextIndex = currentSpecies.images.length - 1;
    } else {
      nextIndex = currentIndex - 1;
    }
    context.setSelectedImage(currentSpecies.images[nextIndex]);
  };

  const onForwardClick = () => {
    const currentIndex = currentSpecies.images.findIndex(
      img => img.url === selectedImage.url
    );
    let nextIndex: number;
    if (currentIndex === currentSpecies.images.length - 1) {
      nextIndex = 0;
    } else {
      nextIndex = currentIndex + 1;
    }
    context.setSelectedImage(currentSpecies.images[nextIndex]);
  };

  const onCloseClick = () => {
    context.setSelectedImage(undefined);
  };

  return (
    <div className={classes.root}>
      <button className={classes.close} onClick={onCloseClick}>
        <CloseIcon />
      </button>
      <div className={classes.gutter}>
        <button className={classes.arrow} onClick={onBackClick}>
          <ArrowBack />
        </button>
      </div>
      <div
        className={classes.image}
        style={{
          backgroundImage: `url(${url})`,
        }}
      />
      <div className={classes.gutter}>
        <button className={classes.arrow} onClick={onForwardClick}>
          <ArrowForward />
        </button>
      </div>
    </div>
  );
};

export default ImageCarousel;
