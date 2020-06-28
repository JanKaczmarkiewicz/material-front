import React, { useCallback, useReducer } from "react";
import { useTransition, animated } from "react-spring";
import CalendarHeader from "./CalendarHeader";
import CalendarBody from "./CalendarBody";
import {
  animationReducer,
  Animation,
  mouths,
} from "./CalendarAnimationReducer";

const initialMouth =
  new Date().getMonth() >= mouths.length ? 0 : new Date().getMonth();

const Calendar = () => {
  const [state, dispatch] = useReducer(animationReducer, {
    mouth: initialMouth,
    animation: {},
  });

  const transitions = useTransition<number, {}>(
    state.mouth,
    (p) => p,
    state.animation
  );

  const handleNext = useCallback(() => {
    dispatch({ type: Animation.LEFT });
  }, [state.mouth]);
  const handlePrev = useCallback(() => {
    dispatch({ type: Animation.RIGHT });
  }, [state.mouth]);

  return (
    <>
      {transitions.map(({ item, props, key }) => {
        return (
          <animated.div style={{ ...props }} key={key}>
            <CalendarHeader
              text={mouths[item]}
              onLeftArrowClick={handlePrev}
              onRightArrowClick={handleNext}
            />
            <CalendarBody mouth={item} />
          </animated.div>
        );
      })}
    </>
  );
};

export default Calendar;
