import React, { FC } from "react";
import { makeStyles } from "@material-ui/styles";
import { useContext } from "../context";
import SpeciesNav from "./SpeciesNav";
import SpeciesDetails from "./SpeciesDetails";
import { colors } from "../styles";

const useStyles = makeStyles({
  main: {
    display: "flex",
    width: "100%",
    height: "100%",
    flexDirection: "row",
    overflow: "hidden"
  },
  left: {
    height: "100%",
    width: "25%",
    backgroundColor: colors.secondary,
    overflow: "hidden"
  },
  center: {
    width: "40%"
  },
  right: {
    borderLeft: "solid 2px black",
    width: "35%",
    overflowY: "scroll",
    padding: "20px",
    height: "100%",
    backgroundColor: colors.secondary
  }
});

const SpeciesLayout: FC = props => {
  const classes = useStyles();
  const context = useContext();
  if (!context.currentFamily) return null;

  return (
    <section className={classes.main}>
      <aside className={classes.left}>
        <SpeciesNav />
      </aside>
      <div className={classes.center}>
        <h2>{context.currentFamily.title}</h2>
      </div>
      <div className={classes.right}>
        <SpeciesDetails />
      </div>
    </section>
  );
};

export default SpeciesLayout;
