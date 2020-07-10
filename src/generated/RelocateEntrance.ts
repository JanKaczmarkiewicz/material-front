/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: RelocateEntrance
// ====================================================

export interface RelocateEntrance_updateEntrance_house_street {
  id: string;
  name: string;
}

export interface RelocateEntrance_updateEntrance_house {
  id: string;
  number: string;
  street: RelocateEntrance_updateEntrance_house_street | null;
}

export interface RelocateEntrance_updateEntrance_pastoralVisit {
  id: string;
}

export interface RelocateEntrance_updateEntrance {
  id: string;
  comment: string | null;
  house: RelocateEntrance_updateEntrance_house | null;
  pastoralVisit: RelocateEntrance_updateEntrance_pastoralVisit | null;
}

export interface RelocateEntrance {
  updateEntrance: RelocateEntrance_updateEntrance | null;
}

export interface RelocateEntranceVariables {
  id: string;
  to: string;
}
