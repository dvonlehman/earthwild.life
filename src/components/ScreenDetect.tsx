import React, { FC } from "react";
import { makeStyles } from "@material-ui/styles";
import {
  colors,
  SMALL_SCREEN_MEDIA_QUERY,
  LARGE_SCREEN_MEDIA_QUERY,
} from "../styles";
import { ScreenSize } from "../types";

const useStyles = (screenSize: ScreenSize) => {
  return makeStyles({
    app: {
      display: "flex",
      width: "100%",
    },
    warning: {
      display: "none",
      height: "100vh",
      alignItems: "center",
      justifyContent: "center",
    },
    warningContent: {
      backgroundColor: colors.lightGray,
      color: colors.black,
      padding: 20,
      borderRadius: 4,
      fontSize: 16,
      width: 400,
      maxWidth: "80%",

      "& button": {
        display: "block",
        width: "100%",
        padding: 14,
        fontSize: 15,
        textTransform: "uppercase",
        textAlign: "center",
        backgroundColor: colors.mediumGray,
        cursor: "pointer",
      },
    },
    // Show the screen warning if the screen size changes such that
    // we are no longer looking at the appropriate layout.
    [screenSize === ScreenSize.Large
      ? SMALL_SCREEN_MEDIA_QUERY
      : LARGE_SCREEN_MEDIA_QUERY]: {
      app: {
        display: "none",
      },
      warning: {
        display: "flex",
      },
    },
  });
};

interface ScreenDetectProps {
  screenSize: ScreenSize;
}

const ScreenDetect: FC<ScreenDetectProps> = props => {
  const { screenSize } = props;
  const classes = useStyles(screenSize)();

  return (
    <>
      <div className={classes.warning}>
        <div className={classes.warningContent}>
          <p>
            You are currently viewing the {props.screenSize.toLowerCase()}{" "}
            screen version of the app.
          </p>
          <button onClick={() => window.location.reload()}>
            View the{" "}
            {screenSize === ScreenSize.Large
              ? ScreenSize.Small
              : ScreenSize.Large}{" "}
            screen version
          </button>
        </div>
      </div>
      <div className={classes.app}>{props.children}</div>
    </>
  );
};

export default ScreenDetect;
