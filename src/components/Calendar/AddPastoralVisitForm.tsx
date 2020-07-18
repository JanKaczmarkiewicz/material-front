import React from "react";
import { Typography } from "@material-ui/core";

interface Props {
  day: Date;
}

const AddPastoralVisitForm: React.FC<Props> = ({ day }) => {
  return (
    <>
      <Typography variant="h5">Dodaj kolędę:</Typography> {/* {acolutes} */}
      {/* {priest} + autocomp */}
      {/* predefined {reeceTime} */}
      {/* predefined {visitTime} */}
      {/* submit */}
    </>
  );
};

export default AddPastoralVisitForm;
