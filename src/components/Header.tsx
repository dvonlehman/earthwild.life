import React, { FC } from "react";
import { makeStyles } from "@material-ui/styles";
import { colors } from "../styles";

const useStyles = makeStyles({
  header: {
    padding: "0 20px",
    height: 70,
    backgroundColor: colors.dark,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between"
  },
  logo: {
    display: "inline-block",
    height: 50,
    width: "auto"
  },
  donate: {
    display: "flex",
    height: 40,
    padding: "0 20px",
    fontWeight: 500,
    fontSize: 18,
    backgroundColor: colors.green,
    borderRadius: 3,
    color: colors.white,
    textDecoration: "none",
    alignItems: "center",
    alignContent: "center",
    "&:hover": {
      color: colors.mediumGray
    }
  }
});

const Header: FC = () => {
  const classes = useStyles();

  return (
    <header className={classes.header}>
      <a href="/#">
        <img className={classes.logo} src="/logo.png" alt="logo" />
      </a>
      <a
        className={classes.donate}
        href="https://secure.wcs.org/donate/donate-and-help-save-wildlife"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span>Donate to WCS</span>
      </a>
    </header>
  );
};

export default Header;
