/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: EntranceFragment
// ====================================================

export interface EntranceFragment_house_street {
  id: string;
  name: string;
}

export interface EntranceFragment_house {
  id: string;
  number: string;
  street: EntranceFragment_house_street | null;
}

export interface EntranceFragment {
  id: string;
  comment: string | null;
  house: EntranceFragment_house | null;
}
