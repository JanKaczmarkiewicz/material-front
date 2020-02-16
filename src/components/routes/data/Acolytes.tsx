import React from "react";
import DataTemplate from "../../Layout/DataTable/DataTable";

interface Acolyte {
  name: string;
  degree: number;
  experience: number;
  phone: string;
}

const emptyRow: Acolyte = {
  name: "",
  degree: 0,
  experience: 1,
  phone: ""
};

const rows: Acolyte[] = [
  { name: "Szymon", degree: 1, experience: 6, phone: "213-213-123" },
  { name: "Rafał", degree: 2, experience: 3, phone: "902-832-123" }
];

const title = "Ministranci";

const categoryNames = ["Imię", "Stopień", "Odbyte kolendy", "Telefon"];

interface Props {}

const Acolytes: React.FC<Props> = props => {
  return (
    <DataTemplate<Acolyte>
      initialState={rows}
      title={title}
      categoryNames={categoryNames}
      emptyRow={emptyRow}
    />
  );
};

export default Acolytes;
