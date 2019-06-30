import React, { FC } from "react";
import classNames from "classnames";
// import { makeStyles } from "@material-ui/styles";
import { useContext } from "../context";

// const useStyles = makeStyles({});

const SpeciesNav: FC = props => {
  const context = useContext();

  return (
    <nav>
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
