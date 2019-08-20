import React, { FC } from "react";
import { makeStyles } from "@material-ui/styles";
import { colors } from "../../styles";
import { useContext } from "../../context";
import SummaryQuote from "../SummaryQuote";
import SpeciesStatus from "../SpeciesStatus";
import SubSpeciesList from "../SubSpeciesList";
import ThreatList from "../ThreatList";
import WcsHelpLink from "../WcsHelpLink";
import FeaturedImage from "../FeaturedImage";
import Map from "../Map";

const useStyles = makeStyles({
  main: {
    backgroundColor: colors.white,
  },
  content: {
    padding: "15px 20px",
  },
  featuredImage: {
    minWidth: "100%",
    maxWidth: "100%",
  },
  title: {
    color: colors.black,
    marginTop: 0,
    marginBottom: 10,
  },
  map: {
    width: "100%",
    height: 400,
    backgroundColor: "silver",
    position: "relative",
  },
});

const SpeciesDetails: FC = props => {
  const context = useContext();
  const classes = useStyles();

  const { currentSpecies, isLoading } = context;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!currentSpecies) return null;

  return (
    <div className={classes.main}>
      <FeaturedImage
        dimensions={[800, 600]}
        height={275}
        species={currentSpecies}
      />

      <section>
        <div className={classes.content}>
          <h2 className={classes.title}>{currentSpecies.title}</h2>
          <SpeciesStatus species={currentSpecies} />
        </div>
        <SummaryQuote species={currentSpecies} />

        {currentSpecies.subSpecies.length > 1 && (
          <div className={classes.content}>
            <SubSpeciesList species={currentSpecies} />
          </div>
        )}

        <div className={classes.map}>
          <Map
            species={currentSpecies}
            speciesList={context.speciesList}
            isLoading={false}
          />
        </div>

        <div className={classes.content}>
          <WcsHelpLink species={currentSpecies} />
          <ThreatList species={currentSpecies} />
        </div>
      </section>
    </div>
  );
};

export default SpeciesDetails;
