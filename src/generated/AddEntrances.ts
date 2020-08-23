/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AddEntrancesInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: AddEntrances
// ====================================================

export interface AddEntrances_addEntrances_house_street {
  id: string;
  name: string;
}

export interface AddEntrances_addEntrances_house {
  id: string;
  number: string;
  street: AddEntrances_addEntrances_house_street | null;
}

export interface AddEntrances_addEntrances {
  id: string;
  comment: string | null;
  house: AddEntrances_addEntrances_house | null;
}

export interface AddEntrances {
  addEntrances: AddEntrances_addEntrances[];
}

export interface AddEntrancesVariables {
  input: AddEntrancesInput;
}
