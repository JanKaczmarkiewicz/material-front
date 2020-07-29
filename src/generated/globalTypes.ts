/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum RecordState {
  ACCEPTED = "ACCEPTED",
  REJECTED = "REJECTED",
  UNCERTAIN = "UNCERTAIN",
  UNKNOWN = "UNKNOWN",
}

export enum Role {
  ACOLYTE = "ACOLYTE",
  ADMIN = "ADMIN",
  PRIEST = "PRIEST",
}

export interface AddDayInput {
  season: string;
  visitDate: string;
  reeceDate: string;
  assignedStreets?: (string | null)[] | null;
}

export interface DeleteOneInput {
  id: string;
}

export interface FindOneInput {
  id: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface UpdateStreetInput {
  id: string;
  name?: string | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
