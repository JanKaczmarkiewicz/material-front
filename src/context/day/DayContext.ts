import { createContext } from "@koleda/common-utils";

import {
  AddPastoralVisitHandler,
  DeleteEntrancesHandler,
  RelocateEntrancesHandler,
  CreateEntrancesHandler,
  UpdatePastoralVisitHandler,
} from "../../types/day";

import { DayVariables, Day_day } from "../../generated/Day";

export type DayAPI = {
  day: Day_day;
  dayQueryVariables: DayVariables;

  createEntrances: CreateEntrancesHandler;

  relocateEntrances: RelocateEntrancesHandler;

  addPastoralVisit: AddPastoralVisitHandler;

  updatePastoralVisit: UpdatePastoralVisitHandler;

  deleteEntrances: DeleteEntrancesHandler;
};

const { useContext: useDayContext, Provider } = createContext<DayAPI>();

export { useDayContext, Provider };
