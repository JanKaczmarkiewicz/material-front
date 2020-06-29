import React, { useState } from "react";
import CalendarHeader, { mouths } from "./CalendarHeader";
import CalendarBody from "./CalendarBody";

const initialMouth =
  new Date().getMonth() >= mouths.length ? 0 : new Date().getMonth();

const Calendar = () => {
  const [mouth, setMouth] = useState<number>(initialMouth);

  return (
    <>
      <CalendarHeader mouth={mouth} onMouthChange={setMouth} />
      <CalendarBody mouth={mouth} />
    </>
  );
};

export default Calendar;
