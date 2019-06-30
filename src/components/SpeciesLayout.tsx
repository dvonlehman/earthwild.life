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
    width: "30%",
    backgroundColor: colors.secondary,
    overflowY: "scroll",
    padding: "20px"
  },
  center: {
    width: "50%"
  },
  right: {
    width: "20%",
    overflowY: "scroll",
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
        <SpeciesDetails />
      </aside>
      <div className={classes.center} />
      <div className={classes.right}>
        <SpeciesNav />
      </div>
    </section>
  );
};

export default SpeciesLayout;
