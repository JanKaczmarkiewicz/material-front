import React from "react";
import { Typography } from "@material-ui/core";

interface Props {
  text: string;
}

const PageTitle: React.FC<Props> = ({ text }) => {
  return (
    <Typography variant="h4" component="h1" color="primary">
      {text}
    </Typography>
  );
};

export default PageTitle;
