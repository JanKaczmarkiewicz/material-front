/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: PastoralVisits
// ====================================================

export interface PastoralVisits_pastoralVisits_priest {
  username: string;
}

export interface PastoralVisits_pastoralVisits_acolytes {
  username: string;
}

export interface PastoralVisits_pastoralVisits {
  id: string;
  reeceTime: any;
  visitTime: any;
  priest: PastoralVisits_pastoralVisits_priest | null;
  acolytes: PastoralVisits_pastoralVisits_acolytes[];
}

export interface PastoralVisits {
  pastoralVisits: PastoralVisits_pastoralVisits[];
}
