import * as React from "react";
import DataTemplate from "../../../Layout/DataTable/EditableDataTable";
import { useQuery, useMutation } from "@apollo/react-hooks";
import TextField from "@material-ui/core/TextField";
import { UPDATE_STREET, STREETS } from "./actions";
import {
  Streets as IStreets,
  Streets_streets,
} from "../../../../generated/Streets";

const sanitize = ({ id, name }: Streets_streets) => ({
  id,
  name,
});

export const Streets: React.FC = (props) => {
  const { loading, error, data } = useQuery<IStreets>(STREETS);
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

  if (loading || !data) return <div>loading</div>;
  if (error) return <div>error</div>;

  return (
    <DataTemplate
      items={data.streets}
      title="Ulice"
      link="/data/streets/"
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

export default Streets;
