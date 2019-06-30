import React, { FC } from "react";
// import classNames from "classnames";
import { makeStyles } from "@material-ui/styles";
import { useContext } from "../context";

const useStyles = makeStyles({
  main: {
    marginBottom: 20,
    minHeight: "min-content",
    height: "100%"
  }
});

const SpeciesNav: FC = props => {
  const context = useContext();
  const classes = useStyles();

  const { currentFamily: family } = context;
  if (!family) return null;

  return (
    <div className={classes.main}>
      <div>{family.populationTrend}</div>
      {Object.keys(family.species).map(subSpecies => (
        <p
          key={subSpecies}
          dangerouslySetInnerHTML={{
            __html: family.species[subSpecies].rationale
          }}
        />
      ))}
    </div>
  );
};

export default SpeciesNav;
