import React, { FC } from "react";
import { makeStyles } from "@material-ui/styles";
import {
  colors,
  SMALL_SCREEN_MEDIA_QUERY,
  LARGE_SCREEN_MEDIA_QUERY
} from "../styles";
import { ScreenSize } from "../types";

const useStyles = makeStyles((props: ScreenDetectProps) => ({
  main: {
    display: "flex"
  },
  app: {
    display: "flex"
  },
  warning: {
    display: "none",
    color: colors.white,
    padding: 40
  },
  [props.screenSize === ScreenSize.Large
    ? SMALL_SCREEN_MEDIA_QUERY
    : LARGE_SCREEN_MEDIA_QUERY]: {
    app: {
      display: "none"
    },
    warning: {
      display: "flex"
    }
  }
}));

interface ScreenDetectProps {
  screenSize: ScreenSize;
}

const ScreenDetect: FC<ScreenDetectProps> = props => {
  const classes = useStyles(props);

  const changeScreenSizeText =
    props.screenSize === ScreenSize.Small
      ? "Refresh to view the large screen version"
      : "Refresh to view the small screen version";

  return (
    <div className={classes.main}>
      <div className={classes.warning}>
        <button onClick={() => window.location.reload()}>
          {changeScreenSizeText}
        </button>
      </div>
      <div className={classes.app}>{props.children}</div>
    </div>
  );
};

export default ScreenDetect;
