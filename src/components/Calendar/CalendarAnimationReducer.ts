import { useTransition } from "react-spring";

export enum Animation {
  LEFT,
  RIGHT,
}

type State = { animation: Parameters<typeof useTransition>[2]; mouth: number };

export const mouths = ["Grudzień", "Styczeń", "Luty"];

const createSlideConfig = (from: number, to: number): State["animation"] => ({
  unique: true,
  config: { duration: 500 },
  from: {
    position: "absolute",
    opacity: 0,
    transform: `translate3d(${from}%, 0, 0)`,
  },
  enter: { position: "static", opacity: 1, transform: "translate3d(0%,0, 0)" },
  leave: {
    position: "absolute",
    opacity: 0,
    transform: `translate3d(-${to}%,0, 0)`,
  },
});

const toLeftAnimation = createSlideConfig(100, -50);

const toRightAnimation = createSlideConfig(-50, 100);

export const animationReducer = (
  state: State,
  action: { type: Animation }
): State => {
  switch (action.type) {
    case Animation.LEFT:
      const nextMouth = state.mouth + 1 >= mouths.length ? 0 : state.mouth + 1;
      return { animation: toLeftAnimation, mouth: nextMouth };

    case Animation.RIGHT:
      const prevMouth =
        state.mouth - 1 < 0 ? mouths.length - 1 : state.mouth - 1;
      return { animation: toRightAnimation, mouth: prevMouth };
  }
};
