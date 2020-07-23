import React from "react";
import { ListSubheader, List } from "@material-ui/core";
import Item from "./Item";
import { WithIndex } from "../../../../utils/splitByLabel";
import { Day_day_pastoralVisits_entrances as Entrance } from "../../../../generated/Day";
import { sortByHouseNumber } from "../../../../utils/sortByHouseNumber";
import { stringToColour } from "../../../../utils/stringToColor";
import HousesSteetList from "./HousesSteetList";

type GroupProps = {
  label: string;
  entrances: WithIndex<Entrance>[];
};

const Group: React.FC<GroupProps> = React.memo(({ entrances, label }) => {
  return (
    <HousesSteetList title={label}>
      {sortByHouseNumber(entrances, ({ house }) => house?.number).map(
        (entrance) => (
          <Item
            key={`g-${entrance.id}`}
            entrance={entrance}
            index={entrance.index}
          />
        )
      )}
    </HousesSteetList>
  );
});

export default Group;
