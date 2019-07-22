import React, { FC } from "react";
import { makeStyles } from "@material-ui/styles";
import { useContext } from "../context";
import SpeciesMenu from "./SpeciesMenu";
import SpeciesDetails from "./SpeciesDetails";
import ImageList from "./ImageList";
import { colors, dimensions } from "../styles";
import MapBoxMap from "./Map";
import ImageCarousel from "./ImageCarousel";
import Welcome from "./Welcome";

const useStyles = makeStyles({
  main: {
    display: "flex",
    width: "100%",
    height: "100%",
    flexDirection: "row",
    overflow: "hidden"
  },
  loading: {
    flexGrow: 1,
    height: "100%"
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

const SpeciesLayout: FC = props => {
  const classes = useStyles();
  const context = useContext();

  return (
    <section className={classes.main}>
      <aside className={classes.left}>
        {context.currentSpecies ? <SpeciesDetails /> : <Welcome />}
      </aside>
      <div className={classes.center}>
        <div className={classes.map}>
          {context.selectedImage && <ImageCarousel />}
          <MapBoxMap species={context.currentSpecies} />
        </div>
        <div className={classes.images}>
          <ImageList />
        </div>
      </div>
      <div className={classes.right}>
        <SpeciesMenu />
      </div>
    </section>
  );
};

export default SpeciesLayout;
