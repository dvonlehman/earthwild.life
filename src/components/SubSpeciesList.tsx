import React, { FC } from "react";
import { makeStyles } from "@material-ui/styles";
import { SpeciesProps } from "../types";

const useStyles = makeStyles({
  header: { margin: "0 0 10px" },
  list: {
    listStyleType: "none",
    margin: 0,
    padding: 0,
    "& li": {
      display: "flex",
      alignItems: "center",
      marginBottom: 7,
    },
  },
  mapColor: {
    display: "block",
    width: 20,
    height: 20,
    borderWidth: 2,
    borderStyle: "solid",
    marginRight: 7,
    opacity: 0.7,
  },
});

const SubSpeciesList: FC<SpeciesProps> = ({ species }) => {
  const classes = useStyles();

  return (
    <>
      <h4 className={classes.header}>Sub-Species</h4>
      <ul className={classes.list}>
        {species.subSpecies.map(subSpecies => (
          <li key={subSpecies.id}>
            <span
              className={classes.mapColor}
              style={{
                backgroundColor: subSpecies.mapColor,
                borderColor: subSpecies.mapColor,
              }}
            />
            <span>{subSpecies.commonName}</span>
          </li>
        ))}
      </ul>
    </>
  );
};

export default SubSpeciesList;
