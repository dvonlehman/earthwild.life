import React, { FC } from "react";
import { useContext } from "./context";
import Header from "./components/Header";
import { makeStyles } from "@material-ui/styles";
import Welcome from "./components/mobile/Welcome";
import SpeciesDetails from "./components/mobile/SpeciesDetails";

const useStyles = makeStyles({
  layout: {},
  main: {}
});

const MobileApp: FC = () => {
  const classes = useStyles();
  const context = useContext();

  return (
    <>
      <div className={classes.layout}>
        <Header />
        <div className={classes.main}>
          {context.currentSpecies ? <SpeciesDetails /> : <Welcome />}
        </div>
      </div>
    </>
  );
};

export default MobileApp;
