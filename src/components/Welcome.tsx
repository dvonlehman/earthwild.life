import React, { FC } from "react";
import { makeStyles } from "@material-ui/core/styles";
import RotatingSpeciesImage from "./RotatingSpeciesImage";
import { dimensions, colors } from "../styles";
import { useContext } from "../context";

const useStyles = makeStyles({
  main: {
    marginBottom: 20,
    minHeight: "min-content",
    height: "100%",
  },
  content: {
    padding: 20,
  },
  title: {
    color: colors.black,
    marginTop: 0,
    marginBottom: 10,
  },
  intro: {
    lineHeight: "1.4em",
    "& a": {
      fontWeight: 700,
      color: colors.black,
      textDecoration: "none",
    },
    "& a:hover": {
      textDecoration: "underline",
    },
  },
  standForWildlife: {
    textAlign: "center",
    "& img": {
      width: 200,
      height: 200,
    },
  },
});

const Welcome: FC = props => {
  const classes = useStyles();
  const context = useContext();

  return (
    <div className={classes.main}>
      <RotatingSpeciesImage
        dimensions={[dimensions.leftColumnWidth * 2, 400]}
        height={200}
        species={context.speciesList}
      />
      <div className={classes.content}>
        <h2 className={classes.title}>Welcome</h2>
        <p className={classes.intro}>
          This interactive site highlights many of the global priority species
          the <a href="https://www.wcs.org">Wildlife Conservation Society</a> is
          working diligently to protect. Drill into the details of a particular
          species by clicking a dot on the map or using the menu at the right.
        </p>
        <div className={classes.standForWildlife}>
          <a href="https://www.wcs.org">
            <img src="/stand-for-wildlife.jpg" alt="Stand for Wildlife" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
