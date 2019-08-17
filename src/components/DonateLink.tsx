import React from "react";
import { makeStyles } from "@material-ui/styles";
import { colors } from "../styles";

const useStyles = makeStyles({
  link: {
    color: colors.white,
    textDecoration: "none",
    display: "flex",
    alignItems: "center",
    backgroundImage: "url(/wcs-logo.png)",
    backgroundSize: "auto 30px",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "10px center",
    padding: "12px 10px 12px 60px",
    borderRadius: 5,
    borderStyle: "solid",
    borderColor: colors.white,
    borderWidth: 1,
    "&:hover": {
      color: colors.mediumGray,
      borderColor: colors.mediumGray,
    },
  },
});

const DonateLink = () => {
  const classes = useStyles();

  return (
    <a
      className={classes.link}
      href="https://secure.wcs.org/donate/donate-and-help-save-wildlife"
      target="_blank"
      rel="noopener noreferrer"
    >
      <span>Donate to WCS</span>
    </a>
  );
};

export default DonateLink;
