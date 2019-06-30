import React, { FC } from "react";
import { makeStyles } from "@material-ui/styles";
import { colors } from "../styles";

const useStyles = makeStyles({
  header: {
    width: "100%",
    backgroundColor: colors.dark,
    color: colors.white
  }
});

const Header: FC = () => {
  const classes = useStyles();

  return (
    <header className={classes.header}>
      <h2>Logo</h2>
    </header>
  );
};

export default Header;
