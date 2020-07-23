import React from "react";

import { stringToColour } from "../../../../utils/stringToColor";
import { List, ListSubheader } from "@material-ui/core";

type Props = {
  title: string;
  children: JSX.Element[];
};

/**
 * @param children have to be array of mui list element
 */
const HousesSteetList: React.FC<Props> = ({ title, children }) => {
  const color = stringToColour(title.substr(0, 4));
  return (
    <List
      dense
      subheader={<ListSubheader>{title.substr(0, 17) + "..."}</ListSubheader>}
      style={{ border: `3px solid  ${color}`, backgroundColor: color }}
    >
      {children}
    </List>
  );
};

export default HousesSteetList;
