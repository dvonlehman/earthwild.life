import React, { FC } from "react";
import { makeStyles } from "@material-ui/styles";
import { SpeciesProps } from "../types";
import RedListCategoryIcon from "./RedListCategoryIcon";
import PopulationTrendIcon from "./PopulationTrendIcon";
import { colors } from "../styles";

const useStyles = makeStyles({
  root: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
  },
  icon: {},
  category: {
    fontWeight: 500,
    fontSize: 14,
    color: colors.darkGray,
    textTransform: "uppercase",
    margin: 0,
  },
  content: {
    marginLeft: 10,
  },
  population: {
    fontSize: 13,
    display: "flex",
    alignItems: "center",
    "& svg": {
      marginLeft: 5,
      // fill: colors.darkGray,
    },
  },
});

const SpeciesStatus: FC<SpeciesProps> = ({ species }) => {
  const classes = useStyles();

  let populationText;
  switch (species.populationTrend) {
    case "Increasing":
      populationText = "Population increasing";
      break;
    case "Decreasing":
      populationText = "Population decreasing";
      break;
    case "Stable":
      populationText = "Population is stable";
      break;
    default:
      populationText = undefined;
  }

  return (
    <div className={classes.root}>
      <div className={classes.icon}>
        <RedListCategoryIcon category={species.category} />
      </div>
      <div className={classes.content}>
        <h5 className={classes.category}>{species.category}</h5>
        {populationText && (
          <div className={classes.population}>
            <span>{populationText}</span>
            <PopulationTrendIcon trend={species.populationTrend} />
          </div>
        )}
      </div>
    </div>
  );
};

export default SpeciesStatus;
