/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { FindOneInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: Calendar
// ====================================================

export interface Calendar_streets {
  id: string;
  name: string;
}

export interface Calendar_season_days {
  id: string;
  visitDate: any;
}

export interface Calendar_season {
  days: Calendar_season_days[];
}

export interface Calendar {
  streets: Calendar_streets[];
  season: Calendar_season | null;
}

export interface CalendarVariables {
  input: FindOneInput;
}
