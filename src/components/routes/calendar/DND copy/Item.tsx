import React from "react";
import {
  Day_day_pastoralVisits_entrances,
  Day_day_unusedHouses,
} from "../../../../generated/Day";
import { ListItemText } from "@material-ui/core";

export const extractEntranceHouseCategory = ({
  house,
}: Day_day_pastoralVisits_entrances) => extractHouseCategory(house);

export const extractHouseCategory = (house: Day_day_unusedHouses | null) =>
  house?.street?.name;

export const renderEntranceHouseItemContent = (
  entrance: Day_day_pastoralVisits_entrances
) => renderHouseItemContent(entrance.house);

export const extractHouseNumber = (house: Day_day_unusedHouses | null) =>
  house?.number;

export const extractEntranceHouseNumber = (
  entrance: Day_day_pastoralVisits_entrances
) => extractHouseNumber(entrance.house);

export const renderHouseItemContent = (house: Day_day_unusedHouses | null) => (
  <ListItemText>{extractHouseNumber(house)}</ListItemText>
);
