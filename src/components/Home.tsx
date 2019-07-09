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
        {context.speciesList.map(species => (
          <li key={species.slug}>
            <a href={`#${species.slug}`}>{species.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
