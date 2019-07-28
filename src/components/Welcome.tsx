import React, { FC, useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import FeaturedImage from "./FeaturedImage";
import { dimensions, colors } from "../styles";
import { useContext } from "../context";
import shuffle from "lodash/shuffle";

const useStyles = makeStyles({
  main: {
    marginBottom: 20,
    minHeight: "min-content",
    height: "100%"
  },
  content: {
    padding: 20
  },
  title: {
    color: colors.black,
    marginTop: 0,
    marginBottom: 10
  },
  intro: {
    lineHeight: "1.4em",
    "& a": {
      fontWeight: 700,
      color: colors.black,
      textDecoration: "none"
    },
    "& a:hover": {
      textDecoration: "underline"
    }
  },
  standForWildlife: {
    textAlign: "center",
    "& img": {
      width: 200,
      height: 200
    }
  }
});

const Welcome: FC = props => {
  const classes = useStyles();
  const context = useContext();

  const [state, setState] = useState({
    shuffledSpecies: shuffle(context.speciesList),
    speciesIndex: 0
  });

  // Rotate through the species
  useEffect(() => {
    const timer = setInterval(() => {
      const index = state.speciesIndex;
      const speciesIndex =
        index === state.shuffledSpecies.length - 1 ? 0 : state.speciesIndex + 1;
      setState({ ...state, speciesIndex });
    }, 5000);
    return () => clearTimeout(timer);
  }, [state]);

  return (
    <div className={classes.main}>
      <FeaturedImage
        width={dimensions.leftColumnWidth}
        height={200}
        species={state.shuffledSpecies[state.speciesIndex]}
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
