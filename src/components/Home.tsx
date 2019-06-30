import React, { FC } from "react";
import { makeStyles } from "@material-ui/styles";
import { useContext } from "../context";

const useStyles = makeStyles({
  main: {
    display: "flex"
  }
});

const Home: FC = props => {
  const classes = useStyles();
  const context = useContext();

  return (
    <div className={classes.main}>
      <ul>
        {context.speciesFamilyList.map(family => (
          <li key={family.family}>
            <a href={`#${family.family}`}>{family.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
