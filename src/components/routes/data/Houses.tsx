import React, { useState, useEffect } from "react";
import DataTemplate, { UpdateHandler } from "../../Layout/DataTable/DataTable";
import request from "../../../utils/request";

interface House {
  number: string;
  street: string;
}

const Houses: React.FC = () => {
  const [items, setItems] = useState<House[]>([]);

  const [data, setData] = useState<
    Array<{
      id: string;
      name: string;
    }>
  >([]);

  useEffect(() => {
    request(
      `query{
  houses{
    id
    number
    street{id}
  }
}`,
      { useAuthorizationToken: true }
    )
      .then(data => data.data.houses)
      .then(data =>
        data.map(({ street: { id }, id: _id, ...rest }: any) => ({
          ...rest,
          street: id
        }))
      )
      .then(setItems);

    request(
      `query{
      streets{
        name
        id
      }
    }`,
      { useAuthorizationToken: true }
    ).then(res => setData(res.data.streets));
  }, []);
  const handleAddition = (data: any) => {
    setItems([...items, data]);
  };

  const handleChange: UpdateHandler = index => update => {
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
      title={"Domy"}
      config={{
        number: {
          label: "Numer domu:",
          index: 0,
          form: { type: "TEXT" }
        },
        street: {
          label: "Ulica:",
          index: 1,
          form: {
            type: "AUTOCOMPLETE",
            options: data
          },
          getName: (id: string) => {
            const foundStreet = data.find(street => street.id === id);
            return foundStreet ? foundStreet.name : "Not Found";
          }
        }
      }}
      deleteItem={handleDelete}
      addItem={handleAddition}
      editItem={handleChange}
    />
  );
};

export default Houses;
