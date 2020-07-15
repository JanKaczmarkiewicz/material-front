import React, { useState } from "react";
import CalendarHeader, { mouths } from "./CalendarHeader";
import CalendarBody from "./CalendarBody";
import MainContainer from "../MainContainer";

const initialMouth =
  new Date().getMonth() >= mouths.length ? 0 : new Date().getMonth();

const Calendar = () => {
  const [mouth, setMouth] = useState<number>(initialMouth);

  return (
    <MainContainer>
      <CalendarHeader mouth={mouth} onMouthChange={setMouth} />
      <CalendarBody mouth={mouth} />
    </MainContainer>
  );
};

export default Calendar;
