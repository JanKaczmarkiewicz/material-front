import React, { useMemo } from "react";
import { Grid } from "@material-ui/core";
import Column from "../dragAndDrop/Column";
import {
  extractEntranceHouseNumber,
  extractEntranceHouseCategory,
  renderEntranceHouseItemContent,
} from "../dragAndDrop/ItemUtils";
import { useDayContext } from "../../../../../context/day/DayContext";

interface Props {
  onOpenSettings: (id: string) => void;
}

const PastoralVisitsLists: React.FC<Props> = ({ onOpenSettings }) => {
  const {
    day: { pastoralVisits },
  } = useDayContext();

  return useMemo(
    () => (
      <Grid container spacing={3} justify="center">
        {pastoralVisits.map(({ id, priest, entrances }) => (
          <Grid item xs={12} md={2} key={id}>
            <Column
              key={id}
              items={entrances}
              columnId={id}
              onOpenSettings={onOpenSettings}
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
