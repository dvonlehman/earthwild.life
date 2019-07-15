import React, { FC } from "react";
import { ReactComponent as Critical } from "../icons/category/critical.svg";
import { ReactComponent as Endandered } from "../icons/category/endangered.svg";
import { ReactComponent as Vulnerable } from "../icons/category/vulnerable.svg";
import { ReactComponent as NearThreatened } from "../icons/category/near-threatened.svg";
import { RedListCategory } from "../types";

const RedListCategoryIcon: FC<{ category: RedListCategory }> = ({
  category,
}) => {
  switch (category) {
    case "Critically Endangered":
      return <Critical />;
    case "Endangered":
      return <Endandered />;
    case "Vulnerable":
      return <Vulnerable />;
    case "Near Threatened":
      return <NearThreatened />;
    default:
      return null;
  }
};

export default RedListCategoryIcon;
