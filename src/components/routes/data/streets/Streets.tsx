import * as React from "react";
import DataTemplate from "../../../Layout/DataTable/EditableDataTable"; // UpdateHandler,
import { useQuery, useMutation } from "@apollo/react-hooks";
import { TextField } from "@material-ui/core";
import { UPDATE_STREET, STREETS } from "./actions";
interface Street {
  id: string;
  name: string;
}

const sanitize = ({ id, name }: Street) => ({
  id,
  name,
});

export const Acolites: React.FC = (props) => {
  const { loading, error, data } = useQuery(STREETS);
  const [updateStreet] = useMutation(UPDATE_STREET, {
    update(cache, { data: { updateStreet } }) {
      console.log(updateStreet);
      // const { streets } = cache.readQuery({ query: STREETS });
      // console.log(streets);
      // cache.writeQuery({
      //   query: GET_TODOS,
      //   data: { todos: todos.concat([addTodo]) },
      // });
    },
  });

  if (error) return <div>error</div>;
  if (loading) return <div>loading</div>;

  return (
    <DataTemplate<Street>
      items={data.streets}
      title={"Ulice"}
      config={{
        name: {
          label: "Nazwa:",
          index: 0,
          displayValue: (item) => item,
          renderInput: ({ name, value, onChange }) => (
            <TextField
              name={name}
              value={value}
              onChange={(e) => onChange({ [name]: e.target.value })}
              label="Combo box"
              variant="outlined"
            />
          ),
        },
      }}
      deleteItem={(id) => {}}
      sanitize={sanitize}
      updateItem={(id) => (update) => {
        updateStreet({ variables: { input: { id, ...update } } });
      }}
    />
  );
};

export default Acolites;
