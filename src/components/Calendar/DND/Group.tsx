import React from "react";
import { DaySchedule_pastoralVisits_entrances } from "../../../generated/DaySchedule";
import { ListSubheader, List } from "@material-ui/core";
import Item from "./Item";
import { WithIndex } from "../../../utils/splitByLabel";

type GroupProps = {
  label: string;
  entrances: WithIndex<DaySchedule_pastoralVisits_entrances>[];
};

const matchLetters = /\D/g;

const Group: React.FC<GroupProps> = React.memo(({ entrances, label }) => (
  <List subheader={<ListSubheader>{label}</ListSubheader>}>
    {entrances
      .sort((e1, e2) => {
        if (!e1.house || !e2.house) {
          return 0;
        }

        const a = e1.house.number.replace(matchLetters, "");
        const b = e2.house.number.replace(matchLetters, "");

        const aValue = Number.parseInt(a, 10);
        const bValue = Number.parseInt(b, 10);

        if (Number.isNaN(aValue) || Number.isNaN(bValue)) return 0;

        return aValue > bValue ? 1 : -1;
      })
      .map((entrance) => (
        <Item
          key={`g-${entrance.id}`}
          entrance={entrance}
          index={entrance.index}
        />
      ))}
  </List>
));

export default Group;
