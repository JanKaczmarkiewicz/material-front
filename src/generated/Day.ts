/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { FindOneInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: Day
// ====================================================

export interface Day_day_unusedHouses_street {
  id: string;
  name: string;
}

export interface Day_day_unusedHouses {
  id: string;
  number: string;
  street: Day_day_unusedHouses_street | null;
}

export interface Day_day_pastoralVisits_priest {
  id: string;
  username: string;
}

export interface Day_day_pastoralVisits_entrances_house_street {
  id: string;
  name: string;
}

export interface Day_day_pastoralVisits_entrances_house {
  id: string;
  number: string;
  street: Day_day_pastoralVisits_entrances_house_street | null;
}

export interface Day_day_pastoralVisits_entrances {
  id: string;
  comment: string | null;
  house: Day_day_pastoralVisits_entrances_house | null;
}

export interface Day_day_pastoralVisits {
  id: string;
  priest: Day_day_pastoralVisits_priest | null;
  entrances: Day_day_pastoralVisits_entrances[];
}

export interface Day_day {
  id: string;
  unusedHouses: Day_day_unusedHouses[];
  reeceDate: any;
  visitDate: any;
  pastoralVisits: Day_day_pastoralVisits[];
}

export interface Day {
  day: Day_day | null;
}

export interface DayVariables {
  input: FindOneInput;
}
