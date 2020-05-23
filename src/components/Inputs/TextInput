import React from "react";
import { TextField } from "@material-ui/core";
import { PassUpdate } from "../../EditableDataTable";
interface Props {
  onChange: PassUpdate;
  value: string;
  name: string;
}
const TextInput = ({ onChange, value, name }: Props) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    onChange({ [e.target.name]: e.target.value });
  };
  return (
    <TextField
      required
      name={name}
      size="small"
      value={value}
      onChange={handleChange}
    />
  );
};

export default TextInput;
