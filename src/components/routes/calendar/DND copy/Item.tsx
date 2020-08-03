import React from "react";
import {
  Day_day_pastoralVisits_entrances as Entrance,
  Day_day_assignedStreets_unusedHouses as House,
} from "../../../../generated/Day";
import { ListItemText } from "@material-ui/core";

export const extractEntranceHouseCategory = ({ house }: Entrance) =>
  extractHouseCategory(house);

export const extractHouseCategory = (house: House | null) =>
  house?.street?.name;

export const renderEntranceHouseItemContent = (entrance: Entrance) =>
  renderHouseItemContent(entrance.house);

export const extractHouseNumber = (house: House | null) => house?.number;

export const extractEntranceHouseNumber = (entrance: Entrance) =>
  extractHouseNumber(entrance.house);

export const renderHouseItemContent = (house: House | null) => (
  <ListItemText>{extractHouseNumber(house)}</ListItemText>
);
