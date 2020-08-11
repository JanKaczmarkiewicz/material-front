import React, { useMemo } from "react";
import { Grid } from "@material-ui/core";
import Column from "../dragAndDrop/Column";
import {
  extractEntranceHouseNumber,
  extractEntranceHouseCategory,
  renderEntranceHouseItemContent,
} from "../dragAndDrop/ItemUtils";
import { useDayContext } from "../../../../../context/day/DayContext";
import { Day_day_pastoralVisits_entrances } from "../../../../../generated/Day";

interface Props {}

const PastoralVisitsLists: React.FC<Props> = (props) => {
  const {
    day: { pastoralVisits },
  } = useDayContext();
  return useMemo(
    () => (
      <Grid container spacing={3} justify="center">
        {pastoralVisits.map(({ id, priest, entrances }) => (
          <Grid item xs={12} md={2} key={id}>
            <Column<Day_day_pastoralVisits_entrances>
              key={id}
              items={entrances}
              columnId={id}
              title={
                priest ? `ks. ${priest.username.split(" ")[1]}` : "Brak kapłana"
              }
              getItemNumber={extractEntranceHouseNumber}
              getElementCategory={extractEntranceHouseCategory}
              renderListItemContent={renderEntranceHouseItemContent}
            />
          </Grid>
        ))}
      </Grid>
    ),
    [pastoralVisits]
  );
};

export default PastoralVisitsLists;
