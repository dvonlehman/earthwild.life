import React, { FC } from "react";
import classNames from "classnames";
import { makeStyles } from "@material-ui/styles";
import { useContext } from "../context";
import { colors } from "../styles";
import RedListCategoryIcon from "./RedListCategoryIcon";

const useStyles = makeStyles({
  main: {
    color: colors.white,
    "& ul": {
      margin: 0,
      padding: 0,
    },
    "& li": {
      listStyleType: "none",
      display: "flex",
      borderBottom: `solid 1px ${colors.mediumGray}`,
    },
  },
  link: {
    cursor: "pointer",
    height: 40,
    padding: "0 20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    color: colors.black,
    textDecoration: "none",
    fontWeight: 700,
    fontSize: 16,
    "&.active": {
      backgroundColor: colors.mediumGray,
    },
    "&:hover:not(.active)": {
      backgroundColor: colors.lightGray,
    },
  },
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
                  species.slug === context.currentSpecies.slug,
              })}
              href={`#${species.slug}`}
            >
              <span>{species.title}</span>
              <RedListCategoryIcon category={species.category} />
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default SpeciesMenu;
