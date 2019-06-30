import React, { FC } from "react";
import { makeStyles } from "@material-ui/styles";
import { colors } from "../styles";

const useStyles = makeStyles({
  header: {
    width: "100%",
    height: 70,
    backgroundColor: colors.dark,
    display: "flex",
    padding: "0 20px",
    // alignContent: "center",
    // justifyContent: "center",
    alignItems: "center"
  },
  logo: {
    color: colors.white
  }
});

const Header: FC = () => {
  const classes = useStyles();

  return (
    <header className={classes.header}>
      <a href="/#" className={classes.logo}>
        Logo
      </a>
    </header>
  );
};

export default Header;
