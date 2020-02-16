import React from "react";
import DataTemplate from "../../Layout/DataTable/DataTable";

interface House {
  number: string;
  street: String;
}

const emptyRow: House = {
  number: "",
  street: ""
};

const rows: House[] = [
  { number: "52", street: "Podbóż" },
  { number: "3c", street: "Złotowska" }
];

const title = "Domy";

const categoryNames = ["Numer", "Ulica"];

interface Props {}

const Acolytes: React.FC<Props> = props => {
  return (
    <DataTemplate<House>
      initialState={rows}
      title={title}
      categoryNames={categoryNames}
      emptyRow={emptyRow}
    />
  );
};

export default Acolytes;
