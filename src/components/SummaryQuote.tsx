import React, { FC } from "react";
import { Species } from "../types";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  blockquote: {
    margin: 0,
    zIndex: 1,
    position: "relative",
    fontSize: 16,
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

const SummaryQuote: FC<{ species: Species }> = props => {
  const classes = useStyles();

  let sourceOrg;
  switch (props.species.summary.source) {
    case "wcs":
      sourceOrg = "Wildlife Conservation Society";
      break;
    case "redlist":
      sourceOrg = "IUCN Red List";
      break;
    default:
      throw new Error(`Invalid quote source`);
  }

  return (
    <blockquote className={classes.blockquote}>
      {props.species.summary.text}
      <footer>{sourceOrg}</footer>
    </blockquote>
  );
};

export default SummaryQuote;
