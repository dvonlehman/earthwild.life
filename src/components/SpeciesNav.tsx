import React, { FC } from "react";
import classNames from "classnames";
import { makeStyles } from "@material-ui/styles";
import { useContext } from "../context";
import { colors } from "../styles";

const useStyles = makeStyles({
  main: {
    color: colors.white,

    "& li": {
      listStyleType: "none"
    },
    "& a": {
      color: colors.white,
      textDecoration: "none"
    }
  }
});

const SpeciesNav: FC = props => {
  const context = useContext();
  const classes = useStyles();

  return (
    <nav className={classes.main}>
      <ul>
        {context.speciesFamilyList.map(species => (
          <li
            key={species.family}
            className={classNames({
              active:
                context.currentFamily &&
                species.family === context.currentFamily.family
            })}
          >
            <a href={`#${species.family}`}>{species.title}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default SpeciesNav;
