import React from "react";
import TextInput from "./TextInput";
import AutocompleteInput from "./AutocompleteInput";
import { PassUpdate } from "../../DataTable";

export interface InputProps {
  onChange: PassUpdate;
  value: string;
  name: string;
}

export type InputConfig =
  | { type: "TEXT" }
  | { type: "TEXT_AUTOCOMPLETE"; options: any[] };

const InputFactory = (config: InputConfig, genericProps: InputProps) => {
  switch (config.type) {
    case "TEXT":
      return <TextInput {...genericProps} />;

    case "TEXT_AUTOCOMPLETE":
      return <AutocompleteInput {...genericProps} options={config.options} />;

    default:
      break;
  }
};

export default InputFactory;
