import React from "react";
import { makeStyles } from "@material-ui/styles";
import { colors } from "../styles";

const useStyles = makeStyles({
  button: {
    height: 50,
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
      color: colors.mediumGray
    }
  }
});

const WcsHelpLink = (props: { url: string }) => {
  const classes = useStyles();

  return (
    <a
      className={classes.button}
      href={props.url}
      target="_blank"
      rel="noopener noreferrer"
    >
      <span>Learn how the Wildlife Conservation Society is helping</span>
    </a>
  );
};

export default WcsHelpLink;
