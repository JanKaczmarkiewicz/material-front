import React from "react";
import { Day_day_pastoralVisits_entrances as Entrance } from "../../../generated/Day";
import { ListSubheader, List } from "@material-ui/core";
import Item from "./Item";
import { WithIndex } from "../../../utils/splitByLabel";
import { sortByHouseNumber } from "../../../utils/sortByHouseNumber";

type GroupProps = {
  label: string;
  entrances: WithIndex<Entrance>[];
};

const Group: React.FC<GroupProps> = React.memo(({ entrances, label }) => (
  <List subheader={<ListSubheader>{label}</ListSubheader>}>
    {sortByHouseNumber(entrances, ({ house }) => house?.number).map(
      (entrance) => (
        <Item
          key={`g-${entrance.id}`}
          entrance={entrance}
          index={entrance.index}
        />
      )
    )}
  </List>
));

export default Group;
