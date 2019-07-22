/* eslint-disable react-hooks/exhaustive-deps */

import React, { FC } from "react";
import Header from "./components/Header";
import SpeciesLayout from "./components/SpeciesLayout";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  layout: {
    display: "flex",
    height: "100vh",
    flexDirection: "column",
    overflow: "hidden"
  },
  main: {
    flexGrow: 1,
    overflow: "hidden",
    height: "100%"
  }
});

const App: FC = () => {
  const classes = useStyles();

  // TODO: Render either the DesktopApp or the MobileApp depending on the screensize
  return (
    <div className={classes.layout}>
      <Header />
      <div className={classes.main}>
        <SpeciesLayout />
      </div>
    </div>
  );
};

export default App;
