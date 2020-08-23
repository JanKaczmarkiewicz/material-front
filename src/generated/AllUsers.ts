/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AllUsers
// ====================================================

export interface AllUsers_priests {
  id: string;
  username: string;
}

export interface AllUsers_acolytes {
  id: string;
  username: string;
}

export interface AllUsers {
  priests: AllUsers_priests[];
  acolytes: AllUsers_acolytes[];
}
