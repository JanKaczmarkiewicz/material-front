/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { FindOneInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: SeasonDays
// ====================================================

export interface SeasonDays_season_days {
  id: string;
  visitDate: any;
}

export interface SeasonDays_season {
  days: SeasonDays_season_days[];
}

export interface SeasonDays {
  season: SeasonDays_season | null;
}

export interface SeasonDaysVariables {
  input: FindOneInput;
}
