import React, { FC } from "react";
import classNames from "classnames";
import { makeStyles } from "@material-ui/styles";
import { useContext } from "../context";
import { colors } from "../styles";
import CloudinaryImage from "./CloudinaryImage";

const BORDER_RADIUS = 3;

const useStyles = makeStyles({
  main: {
    color: colors.white,

    "& ul": {
      margin: 0,
      padding: 0
    },
    "& li": {
      listStyleType: "none",
      display: "flex"
    },
    "& a": {
      backgroundColor: colors.white,
      borderRadius: BORDER_RADIUS,
      boxShadow: "10px 10px 14px -5px rgba(0,0,0,0.34)",
      display: "block",
      margin: "10px 20px",
      color: colors.dark,
      textDecoration: "none"
    },
    "& a:hover": {
      boxShadow: "10px 10px 14px -5px rgba(0,0,0,0.74)"
    }
  },
  thumbnail: {
    width: "240px",
    height: "180px",
    borderTopLeftRadius: BORDER_RADIUS,
    borderTopRightRadius: BORDER_RADIUS
  },
  caption: {
    padding: "5px 10px 10px"
  },
  title: {
    margin: 0,
    fontWeight: 400
  }
});

const SpeciesNav: FC = props => {
  const context = useContext();
  const classes = useStyles();

  return (
    <nav className={classes.main}>
      <ul>
        {context.speciesList.map(species => (
          <li
            key={species.slug}
            className={classNames({
              active:
                context.currentSpecies &&
                species.slug === context.currentSpecies.slug
            })}
          >
            <a href={`#${species.slug}`}>
              <CloudinaryImage
                alt={species.title}
                path={species.featuredImage}
                width={400}
                height={300}
                crop="fill"
                className={classes.thumbnail}
              />
              <div className={classes.caption}>
                <h4 className={classes.title}>{species.title}</h4>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default SpeciesNav;
