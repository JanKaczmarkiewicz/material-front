/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdatePastoralVisitInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UpdatePastoralVisit
// ====================================================

export interface UpdatePastoralVisit_updatePastoralVisit_priest {
  id: string;
  username: string;
}

export interface UpdatePastoralVisit_updatePastoralVisit_acolytes {
  id: string;
  username: string;
}

export interface UpdatePastoralVisit_updatePastoralVisit {
  id: string;
  priest: UpdatePastoralVisit_updatePastoralVisit_priest | null;
  acolytes: UpdatePastoralVisit_updatePastoralVisit_acolytes[];
  hour: string;
}

export interface UpdatePastoralVisit {
  updatePastoralVisit: UpdatePastoralVisit_updatePastoralVisit | null;
}

export interface UpdatePastoralVisitVariables {
  input: UpdatePastoralVisitInput;
}
