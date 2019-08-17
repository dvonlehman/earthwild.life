import React, { FC } from "react";
import { useContext } from "./context";
import Header from "./components/mobile/Header";
import Footer from "./components/mobile/Footer";

import { makeStyles } from "@material-ui/styles";
import Welcome from "./components/mobile/Welcome";
import SpeciesDetails from "./components/mobile/SpeciesDetails";
import ScreenDetect from "./components/ScreenDetect";
import { ScreenSize } from "./types";

const useStyles = makeStyles({
  layout: {},
  main: {},
});

const MobileApp: FC = () => {
  const classes = useStyles();
  const context = useContext();

  return (
    <ScreenDetect screenSize={ScreenSize.Small}>
      <div className={classes.layout}>
        <Header />
        <div className={classes.main}>
          {context.currentSpecies ? <SpeciesDetails /> : <Welcome />}
        </div>
        <Footer />
      </div>
    </ScreenDetect>
  );
};

export default MobileApp;
