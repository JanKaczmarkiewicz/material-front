/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { FindOneInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: Street
// ====================================================

export interface Street_street_houses {
  id: string;
  number: string;
}

export interface Street_street {
  id: string;
  houses: Street_street_houses[];
  name: string;
}

export interface Street {
  street: Street_street | null;
}

export interface StreetVariables {
  input: FindOneInput;
}
