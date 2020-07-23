import React, { useState } from "react";
import CalendarHeader, { mouths } from "./CalendarHeader";
import CalendarBody from "./CalendarBody";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import MainContainer from "../../Layout/container/MainContainer";
import { useSeasonContext } from "../../../context/Season/SeasonContext";
import { SeasonDays, SeasonDaysVariables } from "../../../generated/SeasonDays";
import { Modal } from "@material-ui/core";

const SEASON = gql`
  query SeasonDays($input: FindOneInput!) {
    season(input: $input) {
      days {
        id
        visitDate
      }
    }
  }
`;

const initialMouth =
  new Date().getMonth() >= mouths.length ? 0 : new Date().getMonth();

const Calendar = () => {
  const [mouth, setMouth] = useState<number>(initialMouth);
  const { currentSeason } = useSeasonContext();
  const [selectedDayToAdd, setSelectedDayToAdd] = useState<Date | null>(null);

  const handleModalClose = () => setSelectedDayToAdd(null);
  const handleModalOpen = (day: number) =>
    setSelectedDayToAdd(new Date(currentSeason.year, mouth, day));

  const { loading, error, data } = useQuery<SeasonDays, SeasonDaysVariables>(
    SEASON,
    { variables: { input: { id: currentSeason.id } } }
  );

  if (loading) return <div>loading...</div>;
  if (error || !data || !data.season) return <div>error</div>;

  const { days } = data.season;

  const mounthPlannedDays = days.filter(
    (day) => new Date(day.visitDate).getMonth() === mouth
  );

  return (
    <MainContainer>
      <CalendarHeader mouth={mouth} onMouthChange={setMouth} />
      <CalendarBody
        mouth={mouth}
        plannedDays={mounthPlannedDays}
        onAddNewDay={handleModalOpen}
      />
      <Modal open={!!selectedDayToAdd} onClose={handleModalClose}>
        <div>XD</div>
      </Modal>
    </MainContainer>
  );
};

export default Calendar;
