import React from "react";
import DataTemplate from "../../Layout/DataTable/DataTable";

interface Priest {
  name: string;
}

const emptyRow: Priest = {
  name: ""
};

const rows: Priest[] = [{ name: "Morenowa" }, { name: "Złotowska" }];

const title = "Ulice";

const categoryNames = ["Nazwa"];

interface Props {}

const Priests: React.FC<Props> = props => {
  return (
    <DataTemplate<Priest>
      initialState={rows}
      title={title}
      categoryNames={categoryNames}
      emptyRow={emptyRow}
    />
  );
};

export default Priests;
