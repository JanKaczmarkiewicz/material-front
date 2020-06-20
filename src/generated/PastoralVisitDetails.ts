/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { FindOneInput, RecordState } from "./globalTypes";

// ====================================================
// GraphQL query operation: PastoralVisitDetails
// ====================================================

export interface PastoralVisitDetails_pastoralVisit_priest {
  username: string;
}

export interface PastoralVisitDetails_pastoralVisit_entrances_house {
  number: string;
}

export interface PastoralVisitDetails_pastoralVisit_entrances {
  id: string;
  reeceState: RecordState;
  visitState: RecordState;
  comment: string | null;
  house: PastoralVisitDetails_pastoralVisit_entrances_house | null;
}

export interface PastoralVisitDetails_pastoralVisit {
  priest: PastoralVisitDetails_pastoralVisit_priest | null;
  reeceTime: any;
  visitTime: any;
  entrances: PastoralVisitDetails_pastoralVisit_entrances[];
}

export interface PastoralVisitDetails {
  pastoralVisit: PastoralVisitDetails_pastoralVisit | null;
}

export interface PastoralVisitDetailsVariables {
  input: FindOneInput;
}
