/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateStreetInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateStreet
// ====================================================

export interface UpdateStreet_updateStreet {
  id: string;
  name: string;
}

export interface UpdateStreet {
  updateStreet: UpdateStreet_updateStreet | null;
}

export interface UpdateStreetVariables {
  input: UpdateStreetInput;
}
