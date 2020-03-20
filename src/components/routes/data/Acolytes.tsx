import * as React from "react";
import DataTemplate, { UpdateHandler } from "../../Layout/DataTable/DataTable";
import request from "../../../utils/request";

interface Props {}

interface Acolyte {
  name: string;
}

export const Acolites: React.FC<Props> = props => {
  const [items, setItems] = React.useState<Acolyte[]>([]);

  React.useEffect(() => {
    request(
      `query{
      acolytes{
        name
      }
    }`,
      { useAuthorizationToken: true }
    ).then(res => setItems(res.data.acolytes));
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
    <DataTemplate<Acolyte>
      items={items}
      title={"Ministranci"}
      config={{
        name: {
          label: "Nazwa:",
          index: 0,
          form: { type: "TEXT" }
        }
      }}
      deleteItem={handleDelete}
      addItem={handleAddition}
      editItem={handleChange}
    />
  );
};

export default Acolites;
