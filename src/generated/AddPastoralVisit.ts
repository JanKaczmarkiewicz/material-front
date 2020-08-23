/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AddPastoralVisitInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: AddPastoralVisit
// ====================================================

export interface AddPastoralVisit_addPastoralVisit_priest {
  id: string;
  username: string;
}

export interface AddPastoralVisit_addPastoralVisit_acolytes {
  id: string;
  username: string;
}

export interface AddPastoralVisit_addPastoralVisit_entrances_house_street {
  id: string;
  name: string;
}

export interface AddPastoralVisit_addPastoralVisit_entrances_house {
  id: string;
  number: string;
  street: AddPastoralVisit_addPastoralVisit_entrances_house_street | null;
}

export interface AddPastoralVisit_addPastoralVisit_entrances {
  id: string;
  comment: string | null;
  house: AddPastoralVisit_addPastoralVisit_entrances_house | null;
}

export interface AddPastoralVisit_addPastoralVisit {
  id: string;
  priest: AddPastoralVisit_addPastoralVisit_priest | null;
  acolytes: AddPastoralVisit_addPastoralVisit_acolytes[];
  hour: string;
  entrances: AddPastoralVisit_addPastoralVisit_entrances[];
}

export interface AddPastoralVisit {
  addPastoralVisit: AddPastoralVisit_addPastoralVisit;
}

export interface AddPastoralVisitVariables {
  input: AddPastoralVisitInput;
}
