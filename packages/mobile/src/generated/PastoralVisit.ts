/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { FindOneInput, RecordState } from "./globalTypes";

// ====================================================
// GraphQL query operation: PastoralVisit
// ====================================================

export interface PastoralVisit_pastoralVisit_entrances_house_street {
  id: string;
  name: string;
}

export interface PastoralVisit_pastoralVisit_entrances_house {
  id: string;
  street: PastoralVisit_pastoralVisit_entrances_house_street | null;
  number: string;
}

export interface PastoralVisit_pastoralVisit_entrances {
  id: string;
  comment: string | null;
  house: PastoralVisit_pastoralVisit_entrances_house | null;
  reeceState: RecordState;
  visitState: RecordState;
}

export interface PastoralVisit_pastoralVisit {
  id: string;
  hour: string;
  entrances: PastoralVisit_pastoralVisit_entrances[];
}

export interface PastoralVisit {
  pastoralVisit: PastoralVisit_pastoralVisit | null;
}

export interface PastoralVisitVariables {
  input: FindOneInput;
}
