import React from "react";
import { TextField } from "@material-ui/core";
interface Props {
  onChange: () => void;
  value: string;
  name: string;
}
const TextInput = ({ onChange, value, name }: Props) => (
  <TextField
    required
    name={name}
    size="small"
    value={value}
    onChange={onChange}
  />
);

export default TextInput;
