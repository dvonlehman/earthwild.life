import React, { FC } from "react";
import { Species } from "../types";
import { makeStyles } from "@material-ui/core/styles";
import { colors } from "../styles";

const useStyles = makeStyles({
  blockquote: {
    margin: 0,
    padding: 20,
    position: "relative",
    fontSize: 16,
    backgroundColor: colors.lightGray,
  },
  text: {
    fontFamily: "Georgia, serif",
    position: "relative",
    zIndex: 2,
    lineHeight: "1.2em",
    fontStyle: "italic",
    color: colors.darkGray,
    backgroundColor: "transparent",
    textIndent: 14,
    margin: 0,
  },
  quotemark: {
    fontFamily:
      '"Proxima Nova", "Helvetica Neue", Helvetica, Arial, sans-serif',
    position: "absolute",
    top: 0,
    left: 2,
    fontSize: "4em",
    zIndex: 1,
    color: colors.mediumGray,
  },
  cite: {
    fontStyle: "normal",
    marginTop: 7,
    display: "flex",
    flexDirection: "row-reverse",
    fontSize: 12,
    color: colors.darkGray,
  },
});

const SummaryQuote: FC<{ species: Species }> = props => {
  const classes = useStyles();

  let sourceOrg;
  switch (props.species.summary.source) {
    case "wcs":
      sourceOrg = "Wildlife Conservation Society";
      break;
    case "redList":
      sourceOrg = "IUCN Red List";
      break;
    default:
      throw new Error(`Invalid quote source ${props.species.summary.source}`);
  }

  return (
    <blockquote className={classes.blockquote}>
      <span className={classes.quotemark}>&#8220;</span>
      <p className={classes.text}>{props.species.summary.text}</p>
      <cite className={classes.cite}>&mdash;{sourceOrg}</cite>
    </blockquote>
  );
};

export default SummaryQuote;
