/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: EntranceHouseFragment
// ====================================================

export interface EntranceHouseFragment_street {
  id: string;
  name: string;
}

export interface EntranceHouseFragment {
  id: string;
  number: string;
  street: EntranceHouseFragment_street | null;
}
