import { TextInputConfig, AutocompleteConfig } from "./Inputs/InputFactory";

interface FieldConfig {
  label: string;
  index: number;
  form: any;
}

interface RelationField extends FieldConfig {
  form: AutocompleteConfig;
  getName: (id: string) => string;
}
interface TextField extends FieldConfig {
  form: TextInputConfig;
}

export type TableConfig = {
  [key: string]: TextField | RelationField;
};
