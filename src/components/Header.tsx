import React, { FC } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useContext } from "../context";
import DonateLink from "./DonateLink";
import { colors } from "../styles";
import { ScreenSize } from "../types";

const useStyles = makeStyles({
  header: {
    padding: "0 10px",
    height: 70,
    backgroundColor: colors.dark,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    "& a": {
      display: "flex",
    },
  },
  logo: {
    display: "inline-block",
    height: 50,
    width: "auto",
  },
});

const Header: FC = () => {
  const classes = useStyles();
  const context = useContext();

  return (
    <header className={classes.header}>
      <a href="/#">
        <img className={classes.logo} src="/logo.png" alt="logo" />
      </a>
      {context.screenSize === ScreenSize.Large && <DonateLink />}
    </header>
  );
};

export default Header;
