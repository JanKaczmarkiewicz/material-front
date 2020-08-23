/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ChangeAssignedStreets
// ====================================================

export interface ChangeAssignedStreets_updateDay_assignedStreets_unusedHouses_street {
  id: string;
  name: string;
}

export interface ChangeAssignedStreets_updateDay_assignedStreets_unusedHouses {
  id: string;
  number: string;
  street: ChangeAssignedStreets_updateDay_assignedStreets_unusedHouses_street | null;
}

export interface ChangeAssignedStreets_updateDay_assignedStreets {
  id: string;
  name: string;
  unusedHouses: ChangeAssignedStreets_updateDay_assignedStreets_unusedHouses[];
}

export interface ChangeAssignedStreets_updateDay_pastoralVisits_priest {
  id: string;
  username: string;
}

export interface ChangeAssignedStreets_updateDay_pastoralVisits_acolytes {
  id: string;
  username: string;
}

export interface ChangeAssignedStreets_updateDay_pastoralVisits_entrances_house_street {
  id: string;
  name: string;
}

export interface ChangeAssignedStreets_updateDay_pastoralVisits_entrances_house {
  id: string;
  number: string;
  street: ChangeAssignedStreets_updateDay_pastoralVisits_entrances_house_street | null;
}

export interface ChangeAssignedStreets_updateDay_pastoralVisits_entrances {
  id: string;
  comment: string | null;
  house: ChangeAssignedStreets_updateDay_pastoralVisits_entrances_house | null;
}

export interface ChangeAssignedStreets_updateDay_pastoralVisits {
  id: string;
  priest: ChangeAssignedStreets_updateDay_pastoralVisits_priest | null;
  acolytes: ChangeAssignedStreets_updateDay_pastoralVisits_acolytes[];
  hour: string;
  entrances: ChangeAssignedStreets_updateDay_pastoralVisits_entrances[];
}

export interface ChangeAssignedStreets_updateDay {
  assignedStreets: ChangeAssignedStreets_updateDay_assignedStreets[];
  pastoralVisits: ChangeAssignedStreets_updateDay_pastoralVisits[];
}

export interface ChangeAssignedStreets {
  updateDay: ChangeAssignedStreets_updateDay | null;
}

export interface ChangeAssignedStreetsVariables {
  id: string;
  streets: string[];
  season: string;
}
