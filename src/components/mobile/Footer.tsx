import React from "react";
import { makeStyles } from "@material-ui/styles";
import { colors } from "../../styles";
import DonateLink from "../DonateLink";

const useStyles = makeStyles({
  footer: {
    backgroundColor: colors.dark,
    padding: "20px 10px",
  },
});

const Footer = () => {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <DonateLink />
    </footer>
  );
};

export default Footer;
