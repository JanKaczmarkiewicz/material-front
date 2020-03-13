import React, { useState, useEffect } from "react";
import DataTemplate, { UpdateHandler } from "../../Layout/DataTable/DataTable";

interface House {
  number: string;
  street: string;
}

const rows: House[] = [
  { number: "52", street: "Podbóż" },
  { number: "3c", street: "Złotowska" }
];

const title = "Domy";
const categoryNames = ["Numer", "Ulica"];

const Houses: React.FC = () => {
  const [items, setItems] = useState<House[]>(rows);
  const [data, setData] = useState<
    Array<{
      id: string;
      name: string;
    }>
  >([]);
  useEffect(() => {
    fetch(`http://localhost:3001/api/street`)
      .then(res => res.json())
      .then(res => setData(res.data));
  }, []);
  const handleAddition = (data: any) => {
    setItems([...items, data]);
  };

  const handleChange: UpdateHandler = index => update => {
    console.log(update);

    setItems([
      ...items.slice(0, index),
      { ...items[index], ...update },
      ...items.slice(index + 1)
    ]);
  };

  const handleDelete = (index: number) => {
    const tItems = [...items];
    tItems.splice(index, 1);
    setItems(tItems);
  };

  return (
    <DataTemplate<House>
      items={items}
      title={title}
      formConfig={{
        number: { type: "TEXT" },
        street: { type: "TEXT_AUTOCOMPLETE", options: data }
      }}
      categoryNames={categoryNames}
      deleteItem={handleDelete}
      addItem={handleAddition}
      editItem={handleChange}
    />
  );
};

export default Houses;
