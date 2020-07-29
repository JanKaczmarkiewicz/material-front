/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: PastoralVisitFragment
// ====================================================

export interface PastoralVisitFragment_priest {
  id: string;
  username: string;
}

export interface PastoralVisitFragment_entrances_house_street {
  id: string;
  name: string;
}

export interface PastoralVisitFragment_entrances_house {
  id: string;
  number: string;
  street: PastoralVisitFragment_entrances_house_street | null;
}

export interface PastoralVisitFragment_entrances {
  id: string;
  comment: string | null;
  house: PastoralVisitFragment_entrances_house | null;
}

export interface PastoralVisitFragment {
  id: string;
  priest: PastoralVisitFragment_priest | null;
  entrances: PastoralVisitFragment_entrances[];
}
