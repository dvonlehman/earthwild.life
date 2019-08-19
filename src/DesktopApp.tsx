/* eslint-disable react-hooks/exhaustive-deps */

import React, { FC, ReactNode } from "react";
import Header from "./components/Header";
import SpeciesMenu from "./components/SpeciesMenu";
import SpeciesDetails from "./components/SpeciesDetails";
import ImageList from "./components/ImageList";
import MapBoxMap from "./components/Map";
import ImageCarousel from "./components/ImageCarousel";
import Welcome from "./components/Welcome";
import ScreenDetect from "./components/ScreenDetect";

import { makeStyles } from "@material-ui/styles";
import { colors, dimensions } from "./styles";
import { useContext } from "./context";
import { ScreenSize } from "./types";

const useStyles = makeStyles({
  layout: {
    display: "flex",
    height: "100vh",
    flexDirection: "column",
    overflow: "hidden",
    width: "100%"
  },
  main: {
    flexGrow: 1,
    display: "flex",
    width: "100%",
    height: "100%",
    flexDirection: "row",
    overflow: "hidden"
  },
  left: {
    height: "100%",
    width: dimensions.leftColumnWidth,
    minWidth: dimensions.leftColumnWidth,
    backgroundColor: colors.white,
    overflowY: "scroll"
  },
  center: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    height: "100%"
  },
  right: {
    width: dimensions.rightMenuWidth,
    minWidth: dimensions.rightMenuWidth,
    overflowY: "scroll",
    height: "100%",
    backgroundColor: colors.white
  },
  map: {
    flexGrow: 1,
    backgroundColor: "silver",
    position: "relative"
  },
  images: {
    height: dimensions.imagesPaneHeight,
    margin: 0,
    padding: 0,
    backgroundColor: colors.dark
  }
});

const DesktopApp: FC = () => {
  const classes = useStyles();
  const context = useContext();

  let leftContent: ReactNode;
  if (context.isLoading) {
    leftContent = <div />;
  } else if (context.currentSpecies) {
    leftContent = <SpeciesDetails />;
  } else {
    leftContent = <Welcome />;
  }

  return (
    <ScreenDetect screenSize={ScreenSize.Large}>
      <div className={classes.layout}>
        <Header />
        <section className={classes.main}>
          <aside className={classes.left}>{leftContent}</aside>
          <div className={classes.center}>
            <div className={classes.map}>
              {context.selectedImage && <ImageCarousel />}
              <MapBoxMap
                species={context.currentSpecies}
                speciesList={context.speciesList}
                isLoading={context.isLoading}
              />
            </div>
            <div className={classes.images}>
              <ImageList
                species={context.currentSpecies}
                speciesList={context.speciesList}
              />
            </div>
          </div>
          <div className={classes.right}>
            <SpeciesMenu />
          </div>
        </section>
      </div>
    </ScreenDetect>
  );
};

export default DesktopApp;
