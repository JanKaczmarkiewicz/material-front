/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { FindOneInput, RecordState } from "./globalTypes";

// ====================================================
// GraphQL query operation: PastoralVisit
// ====================================================

export interface PastoralVisit_pastoralVisit_priest {
  id: string;
  username: string;
}

export interface PastoralVisit_pastoralVisit_acolytes {
  id: string;
  username: string;
}

export interface PastoralVisit_pastoralVisit_day {
  reeceDate: string;
  visitDate: string;
}

export interface PastoralVisit_pastoralVisit_entrances_house {
  id: string;
  number: string;
}

export interface PastoralVisit_pastoralVisit_entrances {
  id: string;
  house: PastoralVisit_pastoralVisit_entrances_house | null;
  visitState: RecordState;
  reeceState: RecordState;
  comment: string | null;
}

export interface PastoralVisit_pastoralVisit {
  id: string;
  priest: PastoralVisit_pastoralVisit_priest | null;
  acolytes: PastoralVisit_pastoralVisit_acolytes[];
  day: PastoralVisit_pastoralVisit_day | null;
  entrances: PastoralVisit_pastoralVisit_entrances[];
}

export interface PastoralVisit {
  pastoralVisit: PastoralVisit_pastoralVisit | null;
}

export interface PastoralVisitVariables {
  input: FindOneInput;
}
