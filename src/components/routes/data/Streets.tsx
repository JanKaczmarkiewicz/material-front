import * as React from "react";
import DataTemplate, {
  UpdateHandler
} from "../../Layout/DataTable/EditableDataTable";
import request from "../../../utils/request";

interface Props {}

interface Street {
  name: string;
}

export const Acolites: React.FC<Props> = props => {
  const [items, setItems] = React.useState<Street[]>([]);

  React.useEffect(() => {
    request(
      `query{
      streets{
        name
      }
    }`,
      { useAuthorizationToken: true }
    ).then(res => setItems(res.data.streets));
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
    <DataTemplate<Street>
      items={items}
      title={"Ulice"}
      config={{
        name: {
          label: "Nazwa:",
          index: 0,
          type: "TEXT"
        }
      }}
      deleteItem={handleDelete}
      addItem={handleAddition}
      editItem={handleChange}
    />
  );
};

export default Acolites;
