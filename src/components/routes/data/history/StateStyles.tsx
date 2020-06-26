import React from "react";
import { getContrastRatio } from "@material-ui/core";
import { green, grey, red } from "@material-ui/core/colors";
import { Clear, Done } from "@material-ui/icons";
import { RecordState } from "../../../../generated/globalTypes";
import { ReactComponent as QuestionMark } from "./questionMarkIcon.svg";

const foreground = "#FFFFFF";
const makeStateStyle = (color: string) => ({
  color: getContrastRatio(foreground, color),
  backgroundColor: color,
});

const styles = {
  green: makeStateStyle(green[500]),
  red: makeStateStyle(red[500]),
  grey: makeStateStyle(grey[500]),
  lightGrey: makeStateStyle(grey[50]),
};

export default (state: RecordState) => {
  switch (state) {
    case RecordState.ACCEPTED:
      return {
        ...styles.green,
        icon: <Done />,
      };

    case RecordState.REJECTED:
      return {
        ...styles.red,
        icon: <Clear />,
      };

    case RecordState.UNKNOWN:
      return {
        ...styles.grey,
        icon: <QuestionMark />,
      };
    default:
      return {
        ...styles.lightGrey,
        icon: <></>,
      };
  }
};
