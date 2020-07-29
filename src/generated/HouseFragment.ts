/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: HouseFragment
// ====================================================

export interface HouseFragment_street {
  id: string;
  name: string;
}

export interface HouseFragment {
  id: string;
  number: string;
  street: HouseFragment_street | null;
}
