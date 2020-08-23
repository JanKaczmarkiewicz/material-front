/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum RecordState {
  ACCEPTED = "ACCEPTED",
  REJECTED = "REJECTED",
  UNCERTAIN = "UNCERTAIN",
  UNKNOWN = "UNKNOWN",
}

export interface AddDayInput {
  season: string;
  visitDate: string;
  reeceDate: string;
  assignedStreets?: (string | null)[] | null;
}

export interface AddEntrancesInput {
  houses: string[];
  pastoralVisit: string;
}

export interface AddPastoralVisitInput {
  priest?: string | null;
  acolytes?: string[] | null;
  hour: string;
  day: string;
}

export interface DeleteManyInput {
  ids: string[];
}

export interface FindOneInput {
  id: string;
}

export interface UpdatePastoralVisitInput {
  id: string;
  priest?: string | null;
  hour?: string | null;
  acolytes?: string[] | null;
}

export interface UpdateStreetInput {
  id: string;
  name?: string | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
