import React from "react";
import TextInput from "./TextInput";
import AutocompleteInput from "./AutocompleteInput";
import { PassUpdate } from "../../EditableDataTable";
import { DataConfig } from "../../EditableDataTable";

export interface InputProps {
  onChange: PassUpdate;
  value: string;
  name: string;
}

const InputFactory = (config: DataConfig, genericProps: InputProps) => {
  switch (config.type) {
    case "TEXT":
      return <TextInput {...genericProps} />;

    case "AUTOCOMPLETE":
      return <AutocompleteInput {...genericProps} options={config.options} />;

    default:
      break;
  }
};

export default InputFactory;
