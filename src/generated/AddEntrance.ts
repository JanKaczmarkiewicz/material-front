/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AddEntrance
// ====================================================

export interface AddEntrance_addEntrance_house_street {
  id: string;
  name: string;
}

export interface AddEntrance_addEntrance_house {
  id: string;
  number: string;
  street: AddEntrance_addEntrance_house_street | null;
}

export interface AddEntrance_addEntrance {
  id: string;
  comment: string | null;
  house: AddEntrance_addEntrance_house | null;
}

export interface AddEntrance {
  addEntrance: AddEntrance_addEntrance;
}

export interface AddEntranceVariables {
  houseId: string;
  pastoralVisitId: string;
}
