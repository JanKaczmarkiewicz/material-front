import { createContext } from "../util";
import { Day_day, DayVariables } from "../../generated/Day";
import {
  AddPastoralVisitHandler,
  DeleteEntrancesHandler,
  RelocateEntrancesHandler,
  CreateEntrancesHandler,
  UpdatePastoralVisitHandler,
} from "../../types/day";

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
