import React, { FC } from "react";
import classNames from "classnames";
import { makeStyles } from "@material-ui/styles";
import { useContext } from "../context";
import { colors } from "../styles";

const useStyles = makeStyles({
  main: {
    color: colors.white,
    "& ul": {
      margin: 0,
      padding: 0
    },
    "& li": {
      listStyleType: "none",
      display: "flex",
      borderBottom: `solid 1px ${colors.darkGray}`
    }
  },
  link: {
    cursor: "pointer",
    padding: "15px 20px",
    display: "block",
    width: "100%",
    color: colors.black,
    textDecoration: "none",
    fontWeight: 700,
    fontSize: 16,
    "&.active": {
      backgroundColor: colors.darkGray
    },
    "&:hover:not(.active)": {
      backgroundColor: colors.lightGray
    }
  }
});

const SpeciesMenu: FC = props => {
  const context = useContext();
  const classes = useStyles();

  return (
    <nav className={classes.main}>
      <ul>
        {context.speciesList.map(species => (
          <li key={species.slug}>
            <a
              className={classNames(classes.link, {
                active:
                  context.currentSpecies &&
                  species.slug === context.currentSpecies.slug
              })}
              href={`#${species.slug}`}
            >
              {species.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default SpeciesMenu;
