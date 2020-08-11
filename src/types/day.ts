import {
  AddPastoralVisitInput,
  UpdatePastoralVisitInput,
} from "../generated/globalTypes";

export type UpdatePastoralVisitHandler = (
  payload: UpdatePastoralVisitInput
) => void;

export type AddPastoralVisitPayload = Omit<AddPastoralVisitInput, "day">;

export type AddPastoralVisitHandler = (
  payload: AddPastoralVisitPayload
) => void;

export type DeleteEntrancesPayload = {
  sourcePastoralVisitId: string;
  entrancesIds: string[];
};

export type DeleteEntrancesHandler = (payload: DeleteEntrancesPayload) => void;

export type RelocateEntrancesPayload = {
  sourcePastoralVisitId: string;
  destinationPastoralVisitId: string;
  entrancesIds: string[];
};

export type RelocateEntrancesHandler = (
  payload: RelocateEntrancesPayload
) => void;

export type CreateEntrancesHandler = (payload: CreateEntrancesPayload) => void;

export type CreateEntrancesPayload = {
  housesIds: string[];
  destinationPastoralVisitId: string;
};
