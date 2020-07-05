/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PastoralVisitsInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: DaySchedule
// ====================================================

export interface DaySchedule_pastoralVisits_priest {
  id: string;
  username: string;
}

export interface DaySchedule_pastoralVisits_entrances {
  id: string;
  comment: string | null;
}

export interface DaySchedule_pastoralVisits {
  id: string;
  priest: DaySchedule_pastoralVisits_priest | null;
  reeceTime: any;
  visitTime: any;
  entrances: DaySchedule_pastoralVisits_entrances[];
}

export interface DaySchedule {
  pastoralVisits: DaySchedule_pastoralVisits[];
}

export interface DayScheduleVariables {
  input: PastoralVisitsInput;
}
