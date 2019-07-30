import React, { FC } from "react";
import { makeStyles } from "@material-ui/styles";
import { colors } from "../../styles";
import { useContext } from "../../context";
import SummaryQuote from "../SummaryQuote";
import SpeciesStatus from "../SpeciesStatus";
// import SubSpeciesList from "../SubSpeciesList";
// import ThreatList from "../ThreatList";
// import WcsHelpLink from "../WcsHelpLink";
import CloudinaryImage from "../CloudinaryImage";

const useStyles = makeStyles({
  main: {
    backgroundColor: colors.white
  },
  content: {
    padding: "15px 20px"
  },
  featuredImage: {
    minWidth: "100%",
    maxWidth: "100%"
  },
  title: {
    color: colors.black,
    marginTop: 0,
    marginBottom: 10
  }
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
      <CloudinaryImage
        alt={currentSpecies.title}
        className={classes.featuredImage}
        width={600}
        height={400}
        path={currentSpecies.featuredImage.url}
        crop="fill"
      />

      <section>
        <div className={classes.content}>
          <h2 className={classes.title}>{currentSpecies.title}</h2>
          <SpeciesStatus species={currentSpecies} />
        </div>
        <SummaryQuote species={currentSpecies} />

        {/* <div className={classes.content}>
          <WcsHelpLink url={currentSpecies.urls.wcs} />

          {currentSpecies.subSpecies.length > 1 && (
            <SubSpeciesList species={currentSpecies} />
          )}
          <ThreatList species={currentSpecies} />
        </div> */}
      </section>
    </div>
  );
};

export default SpeciesDetails;
