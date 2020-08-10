import React, { useCallback } from "react";
import { Provider } from "./DayContext";
import { useSeasonContext } from "../Season/SeasonContext";
import { DayVariables, Day } from "../../generated/Day";
import { useQuery, useMutation } from "@apollo/react-hooks";
import {
  DAY,
  RELOCATE_ENTRANCES,
  DELETE_ENTRANCES,
  ADD_ENTRANCES,
  ADD_PASTORAL_VISIT,
  UPDATE_PASTORAL_VISIT,
} from "../../components/routes/calendar/actions";
import {
  RelocateEntrances,
  RelocateEntrancesVariables,
} from "../../generated/RelocateEntrances";
import {
  DeleteEntrances,
  DeleteEntrancesVariables,
} from "../../generated/DeleteEntrances";
import {
  AddEntrances,
  AddEntrancesVariables,
} from "../../generated/AddEntrances";
import { ActionTypes, useDayReducer } from "./dayReducer";
import {
  AddPastoralVisit,
  AddPastoralVisitVariables,
} from "../../generated/AddPastoralVisit";
import {
  RelocateEntrancesHandler,
  CreateEntrancesHandler,
  DeleteEntrancesHandler,
  AddPastoralVisitHandler,
  UpdatePastoralVisitHandler,
} from "../../types/day";
import {
  UpdatePastoralVisit,
  UpdatePastoralVisitVariables,
} from "../../generated/UpdatePastoralVisit";

interface Props {
  dayId: string;
  children: React.ReactNode;
}

const DayProvider: React.FC<Props> = ({ children, dayId }) => {
  const { currentSeason } = useSeasonContext();

  const dayQueryVariables: DayVariables = {
    input: { id: dayId },
    season: currentSeason.id,
  };

  const dispathDay = useCallback(useDayReducer(dayQueryVariables), []);

  const { loading, error, data } = useQuery<Day, DayVariables>(DAY, {
    variables: dayQueryVariables,
  });

  const [updatePastoralVisitMutation] = useMutation<
    UpdatePastoralVisit,
    UpdatePastoralVisitVariables
  >(UPDATE_PASTORAL_VISIT);

  const [relocateEntrancesMutation] = useMutation<
    RelocateEntrances,
    RelocateEntrancesVariables
  >(RELOCATE_ENTRANCES);

  const [deleteEntrancesMutation] = useMutation<
    DeleteEntrances,
    DeleteEntrancesVariables
  >(DELETE_ENTRANCES);

  const [addEntrancesMutation] = useMutation<
    AddEntrances,
    AddEntrancesVariables
  >(ADD_ENTRANCES, {
    onCompleted: (data) => {
      if (!data.addEntrances) return;
      dispathDay({
        type: ActionTypes.CREATE_ENTRANCES,
        payload: { entrances: data.addEntrances },
      });
    },
  });

  const [addPastoralVisitMutation] = useMutation<
    AddPastoralVisit,
    AddPastoralVisitVariables
  >(ADD_PASTORAL_VISIT, {
    onCompleted: (data) => {
      if (!data.addPastoralVisit) return;
      dispathDay({
        type: ActionTypes.ADD_PASTORAL_VISIT,
        payload: { pastoralVisit: data.addPastoralVisit },
      });
    },
  });

  const updatePastoralVisitHandler: UpdatePastoralVisitHandler = useCallback(
    (payload) => {
      updatePastoralVisitMutation({
        variables: {
          input: payload,
        },
      });
    },
    []
  );

  const addPastoralVisitHandler: AddPastoralVisitHandler = useCallback(
    (payload) => {
      if (!data?.day) return;

      addPastoralVisitMutation({
        variables: {
          input: { day: data.day.id, ...payload },
        },
      });
    },
    []
  );

  const handleFakeEntrancesCreation: CreateEntrancesHandler = useCallback(
    (payload) => {
      dispathDay({
        type: ActionTypes.CREATE_FAKE_ENTRANCES,
        payload,
      });

      addEntrancesMutation({
        variables: {
          input: {
            houses: payload.housesIds,
            pastoralVisit: payload.destinationPastoralVisitId,
          },
        },
      });
    },
    []
  );

  const handleEntrancesRelocation: RelocateEntrancesHandler = useCallback(
    (payload) => {
      dispathDay({
        type: ActionTypes.RELOCATE_ENTRANCES,
        payload,
      });

      relocateEntrancesMutation({
        variables: {
          ids: payload.entrancesIds,
          to: payload.destinationPastoralVisitId,
        },
      });
    },
    []
  );

  const handleEntrancesRemoval: DeleteEntrancesHandler = useCallback(
    (payload) => {
      dispathDay({
        type: ActionTypes.DELETE_ENTRANCES,
        payload,
      });
      deleteEntrancesMutation({
        variables: { input: { ids: payload.entrancesIds } },
      });
    },
    []
  );

  if (loading) return <div>loading...</div>;
  if (error || !data || !data.day) return <div>error</div>;

  return (
    <Provider
      value={{
        day: data.day,
        dayQueryVariables,
        deleteEntrances: handleEntrancesRemoval,
        relocateEntrances: handleEntrancesRelocation,
        createEntrances: handleFakeEntrancesCreation,
        addPastoralVisit: addPastoralVisitHandler,
        updatePastoralVisit: updatePastoralVisitHandler,
      }}
    >
      {children}
    </Provider>
  );
};

export default DayProvider;
