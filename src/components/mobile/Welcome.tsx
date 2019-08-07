import React, { FC } from "react";
import { makeStyles } from "@material-ui/styles";
import FeaturedImage from "../FeaturedImage";
import { colors } from "../../styles";
import { useContext } from "../../context";
import SpeciesMenu from "../SpeciesMenu";

const useStyles = makeStyles({
  main: {
    marginBottom: 20,
    backgroundColor: colors.white,
  },
  content: {
    padding: 20,
    backgroundColor: colors.white,
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
      <FeaturedImage
        dimensions={[800, 600]}
        height={300}
        species={context.speciesList[0]}
      />
      <div className={classes.content}>
        <h2 className={classes.title}>Welcome</h2>
        <p className={classes.intro}>
          This interactive site highlights many of the global priority species
          the <a href="https://www.wcs.org">Wildlife Conservation Society</a> is
          working diligently to protect. Select a species below to learn more.
        </p>
      </div>

      <SpeciesMenu />

      <div className={classes.standForWildlife}>
        <a href="https://www.wcs.org">
          <img src="/stand-for-wildlife.jpg" alt="Stand for Wildlife" />
        </a>
      </div>
    </div>
  );
};

export default Welcome;
