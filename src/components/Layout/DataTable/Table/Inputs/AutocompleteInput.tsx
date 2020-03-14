import React, { useState } from "react";
import { Autocomplete, createFilterOptions } from "@material-ui/lab";
import { TextField } from "@material-ui/core";
import { InputProps } from "./InputFactory";
interface Props extends InputProps {
  options: any[];
}

const filterOptions = createFilterOptions({
  matchFrom: "start",
  stringify: (option: any) => option.name
});

const AutocompleteInput: React.FC<Props> = ({
  options,
  onChange,
  value,
  name
}) => {
  console.log({
    options,
    onChange,
    value,
    name
  });
  const handleChange = (event: React.ChangeEvent<{}>, value: any) => {
    setInput(value.name);
    onChange({ [name]: value.id });
  };

  const [input, setInput] = useState("");

  return (
    <Autocomplete
      options={options}
      renderOption={({ name }: any) => <div>{name}</div>}
      inputValue={input}
      disableClearable
      getOptionLabel={({ name }) => name}
      filterOptions={filterOptions}
      onChange={handleChange}
      renderInput={params => {
        return (
          <TextField
            {...params}
            variant="outlined"
            fullWidth
            onChange={e => {
              setInput(e.target.value);
            }}
          />
        );
      }}
    />
  );
};

export default AutocompleteInput;