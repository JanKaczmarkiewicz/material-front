import React from "react";
import TextInput from "./TextInput";
import AutocompleteInput from "./AutocompleteInput";
import { PassUpdate } from "../../DataTable";

export interface InputProps {
  onChange: PassUpdate;
  value: string;
  name: string;
}

export type TextInputConfig = { type: "TEXT" };
export type AutocompleteConfig = { type: "AUTOCOMPLETE"; options: any[] };

export type InputConfig = TextInputConfig | AutocompleteConfig;

const InputFactory = (config: InputConfig, genericProps: InputProps) => {
  console.log("configerror", config);
  try {
    switch (config.type) {
      case "TEXT":
        return <TextInput {...genericProps} />;

      case "AUTOCOMPLETE":
        return <AutocompleteInput {...genericProps} options={config.options} />;

      default:
        break;
    }
  } catch (error) {
    console.log("configerror", config);
  }
};

export default InputFactory;
