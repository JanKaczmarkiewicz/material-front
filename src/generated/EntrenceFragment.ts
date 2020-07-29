/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: EntrenceFragment
// ====================================================

export interface EntrenceFragment_house_street {
  id: string;
  name: string;
}

export interface EntrenceFragment_house {
  id: string;
  number: string;
  street: EntrenceFragment_house_street | null;
}

export interface EntrenceFragment {
  id: string;
  comment: string | null;
  house: EntrenceFragment_house | null;
}
