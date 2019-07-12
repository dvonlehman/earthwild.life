import React, { FC } from "react";
// import classNames from "classnames";
import { makeStyles } from "@material-ui/styles";
import { dimensions } from "../styles";
import { useContext } from "../context";
import CloudinaryImage from "./CloudinaryImage";

const IMAGE_DIMS = [dimensions.leftColumnWidth, 200];

const useStyles = makeStyles({
  main: {
    marginBottom: 20,
    minHeight: "min-content",
    height: "100%",
  },
  image: {
    width: IMAGE_DIMS[0],
    height: IMAGE_DIMS[1],
  },
  content: {
    padding: 20,
  },
  title: {
    marginTop: 0,
  },
  blockquote: {
    margin: 0,
    zIndex: 1,
    position: "relative",
    fontSize: 16,
    lineHeight: "1.2em",
    fontStyle: "italic",
    "&:before": {
      content: "DDD",
      position: "absolute",
      top: 0,
      left: 0,
      color: "#000",
      fontSize: "6em",
      zIndex: -1,
    },
  },
});

const SpeciesNav: FC = props => {
  const context = useContext();
  const classes = useStyles();

  const { currentSpecies, isLoading } = context;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!currentSpecies) return null;

  return (
    <div className={classes.main}>
      <CloudinaryImage
        className={classes.image}
        alt={currentSpecies.title}
        width={dimensions.leftColumnWidth}
        height={IMAGE_DIMS[1]}
        path={currentSpecies.featuredImage}
        crop="fill"
      />
      <section className={classes.content}>
        <h2 className={classes.title}>{currentSpecies.title}</h2>
        <div>{currentSpecies.populationTrend}</div>

        <blockquote className={classes.blockquote}>
          {currentSpecies.summary.text}
        </blockquote>

        {currentSpecies.subSpecies.length > 1 && (
          <>
            <h4>Sub-Species</h4>
            <ul>
              {currentSpecies.subSpecies.map(subSpecies => (
                <li key={subSpecies.id}>{subSpecies.commonName}</li>
              ))}
            </ul>
          </>
        )}

        <h4>Threats</h4>
        <ul>
          {currentSpecies.threats.map(t => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </section>

      {/* {currentSpecies.subSpecies.map(subSpecies => (
        <p
          key={subSpecies.id}
          dangerouslySetInnerHTML={{
            __html: subSpecies.rationale,
          }}
        />
      ))} */}
    </div>
  );
};

export default SpeciesNav;
