import React, { FC } from "react";
import { SpeciesProps } from "../types";
import { makeStyles } from "@material-ui/core/styles";

// import { colors } from "../styles";

const useStyles = makeStyles({
  root: {
    marginTop: 20
  },
  title: {
    margin: 0,
    marginBottom: 8
  },
  list: {
    padding: 0,
    margin: 0,
    listStylePosition: "outside",
    marginLeft: 20,
    "& li": {
      marginBottom: 5
    },
    "& li:last-child": {
      marginBottom: 0
    }
  }
});

const ThreatList: FC<SpeciesProps> = props => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <h4 className={classes.title}>Threats</h4>
      <ul className={classes.list}>
        {props.species.threats.map(t => (
          <li key={t}>{t}</li>
        ))}
      </ul>
    </div>
  );
};

export default ThreatList;
