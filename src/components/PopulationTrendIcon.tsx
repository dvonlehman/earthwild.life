import React, { FC } from "react";
import { ReactComponent as Increasing } from "../icons/trending-up.svg";
import { ReactComponent as Decreasing } from "../icons/trending-down.svg";

import { PopulationTrend } from "../types";

const PopulationTrendIcon: FC<{ trend: PopulationTrend }> = ({ trend }) => {
  switch (trend) {
    case "Increasing":
      return <Increasing />;
    case "Decreasing":
      return <Decreasing />;
    case "Stable":
    default:
      return null;
  }
};

export default PopulationTrendIcon;
