import React from "react";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";

const UnauthenticatedHeaderContent: React.FC = () => {
  return (
    <Button variant="contained" color="secondary" component={Link} to="/login">
      login
    </Button>
  );
};

export default UnauthenticatedHeaderContent;
