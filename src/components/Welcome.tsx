import React, { FC } from "react";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  main: {
    marginBottom: 20,
    minHeight: "min-content",
    height: "100%"
  }
});

const Welcome: FC = props => {
  const classes = useStyles();

  return (
    <div className={classes.main}>
      <h3>Welcome</h3>
    </div>
  );
};

export default Welcome;
