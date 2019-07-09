import React, { FC } from "react";
import { makeStyles } from "@material-ui/styles";
import { useContext } from "../context";
import SpeciesNav from "./SpeciesNav";
import SpeciesDetails from "./SpeciesDetails";
import { colors } from "../styles";
import FullScreenLoader from "./FullScreenLoader";
// import Map from "./Map";
import MapBoxMap from "./Map";

const useStyles = makeStyles({
  main: {
    display: "flex",
    width: "100%",
    height: "100%",
    flexDirection: "row",
    overflow: "hidden",
  },
  loading: {
    flexGrow: 1,
    height: "100%",
  },
  left: {
    height: "100%",
    width: "400px",
    backgroundColor: colors.secondary,
    overflowY: "scroll",
    padding: "20px",
  },
  center: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },
  right: {
    width: "280px",
    overflowY: "scroll",
    height: "100%",
    backgroundColor: colors.secondary,
  },
  map: {
    flexGrow: 1,
    backgroundColor: "silver",
  },
  images: {
    height: "20%",
  },
});

const SpeciesLayout: FC = props => {
  const classes = useStyles();
  const context = useContext();
  if (!context.currentSpecies) return null;

  return (
    <section className={classes.main}>
      <aside className={classes.left}>
        <SpeciesDetails />
      </aside>
      <div className={classes.center}>
        <div className={classes.map}>
          <MapBoxMap species={context.currentSpecies} />
        </div>
        <div className={classes.images} />
      </div>
      <div className={classes.right}>
        <SpeciesNav />
      </div>
    </section>
  );
};

export default SpeciesLayout;
