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
  blockquote: {
    zIndex: 1,
    position: "relative",
    fontSize: 14,
    lineHeight: "1.2em",
    fontStyle: "italic",
    "&:before": {
      content: "DDD",
      position: "absolute",
      top: 0,
      left: 0,
      color: "#000",
      fontSize: "6em",
      zIndex: -1,
    },
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

      <blockquote className={classes.blockquote}>
        {currentSpecies.summary.text}
      </blockquote>

      <h4>Threats</h4>
      <ul>
        {currentSpecies.threats.map(t => (
          <li key={t}>{t}</li>
        ))}
      </ul>
      {/* {currentSpecies.subSpecies.map(subSpecies => (
        <p
          key={subSpecies.id}
          dangerouslySetInnerHTML={{
            __html: subSpecies.rationale,
          }}
        />
      ))} */}
    </div>
  );
};

export default SpeciesNav;
