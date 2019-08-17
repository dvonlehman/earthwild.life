import React from "react";
import { makeStyles } from "@material-ui/styles";
import { colors } from "../styles";
import { SpeciesProps } from "../types";

const useStyles = makeStyles({
  button: {
    minHeight: 40,
    backgroundColor: colors.black,
    display: "flex",
    textDecoration: "none",
    fontSize: 14,
    fontWeight: 500,
    color: colors.white,
    backgroundImage: "url(/wcs-logo.png)",
    backgroundSize: "auto 40px",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "10px 10px",
    padding: "10px 10px 10px 75px",
    borderRadius: 5,
    "&:hover": {
      color: colors.mediumGray,
    },
  },
});

const WcsHelpLink = (props: SpeciesProps) => {
  const classes = useStyles();

  return (
    <a
      className={classes.button}
      href={props.species.urls.wcs}
      target="_blank"
      rel="noopener noreferrer"
    >
      <span>
        Learn how the Wildlife Conservation Society is helping the{" "}
        {props.species.title}
      </span>
    </a>
  );
};

export default WcsHelpLink;
