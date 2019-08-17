import React, { FC, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { ReactComponent as MenuIcon } from "../../icons/menu.svg";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
// import { useContext } from "../../context";
import { colors } from "../../styles";
import SpeciesMenu from "../SpeciesMenu";

const useStyles = makeStyles({
  header: {
    padding: "0 5px",
    height: 50,
    backgroundColor: colors.dark,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logo: {
    display: "inline-block",
    height: 40,
    width: "auto",
  },
  menu: {
    border: "none",
    outline: "none",
    backgroundColor: "transparent",
    "& svg": {
      fill: colors.mediumGray,
      width: 26,
      height: 26,
    },
    "&:hover": {
      "& svg": {
        fill: `${colors.white} !important`,
      },
    },
  },
  drawer: {
    width: 270,
  },
});

const Header: FC = () => {
  const classes = useStyles();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent
  ) => {
    if (
      event &&
      event.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" ||
        (event as React.KeyboardEvent).key === "Shift")
    ) {
      return;
    }

    setDrawerOpen(open);
  };

  return (
    <>
      <header className={classes.header}>
        <a href="/#">
          <img className={classes.logo} src="/logo.png" alt="logo" />
        </a>
        <button className={classes.menu} onClick={() => setDrawerOpen(true)}>
          <MenuIcon />
        </button>
      </header>
      <SwipeableDrawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        <div className={classes.drawer}>
          <SpeciesMenu onClick={() => setDrawerOpen(false)} />
        </div>
      </SwipeableDrawer>
    </>
  );
};

export default Header;
