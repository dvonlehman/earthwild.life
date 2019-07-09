import React, { FC } from "react";
// import classNames from "classnames";
import { makeStyles } from "@material-ui/styles";
import { useContext } from "../context";

const useStyles = makeStyles({
  main: {
    marginBottom: 20,
    minHeight: "min-content",
    height: "100%",
  },
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
      <h2>{currentSpecies.title}</h2>
      <div>{currentSpecies.populationTrend}</div>
      {currentSpecies.subSpecies.map(subSpecies => (
        <p
          key={subSpecies.id}
          dangerouslySetInnerHTML={{
            __html: subSpecies.rationale,
          }}
        />
      ))}
    </div>
  );
};

export default SpeciesNav;
