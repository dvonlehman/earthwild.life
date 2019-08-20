/* eslint-disable react/jsx-no-target-blank */

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { colors } from "../../styles";
import { WCS_DONATE_URL } from "../../variables";

const useStyles = makeStyles({
  footer: {
    backgroundColor: colors.dark,
  },
  donate: {
    color: colors.white,
    textDecoration: "none",
    padding: "10px 10px",
    textAlign: "center",
    display: "block",
  },
});

const Footer = () => {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <a className={classes.donate} href={WCS_DONATE_URL} target="_blank">
        Donate to WCS
      </a>
    </footer>
  );
};

export default Footer;
