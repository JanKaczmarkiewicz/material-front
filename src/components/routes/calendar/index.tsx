import React, { useState } from "react";
import CalendarHeader, { mouths } from "./CalendarHeader";
import CalendarBody from "./CalendarBody";
import { gql } from "apollo-boost";
import { useQuery, useMutation } from "@apollo/react-hooks";
import MainContainer from "../../Layout/container/MainContainer";
import { useSeasonContext } from "../../../context/Season/SeasonContext";
import {
  Calendar as ICalendar,
  CalendarVariables as ICalendarVariables,
  Calendar_streets,
} from "../../../generated/Calendar";
import AddDayForm from "./AddDayForm";
import { addDays } from "date-fns/esm";
import { AddDay, AddDayVariables } from "../../../generated/AddDay";

const CALENDAR = gql`
  query Calendar($input: FindOneInput!) {
    streets {
      id
      name
    }
    season(input: $input) {
      days {
        id
        visitDate
      }
    }
  }
`;

const ADD_DAY = gql`
  mutation AddDay($input: AddDayInput!) {
    addDay(input: $input) {
      id
    }
  }
`;

const initialMouth =
  new Date().getMonth() >= mouths.length ? 0 : new Date().getMonth();

const Calendar = () => {
  const [mouth, setMouth] = useState<number>(initialMouth);
  const { currentSeason } = useSeasonContext();
  const [selectedDayToAdd, setSelectedDayToAdd] = useState<Date | null>(null);
  const [selectedStreets, setSelectedStreets] = useState<Calendar_streets[]>(
    []
  );

  const handleModalClose = () => setSelectedDayToAdd(null);
  const handleModalOpen = (day: number) =>
    setSelectedDayToAdd(new Date(currentSeason.year, mouth, day));

  const handleStreetAddition = (street: Calendar_streets) =>
    setSelectedStreets([street, ...selectedStreets]);

  const handleStreetRemoval = (index: number) =>
    setSelectedStreets([
      ...selectedStreets.slice(0, index),
      ...selectedStreets.slice(index + 1),
    ]);

  const handleDayAddition = () => {
    if (selectedStreets.length === 0 || !selectedDayToAdd) return;
    const assignedStreets = selectedStreets.map(({ id }) => id);
    const tempDate = new Date(selectedDayToAdd);
    tempDate.setDate(tempDate.getDate() - 1);
    const reeceDate = tempDate.toISOString();

    addDay({
      variables: {
        input: {
          assignedStreets: assignedStreets,
          season: currentSeason.id,
          reeceDate: reeceDate,
          visitDate: selectedDayToAdd.toISOString(),
        },
      },
    });
  };

  const { loading, error, data } = useQuery<ICalendar, ICalendarVariables>(
    CALENDAR,
    {
      variables: { input: { id: currentSeason.id } },
    }
  );

  const [addDay, addDataQuery] = useMutation<AddDay, AddDayVariables>(ADD_DAY);

  if (loading) return <div>loading...</div>;
  if (error || !data || !data.season) return <div>error</div>;

  const {
    season: { days },
    streets,
  } = data;

  const mounthPlannedDays = days.filter(
    (day) => new Date(day.visitDate).getMonth() === mouth
  );

  return (
    <MainContainer>
      {selectedDayToAdd && (
        <AddDayForm
          onModalClose={handleModalClose}
          streets={streets}
          addStreet={handleStreetAddition}
          removeStreet={handleStreetRemoval}
          day={selectedDayToAdd}
          selectedStreets={selectedStreets}
        />
      )}
      <CalendarHeader mouth={mouth} onMouthChange={setMouth} />
      <CalendarBody
        mouth={mouth}
        plannedDays={mounthPlannedDays}
        onAddNewDay={handleModalOpen}
      />
    </MainContainer>
  );
};

export default Calendar;
