import React, { useState } from "react";
import DataTemplate from "../../Layout/DataTable/DataTable";

interface House {
  number: string;
  street: string;
}

const Houses: React.FC = () => {
  const [items, setItems] = useState<House[]>([]);
  // useEffect(() => {
  //   fetch(`http://localhost:3001/api/street`)
  //     .then(res => res.json())
  //     .then(res =>
  //       setData(
  //         res.data.reduce(
  //           (obj: any, { id, name }: any) => ({ ...obj, [name]: id }),
  //           {}
  //         )
  //       )
  //     );
  // }, []);

  // console.log(data);

  // const fieldsConfig: FieldsConfig = {
  //   number: {
  //     validate: value => true,
  //     initialValue: "",
  //     element: TextInput
  //   } as FieldConfig<House["number"]>,
  //   street: {
  //     validate: value => true,
  //     initialValue: "",

  //     element: createAutocompleteInput({ options: data })
  //   } as FieldConfig<House["number"]>
  // };

  const handleAddition = (data: any) => {
    setItems([...items, data]);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    e.preventDefault();
    if (typeof index === "number") {
      setItems([
        ...items.slice(0, index),
        { ...items[index], [e.target.name]: e.target.value },
        ...items.slice(index + 1)
      ]);
    }
  };

  const handleDelete = (index: number) => {
    const tItems = [...items];
    tItems.splice(index, 1);
    setItems(tItems);
  };

  return (
    <DataTemplate<House>
      items={rows}
      title={title}
      categoryNames={categoryNames}
      deleteItem={handleDelete}
      addItem={handleAddition}
      editItem={handleChange}
    />
  );
};

const rows: House[] = [
  { number: "52", street: "Podbóż" },
  { number: "3c", street: "Złotowska" }
];

const title = "Domy";
const categoryNames = ["Numer", "Ulica"];

export default Houses;
