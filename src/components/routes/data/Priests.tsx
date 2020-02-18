import React from "react";
import DataTemplate from "../../Layout/DataTable/DataTable";

interface Priest {
  name: string;
}

const emptyRow: Priest = {
  name: ""
};

const rows: Priest[] = [{ name: "ks. Marek" }, { name: "ks. Proboszcz" }];

const title = "Księża";

const categoryNames = ["Imię"];

interface Props {}

const Priests: React.FC<Props> = props => {
  return null;
  // <DataTemplate<Priest>
  //   initialState={rows}
  //   title={title}
  //   categoryNames={categoryNames}
  //   emptyRow={emptyRow}
  // />
};

export default Priests;
