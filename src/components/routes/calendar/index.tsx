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
} from "../../../generated/Calendar";
import { AddDay, AddDayVariables } from "../../../generated/AddDay";
import { client } from "../../../context/client/ApolloClient";
import { useHistory } from "react-router-dom";
import DayMenagerFormModal from "./DayMenagerFormModal";
import { AllStreets_streets } from "../../../generated/AllStreets";

const DayFragment = gql`
  fragment DayFragment on Day {
    id
    visitDate
  }
`;

const CALENDAR = gql`
  query Calendar($input: FindOneInput!) {
    season(input: $input) {
      days {
        ...DayFragment
      }
    }
  }
  ${DayFragment}
`;

const ADD_DAY = gql`
  mutation AddDay($input: AddDayInput!) {
    addDay(input: $input) {
      ...DayFragment
    }
  }
  ${DayFragment}
`;

const initialMouth =
  new Date().getMonth() >= mouths.length ? 0 : new Date().getMonth();

const Calendar = () => {
  const history = useHistory();
  const [mouth, setMouth] = useState<number>(initialMouth);
  const { currentSeason } = useSeasonContext();
  const [selectedDayToAdd, setSelectedDayToAdd] = useState<Date | null>(null);
  const [selectedStreets, setSelectedStreets] = useState<AllStreets_streets[]>(
    []
  );

  const handleModalClose = () => setSelectedDayToAdd(null);
  const handleModalOpen = (day: number) =>
    setSelectedDayToAdd(new Date(currentSeason.year, mouth, day));

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
  const calendarVariables = { input: { id: currentSeason.id } };

  const { loading, error, data } = useQuery<ICalendar, ICalendarVariables>(
    CALENDAR,
    {
      variables: calendarVariables,
    }
  );

  const [addDay] = useMutation<AddDay, AddDayVariables>(ADD_DAY, {
    onCompleted: (data) => {
      if (!data) return;

      history.push(`/calendar/${data.addDay.id}`);

      const query = client.readQuery<ICalendar, ICalendarVariables>({
        query: CALENDAR,
        variables: calendarVariables,
      });

      if (!query || !query.season) return;

      client.writeQuery<ICalendar, ICalendarVariables>({
        query: CALENDAR,
        variables: calendarVariables,
        data: {
          ...query,
          season: {
            ...query.season,
            days: [...query.season.days, data.addDay],
          },
        },
      });
    },
  });

  if (loading) return <div>loading...</div>;
  if (error || !data || !data.season) return <div>error</div>;

  const {
    season: { days },
  } = data;

  const mounthPlannedDays = days.filter(
    (day) => new Date(day.visitDate).getMonth() === mouth
  );

  return (
    <MainContainer>
      {selectedDayToAdd && (
        <DayMenagerFormModal
          open
          headerText={"Dodaj dzień"}
          submitText={"Zaplanuj ten dzień"}
          day={selectedDayToAdd}
          selectedStreets={selectedStreets}
          setSelectedStreets={setSelectedStreets}
          onFormSubmit={handleDayAddition}
          onModalClose={handleModalClose}
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
