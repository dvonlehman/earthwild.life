import React, { FC } from "react";
import { useContext } from "./context";
import Header from "./components/Header";
import { makeStyles } from "@material-ui/styles";
import Welcome from "./components/mobile/Welcome";
import SpeciesDetails from "./components/mobile/SpeciesDetails";
import ScreenDetect from "./components/ScreenDetect";

const useStyles = makeStyles({
  layout: {},
  main: {}
});

const MobileApp: FC = () => {
  const classes = useStyles();
  const context = useContext();

  return (
    <ScreenDetect screenSize={context.screenSize}>
      <div className={classes.layout}>
        <Header />
        <div className={classes.main}>
          {context.currentSpecies ? <SpeciesDetails /> : <Welcome />}
        </div>
      </div>
    </ScreenDetect>
  );
};

export default MobileApp;
