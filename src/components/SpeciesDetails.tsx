import React, { FC } from "react";
// import classNames from "classnames";
import { makeStyles } from "@material-ui/styles";
import { dimensions } from "../styles";
import { useContext } from "../context";
import { colors } from "../styles";
import CloudinaryImage from "./CloudinaryImage";
import SummaryQuote from "./SummaryQuote";
import SpeciesStatus from "./SpeciesStatus";
import SubSpeciesList from "./SubSpeciesList";
import ThreatList from "./ThreatList";
import WcsHelpLink from "./WcsHelpLink";

const IMAGE_DIMS = [dimensions.leftColumnWidth, 200];

const useStyles = makeStyles({
  main: {
    marginBottom: 20,
    minHeight: "min-content",
    height: "100%"
  },
  image: {
    width: IMAGE_DIMS[0],
    height: IMAGE_DIMS[1]
  },
  content: {
    padding: "15px 20px"
  },
  title: {
    color: colors.black,
    marginTop: 0,
    marginBottom: 10
  }
});

const SpeciesNav: FC = props => {
  const context = useContext();
  const classes = useStyles();

  const { currentSpecies, isLoading } = context;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!currentSpecies) return null;

  return (
    <div className={classes.main}>
      <CloudinaryImage
        className={classes.image}
        alt={currentSpecies.title}
        width={dimensions.leftColumnWidth}
        height={IMAGE_DIMS[1]}
        path={currentSpecies.featuredImage}
        crop="fill"
      />
      <section>
        <div className={classes.content}>
          <h2 className={classes.title}>{currentSpecies.title}</h2>
          <SpeciesStatus species={currentSpecies} />
        </div>
        <SummaryQuote species={currentSpecies} />

        <div className={classes.content}>
          <WcsHelpLink url={currentSpecies.urls.wcs} />

          {currentSpecies.subSpecies.length > 1 && (
            <SubSpeciesList species={currentSpecies} />
          )}
          <ThreatList species={currentSpecies} />
        </div>
      </section>
    </div>
  );
};

export default SpeciesNav;
